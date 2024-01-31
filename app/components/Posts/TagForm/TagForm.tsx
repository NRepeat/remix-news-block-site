import { Tag } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
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

	const [selectedTags, setSelectedTags] = useState<SerializeFrom<Tag[]>>([]);

	const [existTags, setExistTags] = useState<SerializeFrom<Tag[]>>([]);

	useEffect(() => {
		if (tags) {
			setExistTags(tags);
		}
		if (post.TagPost.length >= 1) {
			setSelectedTags(post.TagPost.map(({ tag }) => tag));
		}
	}, [tags, post.TagPost]);

	const isTagSelected = (id: number) => selectedTags.some((tag) => tag.id === id);

	const toggleTagSelection = (tag: SerializeFrom<Tag>) => {
		if (isTagSelected(tag.id)) {
			setSelectedTags((prev) => prev.filter((selectedTag) => selectedTag.id !== tag.id));



		} else {
			setSelectedTags((prev) => [tag, ...prev]);
		}
	};



	return (
		<div>
			Tags
			<ValidatedForm
				className="flex flex-col justify-start gap-1 border-b-2 pb-2 border-t-2 pt-2"
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
				<SubmitButton classNames=" inline-flex justify-left border-2 w-max pr-2 pl-2 border-blue-300 hover:bg-blue-200 rounded-sm ">Add tags</SubmitButton>
			</ValidatedForm>
			<div className="flex flex-col gap-2 pt-2">
				Choose exist tag or create new
				<ul className="flex flex-wrap gap-1 max-w-lg">
					{existTags.map((tag) => (
						<li aria-hidden key={tag.id}>
							<button
								className={`border-2 pr-4 rounded-sm pl-4 hover:bg-slate-300 ${!isTagSelected(tag.id) ? "bg-white" : "bg-slate-300 hover:bg-white"}`}
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
					<SubmitButton classNames=" inline-flex justify-center pt-1 pb-1 hover:bg-blue-400 border-2 w-full pr-2 pl-2 border-blue-500 rounded-sm">Add tags to post</SubmitButton>
				</ValidatedForm>
			</div>
		</div>
	);
};



export default TagForm;
