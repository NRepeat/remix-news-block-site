import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useDroppable, useSensor,
	useSensors,
} from '@dnd-kit/core'
import { SerializeFrom } from '@remix-run/node'
import { FC, useEffect, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { GetAllPostsType } from '~/service/post.server'
import { DropInstance, WidgetInstance } from '~/types/types'
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper'



type DropZoneWrapperType = {
	dropZone: DropInstance
	widgetsData?: WidgetInstance[]
	posts: SerializeFrom<GetAllPostsType>
}

const DropZoneWrapper: FC<DropZoneWrapperType> = ({ dropZone, widgetsData, posts }) => {
	const [open, setOpen] = useState<boolean>(true)
	useEffect(() => {
		if (widgetsData?.length !== 0) {
			setOpen(true)
		}
	}, [widgetsData])
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
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
		<div className='w-full mb-1 border-2  bg-slate-50   border-gray-300 min-h-12' >
			<button onClick={() => setOpen(prev => !prev)} className='flex w-full justify-between items-center pr-2'>

				<p className='h-12 flex items-center  pl-2'  >{dropZone.name}</p>
				<MdArrowDropDown />
			</button>
			{open &&
				<DndContext sensors={sensors}>
					<div ref={setNodeRef}>
						{widgetsData && <WidgetWrapper posts={posts} widgetsData={widgetsData} />}
						{widgetsData?.length === 0 && <div className='w-full min-h-12 bg-gray-200 flex items-center pl-4 '>No widgets added eat </div>}

					</div>
				</DndContext >
			}
		</div>
	)
}

export default DropZoneWrapper