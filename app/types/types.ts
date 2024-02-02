import { type UniqueIdentifier } from '@dnd-kit/core'
import { Image, Page } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { FC } from 'react'
import { PostWithTags } from '~/service/post.server'

export type WidgetType =
	| 'TextWidget'
	| 'CarouselPostWidget'
	| 'CarouselImageWidget'
	| 'Baner'
export type WidgetDataType = {
	text?: string
	title?: string
}
export type WidgetInstance = {
	id: string | UniqueIdentifier
	type: WidgetType
	containerId: UniqueIdentifier
	additionalData?: Record<string, string | number | boolean | string[]>
}
export type WidgetButton = {
	id: string | UniqueIdentifier
	type: WidgetType
}
export type DropInstance = {
	id: string | UniqueIdentifier
	type: string
	name: string
}
export type Widget = {
	name: string
	type: string
	construct: ({
		id,
		containerId,
	}: {
		id: string
		containerId: string | UniqueIdentifier
	}) => WidgetInstance
	button: {
		name: string
	}
	widget: FC<{
		widget: WidgetInstance
		posts?: SerializeFrom<PostWithTags[]>
		images?: SerializeFrom<Image[]>
		page?: SerializeFrom<Page>
	}>
}
export type WidgetsType = {
	[key in WidgetType]: Widget
}
