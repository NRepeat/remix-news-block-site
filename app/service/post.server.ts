import { Post, Tag } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

type createPostType = {
	data: { slug: string; title: string; content: string; page: string }
}
export type PostWithTags = {
	TagPost: {
		tag: Tag
	}[]
} & Post
export type GetAllPostsType = PostWithTags[]
type updatePostType = {
	title?: string
	article?: string
	description?: string
	image?: string
	thumbnail?: string
}
export const getAllPosts = async (): Promise<GetAllPostsType> => {
	try {
		const posts = await prisma.post.findMany()
		return posts
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
