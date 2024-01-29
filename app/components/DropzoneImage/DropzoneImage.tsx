import { useFetcher } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from 'remix-validated-form';
import { z } from "zod";
import { zfd } from "zod-form-data";
import { SubmitButton } from "../UI/SubmitButton/SubmitButton";
import FormInput from "../UI/ValidatedFormInput/ValidatedFormInput";


export type MediaType = "postThumbnail" | "postImage"
type MediaFormType = {
	action: string,
	type: MediaType
	label: string
}


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const mediaValidator = withZod(
	z.object({
		file: zfd.file().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`).refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported."
		),
		type: zfd.text()
	})
);
export const mediaUrlValidator = withZod(z.object({
	url: zfd.text(),
	type: zfd.text()
})
);
const MediaForm = ({ action, type, label }: MediaFormType) => {
	const fetcher = useFetcher()

	return (<>
		<ValidatedForm validator={mediaValidator} fetcher={fetcher} encType="multipart/form-data" action={action} method="post" navigate={false}>
			<label htmlFor="file">{label}</label>
			<FormInput name='file' type='file' />
			<FormInput name="type" type="hidden" value={type} />

			<SubmitButton >
				Save
			</SubmitButton>
		</ValidatedForm>
		<ValidatedForm validator={mediaUrlValidator} fetcher={fetcher} action={`${action}/url`} method="post" navigate={false}>
			<FormInput name="url" type="url" label="Url" />
			<FormInput type="hidden" value={"url"} name="type" />
			<SubmitButton >
				Save
			</SubmitButton>
		</ValidatedForm>
	</>

	)
}

export default MediaForm