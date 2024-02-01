import { prisma } from '~/utils/prisma.server'

export const createImage = async (path: string) => {
	try {
		const image = await prisma.image.create({
			data: { path },
		})
		return image
	} catch (error) {
		throw new Error('Error create image')
	}
}

export const getImage = async (id: number) => {
	try {
		const image = await prisma.image.findFirst({
			where: { id },
		})
		return image
	} catch (error) {
		throw new Error('Error get image')
	}
}
type getAllImagesParams = {
	page: number
	pageSize: number
}
export const getAllImages = async ({ page, pageSize }: getAllImagesParams) => {
	try {
		const images = await prisma.image.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
		})
		const totalImages = await prisma.image.count()
		return { images, totalPages: Math.ceil(totalImages / pageSize) }
	} catch (error) {
		throw new Error('Error get image')
	}
}

export const deleteImage = async ({ id }: { id: number }) => {
	try {
		const deletedImage = await prisma.image.delete({
			where: { id },
		})
		return deletedImage
	} catch (error) {
		throw new Error('Error delete image')
	}
}

export const updateImage = async ({
	id,
	data,
}: {
	id: number
	data: { link?: string }
}) => {
	try {
		const updateImage = await prisma.image.update({
			where: { id },
			data: data,
		})
		return updateImage
	} catch (error) {
		throw new Error('Error delete image')
	}
}
