import { prisma } from '~/utils/prisma.server'

export const createText = async ({
	slug,
	title,
	order,
}: {
	slug: string
	title: string
	order?: number
}) => {
	try {
		const page = await prisma.page.findUnique({
			where: { slug },
		})

		if (!page) {
			throw new Error('Page not found')
		}

		const isOrderUnique = await prisma.text.findFirst({
			where: {
				order,
				pageId: page.id,
			},
		})

		if (isOrderUnique) {
			throw new Error('Order value is not unique for this page')
		}

		const newText = await prisma.text.create({
			data: {
				title,
				order,
				Page: {
					connect: { id: page.id },
				},
			},
		})

		return newText
	} catch (error) {
		throw new Error('Bad request')
	}
}
