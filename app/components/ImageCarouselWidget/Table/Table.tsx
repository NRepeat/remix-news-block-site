import {useDndMonitor, useDroppable} from '@dnd-kit/core';
import {Image} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useEffect, useState} from 'react';
import {randomId} from '~/utils/randomId';
import {DndWrapper} from '../Wrapper/Wrapper';

const Table = ({
  images,
  setSelectImage,
  isBaner,
  banerId,
  selectImages,
}: {
  images: (SerializeFrom<Image> | undefined)[];
  setSelectImage: React.Dispatch<React.SetStateAction<(number | undefined)[]>>;
  selectImages: (number | undefined)[];
  isBaner?: boolean;
  banerId?: string;
}) => {
  const {setNodeRef} = useDroppable({
    id: 'post-edit-widget' + randomId(),
  });
  const [newDataPosition, setDataPosition] = useState<
    (number | undefined)[] | null
  >();
  useEffect(() => {
    if (images.length !== 0) {
      setDataPosition([...selectImages.map(image => image)]);
    }
  }, [selectImages, images.length]);
  useDndMonitor({
    onDragEnd(e) {
      const active = e.active;
      const over = e.over;
      if (!newDataPosition) return null;
      const draggedWidgetIndex = newDataPosition.findIndex(
        w => w === active?.data?.current?.id
      );
      const overIndex = newDataPosition.findIndex(
        w => w === over?.data?.current?.id
      );
      if (over?.data?.current?.isTopHalfDroppable) {
        if (draggedWidgetIndex !== -1 && overIndex !== -1) {
          const [draggedWidget] = newDataPosition.splice(draggedWidgetIndex, 1);
          newDataPosition.splice(overIndex, 0, draggedWidget);
          setDataPosition(prev =>
            Array.isArray(prev) ? [...newDataPosition] : prev
          );

          setSelectImage(newDataPosition);
        }
      }
      if (over?.data?.current?.isBottomHalfDroppable) {
        if (draggedWidgetIndex !== -1 && overIndex !== -1) {
          const [draggedWidget] = newDataPosition.splice(draggedWidgetIndex, 1);
          newDataPosition.splice(overIndex + 1, 0, draggedWidget);

          setDataPosition(prev =>
            Array.isArray(prev) ? [...newDataPosition] : prev
          );
          setSelectImage(newDataPosition);
        }
      }
      return null;
    },
  });
  return (
    <>
      <div className="flex flex-col gap-4 p-4" ref={setNodeRef}>
        {images &&
          images.map((image, i) => {
            const src = image?.path.includes('/')
              ? image.path
              : `/uploads/${image?.path}`;
            return (
              <DndWrapper
                key={i}
                banerId={banerId}
                isBaner={isBaner}
                setSelectImage={setSelectImage}
                image={image}
                src={src}
              />
            );
          })}
      </div>
    </>
  );
};
export default Table;
