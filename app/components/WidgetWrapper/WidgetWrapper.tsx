import {useDndMonitor} from '@dnd-kit/core';
import {Image, Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useSubmit} from '@remix-run/react';
import {FC, useCallback, useEffect, useState} from 'react';
import {GetAllPostsType} from '~/service/post.server';
import {DropInstance, WidgetInstance} from '~/types/types';
import DraggableWidgetWrapper from '../DraggableWidgetWrapper/DraggableWidgetWrapper';
import widgets from '../Widgets/Widgets';
type WidgetWrapperType = {
  widgetsData: WidgetInstance[];
  images: SerializeFrom<Image[]>;
  posts: SerializeFrom<GetAllPostsType>;
  page: SerializeFrom<Page>;
  dropZone: DropInstance;
  isSave: boolean | 'save';
  setSave: React.Dispatch<React.SetStateAction<boolean | 'save'>>;
};

const WidgetWrapper: FC<WidgetWrapperType> = ({
  images,
  dropZone,
  widgetsData,
  posts,
  page,
  isSave,
  setSave,
}) => {
  const submit = useSubmit();
  const [newWidgetPosition, setNewWidgetPosition] = useState<
    WidgetInstance[] | null
  >();
  const handleSubmit = useCallback(
    (position: WidgetInstance[] | null | undefined) => {
      submit(
        {type: 'drop', widgets: JSON.stringify(position)},
        {method: 'post', navigate: false}
      );
      setSave(false);
    },
    [submit, setSave]
  );
  useEffect(() => {
    if (widgetsData.length !== 0) {
      setNewWidgetPosition([...widgetsData]);
    }
    if (widgetsData.length == 0) {
      setNewWidgetPosition([...widgetsData]);
    }
  }, [widgetsData]);

  useEffect(() => {
    if (isSave === 'save') {
      handleSubmit(newWidgetPosition);
    }
  }, [isSave, newWidgetPosition, handleSubmit]);
  useDndMonitor({
    onDragEnd(e) {
      const active = e.active;
      const over = e.over;
      if (!newWidgetPosition) return null;
      const draggedWidgetIndex = newWidgetPosition.findIndex(
        w => w.id === active?.data?.current?.id
      );
      const overIndex = newWidgetPosition.findIndex(
        w => w.id === over?.data?.current?.id
      );
      if (over?.data?.current?.isTopHalfDroppable) {
        if (draggedWidgetIndex !== -1 && overIndex !== -1) {
          const [draggedWidget] = newWidgetPosition.splice(
            draggedWidgetIndex,
            1
          );
          newWidgetPosition.splice(overIndex, 0, draggedWidget);
          setNewWidgetPosition(prev =>
            Array.isArray(prev) ? [...newWidgetPosition] : prev
          );
          setSave(true);
        }
      }
      if (over?.data?.current?.isBottomHalfDroppable) {
        if (draggedWidgetIndex !== -1 && overIndex !== -1) {
          const [draggedWidget] = newWidgetPosition.splice(
            draggedWidgetIndex,
            1
          );
          newWidgetPosition.splice(overIndex + 1, 0, draggedWidget);

          setNewWidgetPosition(prev =>
            Array.isArray(prev) ? [...newWidgetPosition] : prev
          );
          setSave(true);
        }
      }
      return null;
    },
  });

  const widgetForms = newWidgetPosition?.map(widget => {
    const {type, containerId} = widget;

    if (dropZone.id === containerId) {
      return {Form: widgets[type].widget, widget};
    }
  });

  return (
    <div className=" flex flex-col rounded-sm p-2 border-2 gap-2 bg-slate-100 ">
      {widgetForms &&
        widgetForms.length >= 1 &&
        widgetForms.map((data, i) => {
          if (data) {
            return (
              <DraggableWidgetWrapper
                key={i}
                widgetData={data.widget.additionalData}
                id={data.widget.id}
              >
                <data.Form
                  key={data.widget.id}
                  widget={data.widget}
                  images={images}
                  page={page}
                  posts={posts}
                />
              </DraggableWidgetWrapper>
            );
          }
        })}
    </div>
  );
};

export default WidgetWrapper;
