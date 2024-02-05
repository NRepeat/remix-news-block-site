import {Image, Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {useCallback} from 'react';
import {PostWithTags} from '~/service/post.server';
import {WidgetInstance} from '~/types/types';
import WidgetButtonList from '../WidgetList/WidgetList';
import DropZoneWrapper from '../ZoneWrapper/ZoneWrapper';
import {getDropZones} from './dropZones';
import {getWidgetButtons} from './widgetButtons';

type DropZone = {
  isSave: boolean | 'save';
  setSave: React.Dispatch<React.SetStateAction<boolean | 'save'>>;
  images: SerializeFrom<Image[]>;
  page: SerializeFrom<Page>;
  posts: SerializeFrom<PostWithTags[]>;
};

const DropZone = ({page, posts, images, isSave, setSave}: DropZone) => {
  const widgetsButtons = getWidgetButtons(page);
  if (!widgetsButtons) throw new Error('Not found');
  const dropZones = getDropZones(page);
  if (!dropZones) throw new Error('Not found');
  const content = JSON.parse(
    page.content && page.content !== 'undefined' ? page.content : '[]'
  ) as [];
  const getWidgets: () => WidgetInstance[] = useCallback(() => {
    return content.map(item =>
      typeof item === 'string' ? JSON.parse(item) : (item as WidgetInstance)
    );
  }, [content]);
  return (
    <div className="flex gap-4 justify-between pt-4">
      <WidgetButtonList
        page={page}
        widgetsArr={getWidgets()}
        buttons={widgetsButtons}
        dropZones={dropZones}
      />
      <div className="w-full  gap-2">
        {dropZones.map(zone => (
          <DropZoneWrapper
            isSave={isSave}
            setSave={setSave}
            images={images}
            page={page}
            key={zone.id}
            posts={posts}
            dropZone={zone}
            widgetsData={getWidgets()}
          />
        ))}
      </div>
    </div>
  );
};

export default DropZone;
