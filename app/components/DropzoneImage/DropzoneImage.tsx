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

	return (<div className="flex flex-col ">
		<ValidatedForm className={"flex flex-col items-start gap-2  pb-4"} validator={mediaValidator} fetcher={fetcher} encType="multipart/form-data" action={action} method="post" navigate={false}>
			<label htmlFor="file">{label}</label>
			<FormInput name='file' type='file' />
			<FormInput name="type" type="hidden" value={type} />

			<SubmitButton classNames="rounded-sm pl-4 pr-4 border-2 border-green-200 hover:bg-green-100 " >
				Save image
			</SubmitButton>
		</ValidatedForm>
		<ValidatedForm className="flex flex-col gap-2 items-start border-t-2  border-b-2 pb-2 " validator={mediaUrlValidator} fetcher={fetcher} action={`${action}/url`} method="post" navigate={false}>
			<p className="text-lg pt-1">Url </p>
			<FormInput placeholder="Your url" name="url" type="url" label="" />
			<FormInput type="hidden" value={"url"} name="type" />
			<SubmitButton classNames="rounded-sm pl-4 pr-4 border-2 border-sky-200 hover:bg-sky-100 " >
				Save url
			</SubmitButton>
		</ValidatedForm>
	</div>

	)
}

export default MediaForm