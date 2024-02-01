import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Image } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { VscDiffRemoved } from "react-icons/vsc";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import Modal from "~/components/Modal/Modal";
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton";
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput";
import styles from "./styles.module.css";
export const DndWrapper = ({ image, src, setSelectImage }: {

	image: SerializeFrom<Image> | undefined,
	src: string
	setSelectImage: React.Dispatch<React.SetStateAction<(number | undefined)[]>>
}) => {
	console.log("🚀 ~ image:", image)
	if (!image) throw new Error("not found")
	const { setNodeRef: setDraggableNodeRef, attributes, listeners } = useDraggable({
		id: image.id + 'image-edit-widget',
		data: { id: image.id }
	})
	const droppableTop = useDroppable({
		id: image.id + '-top',
		data: {
			id: image.id,
			isTopHalfDroppable: true,
		},
	});
	const droppableBottom = useDroppable({
		id: image.id + '-bottom',
		data: {
			id: image.id,
			isBottomHalfDroppable: true,
		},
	});
	const [isOpen, setOpen] = useState<boolean>(false)
	const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
		e.stopPropagation()
		setSelectImage(prev => {
			if (prev && Array.isArray(prev)) {
				return prev.filter(prevId => prevId !== id)
			}
			return prev
		})
	}
	return (
		<>

			<div aria-hidden onClick={() => setOpen(prev => !prev)} className='relative min-h-24 pr-4 pl-4 w-full inline-flex gap-5 rounded-sm border-2 border-gray-400 items-center' ref={setDraggableNodeRef} {...attributes} {...listeners}>
				<button onClick={(e) => handleDeleteImage(e, image.id)} className="sticky right-0 top-0 z-200 "> < VscDiffRemoved className="w-6 h-6 fill-red-500 " /> </button>
				<div ref={droppableTop.setNodeRef} className={styles.topArea} />
				<img className='max-w-24 max-h-24 object-cover' src={src} alt={image?.path} />
				<p className='w-1/6'>
					Id:
					{image?.id}
				</p>
				<p className='w-full text-ellipsis '>Path:
					{image?.path}</p>


				<div ref={droppableBottom.setNodeRef} className={styles.bottomArea} />

			</div>


			{isOpen && <Modal head="Add link" setIsOpen={setOpen} >
				<div className="w-full max-h-[80%] flex flex-col gap-4  justify-center items-center">
					<img className='w-full object-cover h-full' src={src} alt={image?.path} />
					<ValidatedForm className="flex w-full justify-start h-lg flex-col rounded-sm gap-4  border-2 p-8 border-slate-400" defaultValues={{ link: image.link ?? "" }} validator={imageLinkValidator} method="post" >
						<p className="font-bold text-xl">Edit link</p>
						<FormInput name="link" placeholder="Link" type="text" />
						<FormInput name="id" value={image.id} type="hidden" />
						<SubmitButton classNames="border-2 rounded-sm border-blue-400 p-4 hover:bg-blue-200">Save</SubmitButton>
					</ValidatedForm>


				</div>

			</Modal>}
		</>

	)
}
export const imageLinkValidator = withZod(z.object({
	link: z.string(),
	id: z.coerce.number()

}))