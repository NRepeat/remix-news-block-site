import { Image, Page } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { useCallback } from 'react';
import { PostWithTags } from '~/service/post.server';
import { DropInstance, WidgetButton, WidgetInstance } from '~/types/types';
import { randomId } from '~/utils/randomId';
import WidgetButtonList from '../WidgetList/WidgetList';
import DropZoneWrapper from '../ZoneWrapper/ZoneWrapper';

type DropZone = {
	isSave: boolean | "save"
	setSave: React.Dispatch<React.SetStateAction<boolean | "save">>
	images: SerializeFrom<Image[]>
	page: SerializeFrom<Page>, posts: SerializeFrom<PostWithTags[]>
}

const DropZone = ({ page, posts, images, }: DropZone) => {
	console.log("🚀 ~ DropZone ~ page:", page)
	const widgetsButtons: WidgetButton[] = [{ id: `${randomId()}`, type: "TextWidget" }, { id: `${randomId()}`, type: "CarouselPostWidget" }, { id: `${randomId()}`, type: "CarouselImageWidget" }];
	const dropZones: DropInstance[] = [{ id: `${randomId()}`, type: "MainPage", name: "Main page widget container " }]

	const content = JSON.parse(page.content && page.content !== "undefined" ? page.content : '[]') as [];
	const getWidgets: () => WidgetInstance[] = useCallback(() => {
		return content.map((item) =>
			typeof item === 'string' ? JSON.parse(item) : item as WidgetInstance);
	}, [content]);
	return (
		<div className="flex gap-4 justify-between pt-4">
			<WidgetButtonList widgetsArr={getWidgets()} buttons={widgetsButtons} dropZones={dropZones} />
			<div className="w-full  gap-2">
				{dropZones.map(zone => <DropZoneWrapper images={images} page={page} key={zone.id} posts={posts} dropZone={zone} widgetsData={getWidgets()} />)}
			</div>
		</div>
	)



}

export default DropZone