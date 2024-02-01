import { Post, Tag } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export type PostWithTags = {
	TagPost: {
		tag: Tag
	}[]
} & Post
type GetAllPostsParams = {
	page: number
	pageSize: number
}
export type GetAllPostsType = PostWithTags[]
type updatePostType = {
	title?: string
	article?: string
	description?: string
	thumbnail?: string
}
export const getAllPosts = async ({
	page,
	pageSize,
}: GetAllPostsParams): Promise<{
	posts: GetAllPostsType
	totalPages: number
}> => {
	try {
		const posts = await prisma.post.findMany({
			skip: (page - 1) * pageSize,
			take: pageSize,
			include: { TagPost: { select: { tag: true } } },
		})
		const totalPostsCount = await prisma.post.count()
		return { posts, totalPages: Math.ceil(totalPostsCount / pageSize) }
	} catch (error) {
		console.log('🚀 ~ getAllPosts ~ error:', error)
		throw new Error('Get post  error')
	}
}

export const getPostById = async (
	postId: number
): Promise<PostWithTags | null> => {
	try {
		const post = await prisma.post.findUnique({
			where: { id: postId },
			include: { TagPost: { select: { tag: true } } },
		})
		return post
	} catch (error) {
		throw new Error('Get post by ID error')
	}
}

export const getPostBySlug = async (postSlug: string) => {
	try {
		const post = await prisma.post.findUnique({
			where: { slug: postSlug },
		})
		return post
	} catch (error) {
		throw new Error('Get post by slug error')
	}
}

export const updatePost = async (
	postId: number,
	updatedData: updatePostType
) => {
	try {
		const updatedPost = await prisma.post.update({
			where: { id: postId },
			data: updatedData,
		})
		return updatedPost
	} catch (error) {
		console.log('🚀 ~ error:', error)
		throw new Error('Update post error')
	}
}

export const deletePost = async (postId: number) => {
	try {
		const deletedPost = await prisma.post.delete({
			where: { id: postId },
		})
		return deletedPost
	} catch (error) {
		throw new Error('Delete post error')
	}
}

export const createPost = async () => {
	try {
		const post = await prisma.post.create({
			data: {},
		})
		console.log('🚀 ~ createPost ~ post:', post)

		return post
	} catch (error) {
		console.log('🚀 ~ createPost ~ error:', error)
		throw new Error('Create post error')
	}
}

export const connectImageToPost = async (id: number, imageId: number) => {
	try {
		const post = await prisma.post.update({
			where: { id },
			data: {
				image: { connect: { id: imageId } },
			},
		})
		return post
	} catch (error) {
		throw new Error('Create post error')
	}
}

export const getLatestPosts = async ({
	quantity,
}: {
	quantity: number
}): Promise<Post[]> => {
	try {
		const posts = await prisma.post.findMany({
			take: quantity,
			orderBy: { createdAt: 'desc' },
		})

		return posts
	} catch (error) {
		throw new Error('Error find latest posts')
	}
}
type order = 'asc' | 'desc'

export const getPostsByRating = async ({
	quantity,
	order,
}: {
	quantity: number
	order: order
}) => {
	try {
		const posts = await prisma.post.findMany({
			take: quantity,
			orderBy: { rating: order },
		})

		return posts
	} catch (error) {
		console.log('🚀 ~ error:', error)
		throw new Error('Error find latest posts')
	}
}
