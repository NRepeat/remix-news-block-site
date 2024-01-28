import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import { SerializeFrom } from '@remix-run/node'
import React, { FC, useEffect, useState } from 'react'
import { GetAllPostsType } from '~/service/post.server'

type DndTableWrapper = {
	children: React.ReactNode
	data: SerializeFrom<GetAllPostsType>
	setSelectedPosts: React.Dispatch<React.SetStateAction<SerializeFrom<GetAllPostsType>>>
}




const DndTableWrapper: FC<DndTableWrapper> = ({ children, data, setSelectedPosts }) => {
	const { setNodeRef } = useDroppable({
		id: 'post-edit-widget',
	});
	const [newDataPosition, setDataPosition] = useState<SerializeFrom<GetAllPostsType> | null>()
	useEffect(() => {
		if (data.length !== 0) {
			setDataPosition([...data.map((post) => post)]);
		}
	}, [data]);
	useDndMonitor({

		onDragEnd(e) {


			const active = e.active
			const over = e.over
			if (!newDataPosition) return null
			const draggedWidgetIndex = newDataPosition.findIndex((w) => w.id === active?.data?.current?.id);
			const overIndex = newDataPosition.findIndex((w) => w.id === over?.data?.current?.id);
			if (over?.data?.current?.isTopHalfDroppable) {


				if (draggedWidgetIndex !== -1 && overIndex !== -1) {
					const [draggedWidget] = newDataPosition.splice(draggedWidgetIndex, 1);
					newDataPosition.splice(overIndex, 0, draggedWidget);
					setDataPosition(prev => Array.isArray(prev) ? [...newDataPosition] : prev)

					setSelectedPosts(newDataPosition)
				}
			}
			if (over?.data?.current?.isBottomHalfDroppable) {


				if (draggedWidgetIndex !== -1 && overIndex !== -1) {
					const [draggedWidget] = newDataPosition.splice(draggedWidgetIndex, 1);
					newDataPosition.splice(overIndex + 1, 0, draggedWidget);

					setDataPosition(prev => Array.isArray(prev) ? [...newDataPosition] : prev)
					setSelectedPosts(newDataPosition)
				}
			}
			return null;
		}
	})

	return <div ref={setNodeRef}> {children} </div>
}

export default DndTableWrapper