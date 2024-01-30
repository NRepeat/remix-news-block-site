import { Tag } from '@prisma/client'

export const createTags = async ({ tags }: { tags: string[] }) => {
	try {
		// Use Prisma's createMany to insert multiple records at once
		const createdTags = await prisma.tag.createMany({
			data: tags.map(tag => ({ name: tag, slug: tag })),
			skipDuplicates: true,
		})

		return createdTags
	} catch (error) {
		console.log('Error creating tags:', error)
		throw new Error('Failed to create tags')
	}
}

export const searchTags = async ({ search }: { search: string }) => {
	try {
		const tags = await prisma.tag.findFirst({
			where: { slug: search },
		})
		return tags
	} catch (error) {
		throw new Error('Failed to search tags')
	}
}
export const updateTags = async (params: type) => {
	try {
	} catch (error) {
		console.error('Error updating tags:', error)
		throw new Error('Failed to update tags')
	}
}

export const getAllTags = async () => {
	try {
		const tags = await prisma.tag.findMany()
		return tags
	} catch (error) {
		console.error('Error getting tags:', error)
		throw new Error('Failed to get tags')
	}
}
export const deleteTag = async (id: number) => {
	console.log('🚀 ~ deleteTag ~ id:', id)
	try {
		const deletedTag = prisma.tag.delete({
			where: { id },
		})
		return deletedTag
	} catch (error) {
		throw new Error('Failed to delete tags')
	}
}
export const getPostTags = async (params: type) => {
	try {
		const tags = await prisma.tag.findMany({
			where: {},
		})
	} catch (error) {
		console.error('Error getting post tags:', error)
		throw new Error('Failed to get post tags')
	}
}

export const connectTagsToPost = async ({
	postId,
	tags,
}: {
	postId: number
	tags: Tag[]
}) => {
	try {
		const post = await prisma.post.findUnique({ where: { id: postId } })

		if (!post) {
			throw new Error(`Post with id ${postId} not found.`)
		}

		const connectTags = await prisma.tag.findMany({
			where: { id: { in: tags.map(tag => tag.id) } },
		})

		if (tags.length !== connectTags.length) {
			throw new Error('Not all tags were found.')
		}

		await prisma.tagPost.createMany({
			data: connectTags.map(tag => ({
				postId,
				tagId: tag.id,
			})),
			skipDuplicates: true,
		})
	} catch (error) {
		console.error('Error connecting tags to post:', error)
		throw new Error('Failed to connect tags to post')
	}
}
