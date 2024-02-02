import {Active, DragOverlay, useDndMonitor} from '@dnd-kit/core';
import {SerializeFrom} from '@remix-run/node';
import {useState} from 'react';
import {PostWithTags} from '~/service/post.server';

const DrugOverlay = ({
  selectedPosts,
}: {
  selectedPosts: SerializeFrom<PostWithTags>[];
}) => {
  let elements: SerializeFrom<PostWithTags>[] = [];
  if (selectedPosts) elements = [...selectedPosts];
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
  const elementId = draggedElement?.data?.current?.id;
  const post = elements?.find(el => el.id === elementId);

  const node = (
    <div className="relative min-h-12 inline-flex w-full items-center gap-5 rounded-sm border-2 border-gray-400">
      <p className="pl-1 border-r-2 w-1/6">
        ID:
        {post?.id}
      </p>
      <p className="w-1/2 border-r-2">
        Title:
        {post?.title}
      </p>
      <p className="pr-1 w-1/6">
        Rating:
        {post?.rating}/5
      </p>
    </div>
  );
  return <DragOverlay>{node}</DragOverlay>;
};

export default DrugOverlay;
