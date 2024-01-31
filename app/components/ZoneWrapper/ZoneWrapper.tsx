import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useDroppable, useSensor,
	useSensors,
} from '@dnd-kit/core'
import { Page } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { FC, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { GetAllPostsType } from '~/service/post.server'
import { DropInstance, WidgetInstance } from '~/types/types'
import DragOverlayWrapper from '../DragOverlayWrapper/DragOverlayWrapper'
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper'



type DropZoneWrapperType = {
	dropZone: DropInstance
	widgetsData?: WidgetInstance[]
	posts: SerializeFrom<GetAllPostsType>
	page: SerializeFrom<Page>
}

const DropZoneWrapper: FC<DropZoneWrapperType> = ({ page, dropZone, widgetsData, posts }) => {
	const [open, setOpen] = useState<boolean>(true)

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 20,
		},
	});
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	});
	const sensors = useSensors(mouseSensor, touchSensor);

	const { setNodeRef } = useDroppable({
		id: "dropzone-" + dropZone.id
	})



	return (
		<div className='w-full mb-1 border-2 rounded-sm  bg-slate-50   border-gray-300 min-h-12' >
			<button onClick={() => setOpen(prev => !prev)} className='flex w-full justify-between items-center pr-2'>

				<p className='h-12 flex items-center  pl-2'  >{dropZone.name}</p>
				<MdArrowDropDown />
			</button>
			{open &&
				<DndContext sensors={sensors}>
					<div ref={setNodeRef}>
						{widgetsData && <WidgetWrapper page={page} posts={posts} widgetsData={widgetsData} />}
						{widgetsData?.length === 0 && <div className='w-full min-h-12 bg-gray-200 flex items-center pl-4 '>No widgets added eat </div>}

					</div>
					< DragOverlayWrapper widgetsData={widgetsData} />
				</DndContext >
			}
		</div>
	)
}

export default DropZoneWrapper