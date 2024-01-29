import { ActionFunctionArgs } from "@remix-run/node";
import { createImage } from "~/service/image.server";
import { connectImageToPost } from "~/service/post.server";

export type MediaType = "postThumbnail" | "postImage" | "url"



export async function action({ params, request }: ActionFunctionArgs) {
	if (!params.id) throw new Error("Not found")

	const formData = await request.formData()
	console.log(formData)

	const formDataType = formData.get("type") as MediaType
	const id = (params.id)
	const headers = new Headers()
	headers.append('postId', id)
	if (formDataType === 'url') {
		const url = formData.get("url") as string

		const image = await createImage(url)
		await connectImageToPost(parseInt(id), image.id)
	}
	return {};
}



