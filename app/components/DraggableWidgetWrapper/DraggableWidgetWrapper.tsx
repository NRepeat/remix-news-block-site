import {UniqueIdentifier, useDraggable, useDroppable} from '@dnd-kit/core';
import {FC} from 'react';
import {WidgetDataType} from '~/types/types';
import styles from './styles.module.css';

type DraggableWidgetWrapperType = {
  id: UniqueIdentifier;
  widgetData: WidgetDataType | undefined;
  children: React.ReactNode;
};

const DraggableWidgetWrapper: FC<DraggableWidgetWrapperType> = ({
  id,
  children,
  widgetData,
}) => {
  const droppableTop = useDroppable({
    id: id + '-top',
    data: {
      id,
      isTopHalfDroppable: true,
    },
  });
  const droppableBottom = useDroppable({
    id: id + '-bottom',
    data: {
      id,
      isBottomHalfDroppable: true,
    },
  });
  const {setNodeRef, attributes, listeners, isDragging} = useDraggable({
    id,
    data: {id, widgetData},
  });
  if (isDragging) return null;
  attributes['aria-describedby'] = id as string;
  return (
    <div
      className={styles.wrapper}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {children}
      <div ref={droppableTop.setNodeRef} className={styles.topArea} />
      <div ref={droppableBottom.setNodeRef} className={styles.bottomArea} />
    </div>
  );
};

export default DraggableWidgetWrapper;
