import { Tag } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useFetcher, useSubmit } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { FC, useEffect, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton";
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput";
import { PostWithTags } from "~/service/post.server";


type TagFormType = {
	post: SerializeFrom<PostWithTags>;
	tags: SerializeFrom<Tag[]>;
};

export const tagsFormValidation = withZod(
	z.object({
		tags: z.string(),
		postId: z.string(),
	})
);
export const selectedTagsValidator = withZod(z.object({ selectedTags: z.string() }));


const TagForm: FC<TagFormType> = ({ post, tags }) => {
	const fetcher = useFetcher();
	const submit = useSubmit()
	const [selectedTags, setSelectedTags] = useState<SerializeFrom<Tag[]>>([]);
	const [existTags, setExistTags] = useState<SerializeFrom<Tag[]>>([]);
	const [existPostTags, setExistPostTags] = useState<SerializeFrom<Tag[]>>();
	useEffect(() => {
		if (tags) {
			setExistTags(tags);
		}
		if (post.TagPost.length >= 1) {
			setExistPostTags(post.TagPost.map(({ tag }) => tag));
		}
	}, [tags, post.TagPost, setExistPostTags]);

	const isTagSelected = (id: number) => selectedTags.some((tag) => tag.id === id);
	const handleRemoveTagFromPost = (id: number) => {
		console.log("🚀 ~ handleRemoveTagFromPost ~ id:", id)
		submit({ tagToRemove: id }, { method: 'post', action: `/admin/posts/post/${post.id}/edit/tags`, navigate: false })
	}
	const toggleTagSelection = (tag: SerializeFrom<Tag>) => {
		if (isTagSelected(tag.id)) {
			setSelectedTags((prev) => prev.filter((selectedTag) => selectedTag.id !== tag.id));
			if (existPostTags?.find(existPostTag => existPostTag.id === tag.id)) {


				handleRemoveTagFromPost(tag.id)
			}
		} else {
			setSelectedTags((prev) => [tag, ...prev]);
		}
	};

	const isDisabled = (id: number) => isTagSelected(id) || post.TagPost.map(({ tag }) => tag.id === id);

	return (
		<div>
			Tags
			<ValidatedForm
				resetAfterSubmit
				reloadDocument={false}
				validator={tagsFormValidation}
				method="post"
				navigate={false}
				fetcher={fetcher}
				action={`/admin/posts/post/${post.id}/edit/tags`}
			>
				<FormInput name="tags" label="Add new tags" placeholder="Tags" type="text" />
				<FormInput name="postId" type="hidden" value={post.id} />
				<SubmitButton>Add tags</SubmitButton>
			</ValidatedForm>
			<div>
				Choose exist tag or create new
				<ul className="flex flex-wrap gap-1 max-w-lg">
					{existTags.map((tag) => (
						<li aria-hidden key={tag.id}>
							<button
								className={`border-2 pr-4 pl-4 hover:bg-slate-300 ${!isDisabled(tag.id) ? "bg-white" : "bg-slate-300 hover:bg-white"}`}
								onClick={() => toggleTagSelection(tag)}
							>
								{tag.name}
							</button>
						</li>
					))}
				</ul>
				<ValidatedForm validator={selectedTagsValidator}
					resetAfterSubmit
					reloadDocument={false}
					method="post"
					navigate={false}
					fetcher={fetcher}
					action={`/admin/posts/post/${post.id}/edit/tags`}
				>
					<FormInput name="selectedTags" value={JSON.stringify(selectedTags)} type="hidden" />
					<SubmitButton>Add tags to post</SubmitButton>
				</ValidatedForm>
			</div>
		</div>
	);
};



export default TagForm;
