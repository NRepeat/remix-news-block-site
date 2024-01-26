import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { z } from "zod";
import { WidgetInstance } from "~/types/types";
import WidgetWrapper from "../WidgetWrapper/WidgetWrapper";

const widgetSchema = z.object({
	type: z.enum(['TextWidget']),
	isWidgetButton: z.boolean()
})

const WidgetDroppableArea = ({ widgets }: { widgets: WidgetInstance[] }) => {

	const [widgetsState, setWidgets] = useState<WidgetInstance[]>()

	// setWidgets(widgets)
	const { setNodeRef } = useDroppable({
		id: '1',
	});
	// useDndMonitor({

	// 	onDragEnd(event) {
	// 		const widgetActiveData = event.active.data.current
	// 		const validWidgetData = widgetSchema.parse(widgetActiveData)
	// 		const widgetData = { id: event.active.id, type: validWidgetData.type }
	// 		if (widgetData && event.over?.id === "1" && widgetsState?.length !== 10)
	// 			setWidgets(prev => {
	// 				if (!prev) {
	// 					return [widgetData]
	// 				}
	// 				return [widgetData, ...prev]
	// 			})
	// 	},
	// })
	return (
		<div ref={setNodeRef} className="w-1/2 min-w-max h-52 rounded-sm bg-slate-600">
			Drop hear
			{widgets && widgets.map(widget => <WidgetWrapper widgetInstance={widget} key={widget.id} />)}
		</div>
	);
}

export default WidgetDroppableArea