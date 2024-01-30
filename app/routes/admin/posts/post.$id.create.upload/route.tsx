import { ActionFunctionArgs, json, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { createImage } from "~/service/image.server";
import { connectImageToPost } from "~/service/post.server";

export type MediaType = "postThumbnail" | "postImage" | "url"



export async function action({ params, request }: ActionFunctionArgs) {
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

	const formDataType = formData.get("type") as MediaType
	const id = (params.id)
	if (formDataType === 'url') {
		const url = formData.get("url") as string

		const image = await createImage(url)
		await connectImageToPost(parseInt(id), image.id)
	}
	if (formDataType === "postThumbnail") {
		const { name } = formData.get("file") as File

		const image = await createImage(name)
		await connectImageToPost(parseInt(id), image.id)
		return json({ success: true });
	}
	if (formDataType === "postImage") {
		const { name } = formData.get("file") as File

		const image = await createImage(name)
		await connectImageToPost(parseInt(id), image.id)
		return json({ success: true });
	}

	return json({ success: true });
}



