
import { Image } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import Form, { postFormValidator } from "~/components/Posts/Form/Form";
import { getAllImages, getImage } from "~/service/image.server";
import { connectImageToPost, getPostById, updatePost } from "~/service/post.server";
import { getAllTags } from "~/service/tags.server";


export async function action({ params, request }: ActionFunctionArgs) {
	console.log("🚀 ~ action ~ request:", request)
	try {
		const id = params.id
		if (!id) throw new Error('Not found')
		const formData = await request.formData()
		if (formData.get('type') === "media") {
			const imageId = formData.get("imageId") as string
			const updatedPost = await connectImageToPost(parseInt(id), parseInt(imageId))
			return json({ updatedPost })
		}
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

export async function loader({ request, params }: LoaderFunctionArgs) {
	try {
		const id = params.id
		if (!id) throw new Error('Not found')
		const createdPost = await getPostById(parseInt(id))
		let image: Image | null = null
		if (createdPost?.imageId) {
			image = await getImage(createdPost.imageId)
		}
		if (!createdPost) throw new Error('Not found')
		const url = new URL(request.url)
		// const search = url.searchParams.get("search")

		const tags = await getAllTags()
		const page = url.searchParams.get("page") ?? "1"
		const { images, totalPages } = await getAllImages({
			page: parseInt(page),
			pageSize: 10
		})
		return json({ createdPost, image, images, totalPages, currentPage: page, tags })
	} catch (error) {
		throw new Error("")
	}
}


export default function PostsRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<>
			<Form currentPage={parseInt(data.currentPage)} totalPages={data.totalPages} tags={data.tags} createdPost={data.createdPost} image={data.image} images={data.images} />

		</>
	);
}