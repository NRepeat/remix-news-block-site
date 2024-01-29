import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { WidgetInstance } from '~/types/types';
import widgets from '../Widgets/Widgets';
import styles from "./styles.module.css";
const DragOverlayWrapper = ({ widgetsData }: { widgetsData: WidgetInstance[] | undefined }) => {

	let elements: WidgetInstance[] = [];
	if (widgetsData) elements = [...widgetsData]
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
	let node;
	const elementId = draggedElement?.data?.current?.id;
	const element = elements?.find(el => el.id === elementId);
	if (!element) node = <div>Element not found</div>;
	else {
		const Widget = widgets[element.type].widget;
		node = (
			<div className={styles.container}>
				<Widget widget={element} />
			</div>
		);
		return <DragOverlay>{node}</DragOverlay>;
	}
}
export default DragOverlayWrapper