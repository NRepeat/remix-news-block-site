import { LoaderFunctionArgs, json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zfd } from "zod-form-data";
import DropZone from "~/components/DropZone/DropZone";
import { textValidator } from "~/components/TextWidget/Form/Form";
import { getPage, updatePage, updatePageContent } from "~/service/page.server";
import { PostWithTags, getAllPosts } from "~/service/post.server";
import { connectPostToPostCarousel, createPostCarousel } from "~/service/postSlider.server";
import { removeElement, updateElement } from "~/service/widget.server";

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
    // const page = await getPage({ slug: "main" })
    const url = new URL(request.url)
    const currentPage = url.searchParams.get("page") ?? "1"
    const { totalPages, posts } = await getAllPosts({
      page: parseInt(currentPage), pageSize: 10
    })
    const page = await getPage({ slug: "main" })
    if (!page) throw new Error('Not found')
    // console.log("🚀 ~ loader ~  page:", page)
    // if(page.elements){
    //   const content = JSON.stringify(page.elements)
    //   return json({ page, posts })
    // }
    // // await updatePage({ slug: page.slug, jsonContent: content })
    return json({ posts, page, totalPages })
  } catch (error) {
    console.log("🚀 ~ loader ~ error:", error)
    throw new Error("s")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log("🚀 ~ action ~ formData:", formData)
  const postsData = formData.get("posts") as string

  if (postsData) {
    const id = formData.get("id") as string
    console.log("🚀 ~ action ~ id :", id)
    const posts = JSON.parse(postsData) as PostWithTags[]
    console.log("🚀 ~ action ~ posts:", posts)

    const postCarousel = await createPostCarousel()
    console.log("🚀 ~ action ~ postCarousel:", postCarousel)
    await connectPostToPostCarousel(posts, postCarousel.id)
    await updateElement({ content: JSON.stringify({ posts }), id, slug: "main" });
    return json({ success: true })
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
  const index = validatedData.data.index
  await updatePageContent({
    index: parseInt(index),
    slug,
    content: newWidget,
  });
  return json({ newWidget })

}

export default function Index() {
  const { posts, page } = useLoaderData<typeof loader>()





  return (
    <div style={{ gridArea: "main" }} className="flex flex-col relative bg-gray-100  p-4">
      <p className="text-2xl pb-4 border-b-2 text-pretty">Edit page 	</p>

      <DropZone page={page} posts={posts} />
    </div>

  );
}






















