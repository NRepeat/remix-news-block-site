import { useDndMonitor } from "@dnd-kit/core"
import { SerializeFrom } from "@remix-run/node"
import { useSubmit } from "@remix-run/react"
import { FC } from "react"
import { randomNumber } from "~/routes/admin/pages/page/$id/edit/_index"
import { GetAllPostsType } from "~/service/post.server"
import { WidgetInstance } from "~/types/types"
import DraggableWidgetWrapper from "../DraggableWidgetWrapper/DraggableWidgetWrapper"
import widgets from "../Widgets/Widgets"
type WidgetWrapperType = {
	widgetsData: WidgetInstance[]
	posts: SerializeFrom<GetAllPostsType>
}


const WidgetWrapper: FC<WidgetWrapperType> = ({ widgetsData, posts }) => {
	const submit = useSubmit()
	const newWidgetPosition = widgetsData

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
					submit({ type: "drop", widgets: JSON.stringify(newWidgetPosition) }, { method: "post", navigate: false, })
				}

			}
			if (over?.data?.current?.isBottomHalfDroppable) {


				if (draggedWidgetIndex !== -1 && overIndex !== -1) {
					const [draggedWidget] = newWidgetPosition.splice(draggedWidgetIndex, 1);
					console.log("🚀 ~ onDragEnd ~ draggedWidget:", draggedWidget)
					newWidgetPosition.splice(overIndex, 0, draggedWidget);
					console.log("🚀 ~ onDragEnd ~ newWidgetPosition:", newWidgetPosition)

					submit({ type: "drop", widgets: JSON.stringify(newWidgetPosition) }, { method: "post", navigate: false, })

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
		<>
			{
				widgetForms.map(({ Form, widget }) => (
					<DraggableWidgetWrapper key={randomNumber()} widgetData={widget.additionalData} id={widget.id}>
						<Form key={widget.id} widget={widget} posts={posts} />
					</DraggableWidgetWrapper>
				))
			}
		</>
	)
}

export default WidgetWrapper
