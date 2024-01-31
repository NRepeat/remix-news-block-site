import { useDraggable, useDroppable } from '@dnd-kit/core';
import { SerializeFrom } from '@remix-run/node';
import { PostWithTags } from '~/service/post.server';
import styles from "./styles.module.css";

const DndPostWrapper = ({ post }: { post: SerializeFrom<PostWithTags> }) => {
	const { setNodeRef: setDraggableNodeRef, attributes, listeners } = useDraggable({
		id: post.id + 'post-edit-widget',
		data: { id: post.id }
	})
	const droppableTop = useDroppable({
		id: post.id + '-top',
		data: {
			id: post.id,
			isTopHalfDroppable: true,
		},
	});
	const droppableBottom = useDroppable({
		id: post.id + '-bottom',
		data: {
			id: post.id,
			isBottomHalfDroppable: true,
		},
	});

	return <>
		{
			post && <div className='relative p-5 border-2 border-gray-400' ref={setDraggableNodeRef} {...attributes} {...listeners} key={post.id}>
				<div ref={droppableTop.setNodeRef} className={styles.topArea} />

				{post.title}
				<div ref={droppableBottom.setNodeRef} className={styles.bottomArea} />
			</div>}
	</>


}

export default DndPostWrapper