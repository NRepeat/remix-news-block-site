import { LoaderFunctionArgs, json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { postCarouselFormValidator } from "~/components/CarouselPostWidget/Form/Form";
import EditPage from "~/components/EditPage/EditPage";
import { imageLinkValidator } from "~/components/ImageCarouselWidget/Wrapper/Wrapper";
import { textValidator } from "~/components/TextWidget/Form/Form";
import { getAllImages, updateImage } from "~/service/image.server";
import { getPage, updatePage, updatePageContent } from "~/service/page.server";
import { getAllPosts, getLatestPosts, getPostsByRating } from "~/service/post.server";
import { connectPostToPostCarousel, createPostCarousel } from "~/service/postSlider.server";
import { removeElement, updateElement } from "~/service/widget.server";
import { createImageCarouselAction } from "./createImageCarouselAction";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const buttonFromDataValidator = withZod(
  z.object({
    page: zfd.text(),
    newElement: zfd.text(),
    index: zfd.text()
  })
)
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url)
    const currentPage = url.searchParams.get("page") ?? "1"
    const { totalPages: totalPostsPages, posts } = await getAllPosts({
      page: parseInt(currentPage), pageSize: 10
    })
    const page = await getPage({ slug: "main" })
    console.log("🚀 ~ loader ~ page:", page)
    if (!page) throw new Error('Not found')
    const { images, totalPages: totalImagePages } = await getAllImages({
      page: parseInt(currentPage),
      pageSize: 10
    })
    return json({ posts, page, totalPostsPages, images, totalImagePages, currentPage })
  } catch (error) {
    console.log("🚀 ~ loader ~ error:", error)
    throw new Error("s")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log("🚀 ~ action ~ formData:", formData)
  if (formData.has("link")) {
    const validatedData = await imageLinkValidator.validate(formData)
    if (validatedData.error) {
      return validationError({
        fieldErrors: { id: "Not valid data" }
      })
    }
    await updateImage({ id: validatedData.data.id, data: { link: validatedData.data.link } })
    return json({ success: true })
  }
  if (formData.has("imagesIds")) {
    await createImageCarouselAction({ formData })
    return json({ success: true })
  }
  const postsData = formData.get("posts") as string

  if (postsData) {
    const validatedData = await postCarouselFormValidator.validate(formData)
    if (validatedData.error) {
      return validationError({
        fieldErrors: { id: "Not valid data" }
      })
    }
    const { id, type, posts, quantity, order, carouselId } = validatedData.data

    let existCarouselId = carouselId
    if (!carouselId) {
      const postCarousel = await createPostCarousel()
      existCarouselId = postCarousel.id
    }

    if (posts && type === "manual") {
      await connectPostToPostCarousel(JSON.parse(posts) as number[], existCarouselId!)
      await updateElement({ content: JSON.stringify({ carouselId: existCarouselId, postsIds: posts, type }), id, slug: "main" });
      return json({ success: true })
    }
    if (type === "latest") {
      const latestPost = await getLatestPosts({ quantity: quantity ? quantity : 10 })
      const postsIds = latestPost.map(post => post.id)
      await connectPostToPostCarousel(postsIds, existCarouselId!)
      await updateElement({ content: JSON.stringify({ postsIds, type, existCarouselId }), id, slug: "main" });
      return json({ success: true })
    }
    if (type === "popular") {
      const latestPost = await getPostsByRating({ quantity: quantity ? quantity : 10, order: order === 'asc' ? order : 'desc' })
      const postsIds = latestPost.map(post => post.id)
      await connectPostToPostCarousel(postsIds, existCarouselId!)
      await updateElement({ content: JSON.stringify({ postsIds, type, existCarouselId }), id, slug: "main" });
      return json({ success: true })
    }
  }
  if (formData.get("type") === 'drop') {
    const widgets = formData.get("widgets") as string
    await updatePage({
      slug: "main",
      jsonContent: widgets,
    });
    return json({ success: true })
  }
  if (formData.get("type") === 'delete') {
    const id = formData.get("widgetId") as string
    await removeElement({ id, slug: 'main' })
    return json({ success: true })
  }
  if (formData.get("type") === 'textWidget') {
    const validatedTextWidgetData = await textValidator.validate(formData)
    if (validatedTextWidgetData.error) {
      throw new Error("Bad request")
    }
    const { id, text, title } = validatedTextWidgetData.data

    await updateElement({ content: JSON.stringify({ text, title }), id, slug: "main" });
    return json({ success: true })
  }

  const validatedData = await buttonFromDataValidator.validate(formData)
  console.log("🚀 ~ action ~ validatedData:", validatedData)
  if (validatedData.error) {
    throw new Error("Bad request")
  }

  const slug = validatedData.data.page
  const newWidget = JSON.stringify(validatedData.data.newElement)
  console.log("🚀 ~ action ~ newWidget:", newWidget)
  const index = validatedData.data.index
  await updatePageContent({
    index: parseInt(index),
    slug,
    content: newWidget,
  });
  return json({ newWidget })

}

export default function Index() {
  const { posts, page, images } = useLoaderData<typeof loader>()




  return (
    <EditPage images={images} page={page} posts={posts} />

  );
}






















