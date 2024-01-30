import { Image, Tag } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton"
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput"
import FormTextArea from "~/components/UI/ValidatedTextArea/ValidatedTextArea"
import { PostWithTags } from "~/service/post.server"
import ImageForm from "../ImageForm/ImageForm"
import TagForm from "../TagForm/TagForm"


export const postFormValidator = withZod(z.object({
	title: zfd.text(),
	article: zfd.text(),
	description: zfd.text(),

}))
type PostFormParams = {
	createdPost: SerializeFrom<PostWithTags>, image: SerializeFrom<Image> | null, images: SerializeFrom<Image[]>
	currentPage: number;
	totalPages: number;
	tags: SerializeFrom<Tag[]>
}
const Form = ({ createdPost, image, images, tags }: PostFormParams) => {
	const defaultValues = {
		title: createdPost.title || '',
		description: createdPost.description || '',
		article: createdPost.article || ''
	}
	return (
		<div style={{ gridArea: "main" }} className="flex relative h-screen flex-col p-4  ">
			<p className="w-full text-2xl h-12 border-b-2 border-slate-300">Edit post</p>
			<div className="w-full inline-flex gap-4 flex-col sm:flex-row">
				<div className="w-full max-w-[50%] flex  gap-4 flex-col " >
					<ValidatedForm defaultValues={defaultValues} className="flex gap-4 flex-col   min-w-[300px] " validator={postFormValidator} method="post" navigate={false} >
						<FormInput name="id" value={createdPost.id} type="hidden" />
						<FormInput name="title" label="Title" placeholder="Title" type="text" />
						<FormTextArea name="description" label="Description" placeholder="Description" type="text" />
						<FormTextArea name="article" label="Article" placeholder="Article" type="text" />
						<SubmitButton classNames="border-2 border-gray-500 w-1/3 hover:bg-green-200">
							Save
						</SubmitButton>

					</ValidatedForm>
					<TagForm tags={tags} post={createdPost} />

				</div>

				<div className="w-ful">
					{image && <div className="   flex-col w-full min-w-[300px] flex  ">
						<p className="w-full">Post image preview</p>
						{image && (
							<img
								className="w-full max-h-64 object-cover rounded-sm "
								src={image.path.includes("https") ? image.path : `/uploads/${image.path}`}
								alt={image.path}
							/>
						)}
					</div>}
					<ImageForm id={createdPost.id} images={images} />

				</div>

			</div>

		</div>


	)
}

export default Form
