import { Tag } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { useFetcher } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { FC, useState } from "react"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton"
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput"
import { PostWithTags } from "~/service/post.server"


export const tagsFormValidation = withZod(z.object({
	tags: z.string(),
	postId: z.string()
}))

type TagFormType = {
	post: SerializeFrom<PostWithTags>
	tags: SerializeFrom<Tag[]>
}

const TagForm: FC<TagFormType> = ({ post, tags }) => {
	const fetcher = useFetcher()

	const [selectedTags, setSelectedTags] = useState<SerializeFrom<string[]>>([])
	console.log("🚀 ~ selectedTags:", selectedTags)
	const def = {
		tags: selectedTags.map(tag => tag.name).join(","),
		postId: post.id
	}

	return (
		<div>Tags
			<ValidatedForm reloadDocument={false} validator={tagsFormValidation} method="post" navigate={false} fetcher={fetcher} action={`/admin/posts/post/${post.id}/edit/tags`}>
				<FormInput name="tags" value={selectedTags.map(tag => tag.name).join(",")} label="Add new tags" placeholder="Tags" type="text" />
				<FormInput name="postId" type="hidden" value={post.id} />
				<SubmitButton>
					Add tags
				</SubmitButton>
			</ValidatedForm>
			<div>
				<ul>
					exist tag
					{tags.map(tag => <li aria-hidden onClick={() => setSelectedTags(prev => [tag.name, ...prev])} key={tag.id}>{tag.name} </li>)}

					Post tags

				</ul>
			</div>
		</div>
	)
}

export default TagForm