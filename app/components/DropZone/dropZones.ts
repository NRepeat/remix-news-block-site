import { Page } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { DropInstance } from '~/types/types'

export const getDropZones = (page: SerializeFrom<Page>) => {
	if (page.slug === 'main') {
		const dropZones: DropInstance[] = [
			{
				id: `1`,
				type: 'MainPage',
				name: 'Main page widget container ',
			},
		]
		return dropZones
	}
	if (page.slug === 'tags') {
		const dropZones: DropInstance[] = [
			{
				id: `2`,
				type: 'TagsPageTopBanerContainer',
				name: 'Top baner container ',
			},
			{
				id: `8`,
				type: 'TagsPageMixinControl',
				name: 'Tags Page mixin control',
			},
			{
				id: `3`,
				type: 'TagsPage',
				name: 'Bottom baner container ',
			},
		]
		return dropZones
	}
	if (page.slug === 'search') {
		const dropZones: DropInstance[] = [
			{
				id: `4`,
				type: 'TagsPage',
				name: 'Top baner container ',
			},
			{
				id: `5`,
				type: 'TagsPage',
				name: 'Bottom baner container ',
			},
		]
		return dropZones
	}
	if (page.slug === 'post') {
		const dropZones: DropInstance[] = [
			{
				id: `6`,
				type: 'TagsPage',
				name: 'Top baner container ',
			},
			{
				id: `7`,
				type: 'TagsPage',
				name: 'Bottom baner container ',
			},
		]
		return dropZones
	}
}
