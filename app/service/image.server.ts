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
