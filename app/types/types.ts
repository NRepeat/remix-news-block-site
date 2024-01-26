import { type UniqueIdentifier } from '@dnd-kit/core'
import { FC } from 'react'

export type WidgetType = 'TextWidget'
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
	}>
}
export type WidgetsType = {
	[key in WidgetType]: Widget
}
