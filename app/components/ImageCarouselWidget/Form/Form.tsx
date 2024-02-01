import { Image, Page } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { useEffect, useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import MediaLibrary from "~/components/Media/MediaLibrary/MediaLibrary";
import Modal from "~/components/Modal/Modal";
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton";
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput";
import WidgetFormWrapper from "~/components/WidgetFormWrapper/WidgetFormWrapper";
import { WidgetInstance } from "~/types/types";
import Table from "../Table/Table";

type ImageCarouselFormType = {
	widget: WidgetInstance;
	images?: SerializeFrom<Image[]>,
	page: SerializeFrom<Page>

};
export const imageCarouselFormValidator = withZod(z.object({
	imagesIds: z.coerce.string().optional(),
	id: z.coerce.string(),
	carouselId: z.coerce.number().optional()
}))


const Form = ({ page, widget, images }: ImageCarouselFormType) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectImages, setSelectImage] = useState<(number | undefined)[]>([])
	const [carouselId, setCarouselId] = useState<string>()


	useEffect(() => {
		if (page) {
			const content = JSON.parse(page.content) as WidgetInstance[];
			const widgetsInstanceContent = content.find(w => w.id === widget.id)?.additionalData?.content as string;

			if (widgetsInstanceContent) {
				const { imagesIds, existCarouselId } = JSON.parse(widgetsInstanceContent) as { imagesIds: string, existCarouselId: string };
				const parsedPostsIds = typeof imagesIds === "string" ? JSON.parse(imagesIds) as number[] : imagesIds;
				const filteredPosts = parsedPostsIds.map(id => images?.find(image => image.id === id)).filter(post => post !== undefined)
				setCarouselId(existCarouselId)
				setSelectImage(filteredPosts.map(img => img?.id));
			}
		}
	}, [images, page, widget.id]);
	const selectedImages = selectImages.map(id => images?.find(image => image.id === id)).filter(post => post !== undefined)
	return (
		<WidgetFormWrapper widget={widget}>

			<button className='inline-flex w-full border-2 items-center pt-2 pb-2 border-green-600 bg-green-200 rounded hover:border-black' onClick={(e) => { e.preventDefault(), setModalOpen(true) }} onKeyDown={() => setModalOpen(true)}>
				<p className='w-full text-center'>Add image</p>
			</button>
			{modalOpen && <Modal setIsOpen={setModalOpen} head="Select or Upload Media">
				<MediaLibrary setSelectImage={setSelectImage} action={`/admin/pages/pages/${page.id}/create/upload`} images={images} />
			</Modal>}

			<Table images={selectedImages} />
			<ValidatedForm validator={imageCarouselFormValidator} method="post">
				<FormInput name="imagesIds" type="hidden" value={selectImages ? JSON.stringify(selectImages) : ""} />
				<FormInput type="hidden" name="id" value={widget.id} />
				<FormInput type="hidden" name="carouselId" value={carouselId} />
				<SubmitButton classNames='border-2 w-1/3 border-green-600 rounded-sm hover:bg-green-200 pr-2 pl-2 hover:border-black' >Save</SubmitButton>
			</ValidatedForm>
		</WidgetFormWrapper>
	)
}

export default Form

