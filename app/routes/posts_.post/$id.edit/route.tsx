
import { Image } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import Form, { postFormValidator } from "~/components/Posts/Form/Form";
import { getImage } from "~/service/image.server";
import { getPostById, updatePost } from "~/service/post.server";


export async function action({ params, request }: ActionFunctionArgs) {
	console.log("🚀 ~ action ~ request:", request)
	console.log("🚀 ~ action ~ params:", params)
	try {
		const id = params.id
		if (!id) throw new Error('Not found')
		const formData = await request.formData()
		const validatedFormData = await postFormValidator.validate(formData)
		if (validatedFormData.error) {
			return validationError({
				fieldErrors: {
					article: "Data invalid"
				}
			})
		}
		const updatedPost = await updatePost(parseInt(id), validatedFormData.data)
		return json({ updatedPost })
	} catch (error) {
		console.log("🚀 ~ loader ~ error:", error)
		throw new Error("")
	}
}

export async function loader({ params }: LoaderFunctionArgs) {
	console.log("🚀 ~ loader ~ params:", params)
	try {
		const id = params.id
		if (!id) throw new Error('Not found')
		const createdPost = await getPostById(parseInt(id))
		let image: Image | null = null
		if (createdPost?.imageId) {
			image = await getImage(createdPost.imageId)
		}
		if (!createdPost) throw new Error('Not found')
		return json({ createdPost, image })
	} catch (error) {
		console.log("🚀 ~ loader ~ error:", error)
		throw new Error("")
	}
}


export default function PostsRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<>
			<Form createdPost={data.createdPost} image={data.image} />
		</>
	);
}