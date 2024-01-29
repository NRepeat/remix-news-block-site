import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { textValidator } from "~/components/TextWidget/Form/Form";
import WidgetButtonList from "~/components/WidgetList/WidgetList";
import DropZoneWrapper from "~/components/ZoneWrapper/ZoneWrapper";
import { getPage, updatePage, updatePageContent } from "~/service/page.server";
import { getAllPosts } from "~/service/post.server";
import { removeElement, updateElement } from "~/service/widget.server";
import { DropInstance, WidgetButton, WidgetInstance } from "~/types/types";

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
export async function loader() {
  try {
    // const page = await getPage({ slug: "main" })
    const posts = await getAllPosts()
    const page = await getPage({ slug: "main" })
    if (!page) throw new Error('Not found')
    // console.log("🚀 ~ loader ~  page:", page)
    // if(page.elements){
    //   const content = JSON.stringify(page.elements)
    //   return json({ page, posts })
    // }
    // // await updatePage({ slug: page.slug, jsonContent: content })
    return json({ posts, page })
  } catch (error) {
    console.log("🚀 ~ loader ~ error:", error)
    throw new Error("s")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  console.log("🚀 ~ action ~  formData:", formData)
  // const postsData = formData.get("posts") as string
  // const posts = JSON.parse(postsData!) as PostWithTags[]

  // if (posts) {
  //   const c = await createPostCarousel()
  //   console.log("🚀 ~ action ~ posts:", posts)
  //   posts.map(async post =>
  //     await connectPostToPostCarousel(post, 1)

  //   )}
  if (formData.get("type") === 'drop') {
    const widgets = formData.get("widgets") as string
    console.log("🚀 ~ action ~ widgets:", widgets)
    await updatePage({
      slug: "main",
      jsonContent: widgets,
    });
    return {}
  }
  if (formData.get("type") === 'delete') {
    const id = formData.get("widgetId") as string
    await removeElement({ id, slug: 'main' })
    return {}
  }
  if (formData.get("type") === 'textWidget') {
    const validatedTextWidgetData = await textValidator.validate(formData)
    if (validatedTextWidgetData.error) {
      throw new Error("Bad request")
    }
    const { id, text, title } = validatedTextWidgetData.data

    await updateElement({ content: JSON.stringify({ text, title }), id, slug: "main" });
    return { text }
  }

  const validatedData = await buttonFromDataValidator.validate(formData)
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
export const randomNumber = () => { return Math.floor(Math.random() * 10000) }


export default function Index() {
  const { posts, page } = useLoaderData<typeof loader>()
  const content = JSON.parse(page.content ? page.content : '[]') as [];
  const widgets: WidgetInstance[] = content.map((item) =>
    typeof item === 'string' ? JSON.parse(item) : item
  );






  const widgetsButtons: WidgetButton[] = [{ id: `${randomNumber()}`, type: "TextWidget" }, { id: `${randomNumber()}`, type: "CarouselPostWidget" }];
  const dropZones: DropInstance[] = [{ id: `1`, type: "MainPage", name: "Main page widget container " }]



  return (
    <div className="flex w-screen h-screen bg-gray-100 justify-between gap-4 p-2">
      <WidgetButtonList widgetsArr={widgets} buttons={widgetsButtons} dropZones={dropZones} />
      <div className="w-full  gap-2">
        {dropZones.map(zone => <DropZoneWrapper key={zone.id} posts={posts} dropZone={zone} widgetsData={widgets} />)}
      </div>

    </div>

  );
}






















