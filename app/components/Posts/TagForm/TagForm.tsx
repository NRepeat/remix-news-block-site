import { Tag } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useFetcher, useSubmit } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { FC, useEffect, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton";
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput";
import { loader } from "~/routes/admin/posts_.post/$id.edit/route";
import { PostWithTags } from "~/service/post.server";


type TagFormType = {
	post: SerializeFrom<PostWithTags>;
	tags: SerializeFrom<Tag[] | null>;
};

export const tagsFormValidation = withZod(
	z.object({
		tags: z.string(),
		postId: z.string(),
	})
);
export const selectedTagsValidator = withZod(z.object({ selectedTags: z.string() }));


const TagForm: FC<TagFormType> = ({ post, tags }) => {
	const submit = useSubmit()
	const fetcher = useFetcher<typeof loader>();
	const [selectedTag, setSelectedTag] = useState<SerializeFrom<Tag[]>>([]);



	useEffect(() => {

		if (post.TagPost.length >= 1) {
			setSelectedTag(post.TagPost.map(({ tag }) => tag));
		}
	}, [tags, post.TagPost]);

	const handleTagClick = (tag: SerializeFrom<Tag>) => {
		const isDuplicate = selectedTag.some(selected => selected.id === tag.id);

		if (!isDuplicate) {
			selectedTag.push(tag)
			submit({ selectedTags: JSON.stringify(selectedTag) }, { method: 'POST', navigate: false, action: `/admin/posts/post/${post.id}/edit/tags` })
		} else {
			console.log(`Tag "${tag.name}" is already selected.`);
		}
	};
	return (
		<div className="flex flex-col gap-4 p-4 border-2 border-slate-300 rounded-sm">
			<p className=" text-lg">
				Tags
			</p>
			<ul className="flex  flex-wrap gap-2">
				{selectedTag.length > 0 && selectedTag.map(tag => <li className="bg-slate-300 p-2 rounded-sm" key={tag.id}>{tag.name}</li>)}
			</ul>
			<div className="flex flex-col gap-2 pt-2">
				<p>
					Search exist tag or create new

				</p>
				<fetcher.Form method="get">
					<input className="inline-flex pl-2 w-full border-2 rounded-sm" placeholder="Search tag" type="text" name="query" onChange={(event) => {
						fetcher.submit(event.currentTarget.form)
					}} />

					{fetcher.data && fetcher.data.query && Array.isArray(fetcher.data.tags) && fetcher.data.tags.length >= 1 && <ul className="flex  bg-white border-2 p-4 gap-2 max-h-[300px] overflow-auto flex-wrap w-full">
						{

							fetcher.data.tags.map(tag => (
								<li className=" rounded hover:bg-green-200 cursor-pointer pr-2 pl-2 pt-2 pb-2 border-2  " aria-hidden onClick={() => handleTagClick(tag)} key={tag.id}>{tag.name}</li>
							))
						}


					</ul>}

				</fetcher.Form>
				{fetcher.data && fetcher.data.tags.length <= 0 &&
					<ValidatedForm
						className="flex flex-col justify-start gap-1  pb-2  pt-2"
						validator={tagsFormValidation}
						method="post"
						navigate={false}
						fetcher={fetcher}
						action={`/admin/posts/post/${post.id}/edit/tags`}
					>
						<FormInput name="tags" value={fetcher.data.query || ''} placeholder="Tags" type="hidden" />
						<FormInput name="postId" type="hidden" value={post.id} />
						<SubmitButton classNames=" inline-flex justify-left border-2 w-max pr-2 pl-2 border-blue-300 hover:bg-blue-200 rounded-sm ">Add tags</SubmitButton>
					</ValidatedForm>
				}
			</div>
		</div>
	);
};



export default TagForm;
