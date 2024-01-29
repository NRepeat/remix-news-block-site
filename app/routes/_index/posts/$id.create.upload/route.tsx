import { ActionFunctionArgs, redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { createImage } from "~/service/image.server";
import { connectImageToPost } from "~/service/post.server";

export type MediaType = "postThumbnail" | "postImage"



export async function action({ params, request }: ActionFunctionArgs) {
	console.log("🚀 ~ action ~  request:", request)
	if (!params.id) throw new Error("Not found")
	const uploadHandler = unstable_composeUploadHandlers(
		unstable_createFileUploadHandler({
			directory: 'public/uploads',
			maxPartSize: 50000000,
			file: ({ filename }) => filename,
		}),
		unstable_createMemoryUploadHandler()
	);
	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	);
	console.log(formData)
	const { name } = formData.get("file") as File

	const formDataType = formData.get("type") as MediaType
	const id = (params.id)

	if (formDataType === "postThumbnail") {
		const image = await createImage(name)
		await connectImageToPost(parseInt(id), image.id)
		return redirect(`/posts/create`)
	}
	if (formDataType === "postImage") {
		const image = await createImage(name)
		await connectImageToPost(parseInt(id), image.id)
		return redirect(`/posts/create`)
	}
	return redirect(`/posts/create`)
}



