import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zfd } from "zod-form-data";
import WidgetButtonList from "~/components/WidgetList/WidgetList";
import DropZoneWrapper from "~/components/ZoneWrapper/ZoneWrapper";
import { PostWithTags, getAllPosts } from "~/service/post.server";
import { connectPostToPostCarousel } from "~/service/postSlider.server";
import { DropInstance, WidgetButton, WidgetInstance, WidgetType } from "~/types/types";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const buttonFromDataValidator = withZod(
  z.object({
    id: zfd.text(),
    type: zfd.text(),
    containerId: zfd.text()
  })
)
export async function loader() {
  try {
    const posts = await getAllPosts()
    return json({ posts })

  } catch (error) {
    console.log("🚀 ~ loader ~ error:", error)
    throw new Error("s")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const postsData = formData.get("posts") as string
  const posts = JSON.parse(postsData!) as PostWithTags[]

  if (posts) {
    // const c = await createPostCarousel()
    console.log("🚀 ~ action ~ posts:", posts)
    posts.map(async post =>
      await connectPostToPostCarousel(post, 1)

    )
    return {}
  }
  if (formData.has("containerId")) {
    const validatedData = await buttonFromDataValidator.validate(formData)
    if (validatedData.error) {
      throw new Error("Bad request")
    }
    const widgetId = validatedData.data.id
    const widgetType = validatedData.data.type as WidgetType
    const containerId = validatedData.data.containerId
    return json({ id: widgetId, type: widgetType, containerId })
  }
  return {}
}
export const randomNumber = () => { return Math.floor(Math.random() * 10000) }
const dropZones: DropInstance[] = [{ id: `${randomNumber()}`, type: "MainPage", name: "Main page widget container " }, { id: `${randomNumber()}`, type: "TextZone", name: "container 2" }]

export default function Index() {
  const actionData = useActionData<typeof action>()
  const { posts } = useLoaderData<typeof loader>()
  const [widgets, setWidgets] = useState<WidgetInstance[]>([])
  const widgetsButtons: WidgetButton[] = [{ id: `${randomNumber()}`, type: "TextWidget" }, { id: `${randomNumber()}`, type: "CarouselPostWidget" }];


  useEffect(() => {
    if (actionData) {
      const { containerId, id, type } = actionData
      setWidgets((prev) =>
        prev
          ? [{ id, type, containerId }, ...prev,]
          : [{ id, type, containerId }]);
    }
  }, [actionData]);
  return (
    <div className="flex w-screen h-screen bg-gray-100 justify-between gap-4 p-2">
      <WidgetButtonList buttons={widgetsButtons} dropZones={dropZones} />
      <div className="w-full  gap-2">
        {dropZones.map(zone => <DropZoneWrapper key={zone.id} posts={posts} dropZone={zone} widgetsData={widgets.filter(widget => widget.containerId === zone.id)} />)}
      </div>

    </div>

  );
}






















