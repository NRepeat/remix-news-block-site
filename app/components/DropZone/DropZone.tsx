import { Page } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { useCallback } from 'react';
import { PostWithTags } from '~/service/post.server';
import { DropInstance, WidgetButton, WidgetInstance } from '~/types/types';
import WidgetButtonList from '../WidgetList/WidgetList';
import DropZoneWrapper from '../ZoneWrapper/ZoneWrapper';

const widgetsButtons: WidgetButton[] = [{ id: `${22}`, type: "TextWidget" }, { id: `${11}`, type: "CarouselPostWidget" }];
const dropZones: DropInstance[] = [{ id: `1`, type: "MainPage", name: "Main page widget container " }]


const DropZone = ({ page, posts }: { page: SerializeFrom<Page>, posts: SerializeFrom<PostWithTags[]> }) => {
	const content = JSON.parse(page.content ? page.content : '[]') as [];
	const getWidgets: () => WidgetInstance[] = useCallback(() => {
		return content.map((item) =>
			typeof item === 'string' ? JSON.parse(item) : item as WidgetInstance);
	}, [content]);
	return (
		<div className="flex gap-4 justify-between pt-4">
			<WidgetButtonList widgetsArr={getWidgets()} buttons={widgetsButtons} dropZones={dropZones} />
			<div className="w-full  gap-2">
				{dropZones.map(zone => <DropZoneWrapper page={page} key={zone.id} posts={posts} dropZone={zone} widgetsData={getWidgets()} />)}
			</div>
		</div>
	)



}

export default DropZone