import { redirect, type ActionFunctionArgs } from "@remix-run/node"
import { validationError } from "remix-validated-form"
import { tagsFormValidation } from "~/components/Posts/TagForm/TagForm"
import { createTags } from "~/service/tags.server"
export async function action({ params, request }: ActionFunctionArgs) {
	try {
		const id = params.id
		if (!id) throw new Error('Not found')
		const formData = await request.formData()
		const validatedFormData = await tagsFormValidation.validate(formData)
		if (validatedFormData.error) {
			return validationError({
				fieldErrors: {
					tags: "Data not valid"
				}
			})
		}
		const createdTags = await createTags({ tags: validatedFormData.data.tags.split(',') })
		console.log("🚀 ~ action ~ createdTags:", createdTags)
		// const updatePostTags = await connectTagsToPost({ postId: parseInt(id), tags: createdTags })
		// console.log("🚀 ~ action ~ updatePostTags:", updatePostTags)
		return redirect(`/admin/posts/post/${id}/edit`)

	} catch (error) {
		console.log("🚀 ~ action ~ error:", error)
		throw new Error("Bad request")
	}
}