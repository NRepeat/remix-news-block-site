import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { validationError } from "remix-validated-form";
import { selectedTagsValidator, tagsFormValidation } from "~/components/Posts/TagForm/TagForm";
import { connectTagsToPost, createTags, deleteTag } from "~/service/tags.server";

export async function action({ params, request }: ActionFunctionArgs) {
	try {
		const id = params.id;
		if (!id) {
			throw new Error('Not found');
		}

		const formData = await request.formData();

		const tagToRemove = formData.get("tagToRemove") as string
		if (tagToRemove) {
			await deleteTag(parseInt(tagToRemove))
			return redirect(`/admin/posts/post/${id}/edit`);
		}
		const tagsFormData = await tagsFormValidation.validate(formData);
		if (tagsFormData.error) {
			const selectedTagsFormData = await selectedTagsValidator.validate(formData);

			if (selectedTagsFormData.error) {
				return validationError({
					fieldErrors: {
						tags: "Data not valid",
					},
				});
			}

			await connectTagsToPost({
				postId: parseInt(id),
				tags: JSON.parse(selectedTagsFormData.data.selectedTags),
			});

			return redirect(`/admin/posts/post/${id}/edit`);
		}

		const createdTags = await createTags({
			tags: tagsFormData.data.tags.split(','),
		});

		await connectTagsToPost({
			postId: parseInt(id),
			tags: createdTags,
		});


		return redirect(`/admin/posts/post/${id}/edit`);
	} catch (error) {
		console.log("🚀 ~ action ~ error:", error);
		throw new Error("Bad request");
	}
}
