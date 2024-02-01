import { useDndMonitor } from "@dnd-kit/core"
import { Image, Page } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { FC, useEffect, useState } from "react"
import { GetAllPostsType } from "~/service/post.server"
import { WidgetInstance } from "~/types/types"
import DraggableWidgetWrapper from "../DraggableWidgetWrapper/DraggableWidgetWrapper"
import widgets from "../Widgets/Widgets"
type WidgetWrapperType = {
	widgetsData: WidgetInstance[]
	images: SerializeFrom<Image[]>
	posts: SerializeFrom<GetAllPostsType>
	page: SerializeFrom<Page>
}


const WidgetWrapper: FC<WidgetWrapperType> = ({ images, widgetsData, posts, page }) => {

	const [newWidgetPosition, setNewWidgetPosition] = useState<WidgetInstance[] | null>()
	useEffect(() => {
		if (widgetsData.length !== 0) {
			setNewWidgetPosition([...widgetsData])
		}
	}, [widgetsData])
	useDndMonitor({
		onDragEnd(e) {

			const active = e.active
			const over = e.over
			if (!newWidgetPosition) return null
			const draggedWidgetIndex = newWidgetPosition.findIndex((w) => w.id === active?.data?.current?.id);
			const overIndex = newWidgetPosition.findIndex((w) => w.id === over?.data?.current?.id);
			if (over?.data?.current?.isTopHalfDroppable) {


				if (draggedWidgetIndex !== -1 && overIndex !== -1) {
					const [draggedWidget] = newWidgetPosition.splice(draggedWidgetIndex, 1);
					newWidgetPosition.splice(overIndex, 0, draggedWidget);
					setNewWidgetPosition(prev => Array.isArray(prev) ? [...newWidgetPosition] : prev)
				}
			}
			if (over?.data?.current?.isBottomHalfDroppable) {


				if (draggedWidgetIndex !== -1 && overIndex !== -1) {
					const [draggedWidget] = newWidgetPosition.splice(draggedWidgetIndex, 1);
					newWidgetPosition.splice(overIndex + 1, 0, draggedWidget);

					setNewWidgetPosition(prev => Array.isArray(prev) ? [...newWidgetPosition] : prev)
				}
			}
			return null;
		}
	})

	const widgetForms = newWidgetPosition?.map(widget => {
		const { type } = widget

		return { Form: widgets[type].widget, widget }

	})





	return (
		<div>
			{
				widgetForms?.map(({ Form, widget }, i) => (
					<DraggableWidgetWrapper key={i} widgetData={widget.additionalData} id={widget.id}>
						<Form key={widget.id} widget={widget} images={images} page={page} posts={posts} />
					</DraggableWidgetWrapper>
				))
			}
		</div>
	)
}

export default WidgetWrapper



