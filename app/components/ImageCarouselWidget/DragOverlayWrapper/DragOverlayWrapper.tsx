import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { Image } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { useState } from "react";
import styles from "./styles.module.css";



const DrugOverlay = ({ selectedImages }: {
	selectedImages: (SerializeFrom<Image> | undefined)[]
}) => {
	let elements: (SerializeFrom<Image> | undefined)[] = [];
	if (selectedImages) elements = [...selectedImages]
	const [draggedElement, setDraggedElement] = useState<Active | null>(null);
	useDndMonitor({
		onDragStart: event => {
			setDraggedElement(event.active);
		},
		onDragCancel: () => {
			setDraggedElement(null);
		},
		onDragEnd: () => {
			setDraggedElement(null);
		},
	});
	if (!draggedElement) return null;
	const elementId = draggedElement?.data?.current?.id
	const image = elements?.find(el => el?.id === elementId);
	const src = image?.path.includes('/') ? image.path : `/uploads/${image?.path}`;

	const node = (
		<div className={styles.container}>
			<div className='relative min-h-24 w-full inline-flex gap-5 rounded-sm border-2 border-gray-400 items-center'>
				<img className='max-w-24 max-h-24' src={src} alt={image?.path} />
				<p className='w-1/6'>
					Id:
					{image?.id}
				</p>
				<p className='w-full'>Path:
					{image?.path}</p>
			</div>
		</div>
	);
	return <DragOverlay>{node}</DragOverlay>;
}

export default DrugOverlay