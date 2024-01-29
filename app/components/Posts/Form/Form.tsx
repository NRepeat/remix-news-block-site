import { Image } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { zfd } from "zod-form-data"
import MediaForm from "~/components/DropzoneImage/DropzoneImage"
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton"
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput"
import FormTextArea from "~/components/UI/ValidatedTextArea/ValidatedTextArea"
import { PostWithTags } from "~/service/post.server"


export const postFormValidator = withZod(z.object({
	title: zfd.text(),
	article: zfd.text(),
	description: zfd.text(),

}))

const Form = ({ createdPost, image }: { createdPost: SerializeFrom<PostWithTags>, image: SerializeFrom<Image> | null }) => {
	const defaultValues = {
		title: createdPost.title || '',
		description: createdPost.description || '',
		article: createdPost.article || ''
	}
	return (
		<>
			{image && !image.path.includes("/") && <img className="max-w-md" src={`/uploads/${image.path}`} alt={image.path} />}
			{image && <img className="max-w-md" src={image.path} alt={image.path} />}
			<ValidatedForm defaultValues={defaultValues} className="flex gap-4 flex-col w-1/2 min-w-[300px]" validator={postFormValidator} method="post" navigate={false} >
				<FormInput name="id" value={createdPost.id} type="hidden" />
				<FormInput name="title" label="Title" placeholder="Title" type="text" />
				<FormTextArea name="description" label="Description" placeholder="Description" type="text" />
				<FormTextArea name="article" label="Article" placeholder="Article" type="text" />
				<SubmitButton classNames="border-2 border-gray-500 w-1/3 hover:bg-green-200">
					Save
				</SubmitButton>
			</ValidatedForm>

			<ImageForm id={createdPost.id} />
		</>


	)
}

export default Form

const ImageForm = ({ id }: { id: number }) => {

	// return <ValidatedForm validator={}  method="post" encType="multipart/form-data">

	// </ValidatedForm>
	return <div>
		<p>Upload image</p>
		<p>Upload an image file, pick one from your media library, or add one with a URL.</p>
		<MediaForm label="Post image" type="postImage" action={`/posts/${id}/create/upload`} />
	</div>
}