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

export const getAllImages = async () => {
	try {
		const images = await prisma.image.findMany()
		return images
	} catch (error) {
		throw new Error('Error get image')
	}
}
