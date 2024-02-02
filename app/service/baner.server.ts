import { Baner } from '@prisma/client'
import { getImage } from './image.server'

export const updateBaner = async ({
	id,
	data,
}: {
	id?: number
	data: { link?: string; imageId: number }
}) => {
	console.log('🚀 ~ imageId:', data)
	try {
		let baner: Baner | null
		baner = await prisma.baner.findFirst({
			where: { id },
		})
		if (!baner) {
			baner = await createBaner({})
		}

		const updatedBaner = await prisma.baner.update({
			where: { id: baner.id },
			data: data,
		})
		return updatedBaner
	} catch (error) {
		console.log('🚀 ~ error:', error)
		throw new Error('Error delete image')
	}
}
export const createBaner = async ({ imageId }: { imageId?: number }) => {
	try {
		if (imageId) {
			const image = await getImage(imageId)
			if (!image) throw new Error('Image not found')
			const baner = prisma.baner.create({
				data: { imageId },
			})
			return baner
		}
		const baner = prisma.baner.create({
			data: {},
		})

		return baner
	} catch (error) {
		throw new Error('Error create baner')
	}
}

export const deleteBanerImage = async ({
	imageId,
	id,
}: {
	imageId?: number
	id: number
}) => {
	try {
		if (imageId) {
			const baner = prisma.baner.update({
				where: { id },
				data: {
					image: {
						disconnect: {
							id: imageId,
						},
					},
				},
			})
			return baner
		}
	} catch (error) {
		throw new Error('Error create baner')
	}
}

export const updateBanerLink = async (
	id: number,
	imageId: number,
	link: string
) => {
	console.log('🚀 ~ id:', id)
	try {
		const baner = await prisma.baner.update({
			where: { id },
			data: { link },
		})
		console.log('🚀 ~ baner:', baner)
		return baner
	} catch (error) {
		console.log('🚀 ~ error:', error)
		throw new Error('Error create baner')
	}
}
