import { useDndMonitor } from "@dnd-kit/core"
import { SerializeFrom } from "@remix-run/node"
import { FC, useEffect, useState } from "react"
import { randomNumber } from "~/routes/_index/_index"
import { GetAllPostsType } from "~/service/post.server"
import { WidgetInstance } from "~/types/types"
import DraggableWidgetWrapper from "../DraggableWidgetWrapper/DraggableWidgetWrapper"
import widgets from "../Widgets/Widgets"
type WidgetWrapperType = {
	widgetsData: WidgetInstance[]
	posts: SerializeFrom<GetAllPostsType>
}


const WidgetWrapper: FC<WidgetWrapperType> = ({ widgetsData, posts }) => {
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
		console.log("🚀 ~ widgetForms ~ widget:", widget)
		const { type } = widget

		return { Form: widgets[type].form, widget }

	})
	return (
		<>
			{
				widgetForms?.map(({ Form, widget }) => (
					<DraggableWidgetWrapper key={randomNumber()} widgetData={widget.additionalData} id={widget.id}>
						<Form key={widget.id} widget={widget} posts={posts} />
					</DraggableWidgetWrapper>
				))
			}
		</>
	)
}

export default WidgetWrapper
