import { prisma } from '~/utils/prisma.server'

export const createPage = async ({
	name,
	slug,
}: {
	name: string
	slug: string
}) => {
	try {
		await prisma.page.create({ data: { name, slug } })
	} catch (error) {
		throw new Error('Bad request')
	}
}

export const updatePage = async ({
	slug,
	jsonContent,
}: {
	slug: string
	jsonContent: string
}) => {
	try {
		return await prisma.page.update({
			where: { slug },
			data: {
				content: jsonContent,
			},
			select: { content: true, slug: true },
		})
	} catch (error) {
		throw new Error('bad request')
	}
}

export const getAllPages = async () => {
	try {
		const pages = await prisma.page.findMany()
		return pages
	} catch (error) {
		console.log('🚀 ~ getPageContent ~ error:', error)
		throw new Error('not found ')
	}
}

export const getPage = async ({ slug }: { slug: string }) => {
	try {
		const pageContent = await prisma.page.findUnique({
			where: { slug },
		})
		return pageContent
	} catch (error) {
		console.log('🚀 ~ getPageContent ~ error:', error)
		throw new Error('not found ')
	}
}

export const getPageContent = async ({ slug }: { slug: string }) => {
	try {
		const pageContent = await prisma.page.findUnique({
			where: { slug },
			select: { content: true },
		})
		return pageContent
	} catch (error) {
		console.log('🚀 ~ getPageContent ~ error:', error)
		throw new Error('not found ')
	}
}
export const updatePageContent = async ({
	slug,
	content,
	index,
}: {
	slug: string
	content: string
	index: number
}) => {
	try {
		const prevContent = await getPageContent({ slug })
		const parsedContent = JSON.parse(content)
		const newContent = []
		if (prevContent?.content === '' || prevContent?.content === 'undefined') {
			newContent.push(parsedContent)
		}
		if (prevContent?.content) {
			const parsedArray = JSON.parse(prevContent.content) as Array<[]>
			console.log('🚀 ~ parsedArray :', parsedArray)

			newContent.push(
				...parsedArray.map(item =>
					typeof item === 'string' ? JSON.parse(item) : item
				)
			)

			const existingIndex = newContent.findIndex(
				el => el.id === parsedContent.id
			)

			if (existingIndex !== -1) {
				newContent.splice(existingIndex, 1)
			}

			newContent.splice(index, 0, JSON.parse(content))
		}
		console.log('🚀 ~ newContent:', newContent)
		const pageContent = await prisma.page.update({
			where: { slug },
			data: { content: JSON.stringify(newContent) },
			select: { content: true },
		})

		return pageContent
	} catch (error) {
		console.log('🚀 ~ getPageContent ~ error:', error)
		throw new Error('Not found')
	}
}
