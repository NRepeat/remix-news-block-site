import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {Image, Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {FC, useState} from 'react';
import {MdArrowDropDown} from 'react-icons/md';
import {GetAllPostsType} from '~/service/post.server';
import {DropInstance, WidgetInstance} from '~/types/types';
import DragOverlayWrapper from '../DragOverlayWrapper/DragOverlayWrapper';
import WidgetWrapper from '../WidgetWrapper/WidgetWrapper';

type DropZoneWrapperType = {
  dropZone: DropInstance;
  widgetsData?: WidgetInstance[];
  posts: SerializeFrom<GetAllPostsType>;
  images: SerializeFrom<Image[]>;
  page: SerializeFrom<Page>;
  isSave: boolean | 'save';
  setSave: React.Dispatch<React.SetStateAction<boolean | 'save'>>;
};

const DropZoneWrapper: FC<DropZoneWrapperType> = ({
  images,
  page,
  dropZone,
  widgetsData,
  posts,
  isSave,
  setSave,
}) => {
  const [open, setOpen] = useState<boolean>(true);

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

  const {setNodeRef} = useDroppable({
    id: 'dropzone-' + dropZone.id,
  });

  return (
    <div
      className="w-full mb-1 border-2 rounded-sm  bg-slate-300  
 border-slate-400 min-h-12"
    >
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex w-full justify-between items-center pr-2"
      >
        <p className="h-12 flex items-center text-xl font-bold pl-2">
          {dropZone.name}
        </p>
        <MdArrowDropDown />
      </button>
      {open && (
        <DndContext sensors={sensors}>
          <div className="p-4 bg-slate-200" ref={setNodeRef}>
            {widgetsData && (
              <WidgetWrapper
                isSave={isSave}
                setSave={setSave}
                dropZone={dropZone}
                page={page}
                images={images}
                posts={posts}
                widgetsData={widgetsData}
              />
            )}
            {widgetsData?.length === 0 && (
              <div className="w-full min-h-12 bg-gray-200 flex items-center pl-4 ">
                No widgets added eat
              </div>
            )}
          </div>
          <DragOverlayWrapper widgetsData={widgetsData} />
        </DndContext>
      )}
    </div>
  );
};

export default DropZoneWrapper;
