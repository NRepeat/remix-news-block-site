import { type UniqueIdentifier } from '@dnd-kit/core'
import { SerializeFrom } from '@remix-run/node'
import { FC } from 'react'
import { PostWithTags } from '~/service/post.server'

export type WidgetType = 'TextWidget' | 'CarouselPostWidget'
export type WidgetDataType = {
	text?: string
	title?: string
}
export type WidgetInstance = {
	id: string | UniqueIdentifier
	type: WidgetType
	containerId: string | UniqueIdentifier
	data?: WidgetDataType
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
	type: WidgetType
	button: {
		name: string
	}
	form: FC<{
		widget: WidgetInstance
		posts?: SerializeFrom<PostWithTags[]>
	}>
}
export type WidgetsType = {
	[key in WidgetType]: Widget
}
