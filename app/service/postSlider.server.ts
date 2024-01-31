import { PostCarousel } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

type createPostCarouselDataType = Omit<PostCarousel>

export const createPostCarousel = async () => {
	try {
		const createdPostCarousel = await prisma.postCarousel.create({
			data: {},
		})
		return createdPostCarousel
	} catch (error) {
		console.error('Create post slider error:', error)
		throw new Error('Create post slider error')
	}
}

export const connectPostToPostCarousel = async (
	postId: number[],
	carouselId: number
) => {
	try {
		const posts = await prisma.post.findMany({
			where: { id: { in: postId } },
		})

		const postCarousel = await prisma.postCarousel.findUnique({
			where: { id: carouselId },
		})

		if (!posts || posts.length !== postId.length || !postCarousel) {
			throw new Error('One or more posts or the post carousel were not found.')
		}

		const postCarouselPosts = postId.map(id => ({
			postId: id,
			postCarouselId: carouselId,
		}))

		await prisma.postCarouselPost.createMany({
			data: postCarouselPosts,
		})

		return 'Successfully connected post to post carousel'
	} catch (error) {
		console.log('🚀 ~ connectPostToPostCarousel ~ error:', error)
		throw new Error('Error to connect post to post carousel ')
	}
}

export const getAllPostCarousels = async () => {
	try {
		const allPostCarousels = await prisma.postCarousel.findMany()
		return allPostCarousels
	} catch (error) {
		console.error('Get all post sliders error:', error)
		throw new Error('Get all post sliders error')
	}
}

export const getPostCarouselById = async (sliderId: number) => {
	try {
		const postCarousel = await prisma.postCarousel.findUnique({
			where: { id: sliderId },
			select: {
				posts: {
					select: {
						post: {
							select: {
								id: true,
								article: true,
								image: true,
								description: true,
								rating: true,
								order: true,
								slug: true,
								thumbnail: true,
								title: true,
							},
						},
					},
				},
			},
		})
		return postCarousel
	} catch (error) {
		console.error('Get post slider by ID error:', error)
		throw new Error('Get post slider by ID error')
	}
}

export const updatePostCarousel = async (
	sliderId: number,
	updatedSliderData
) => {
	try {
		const updatedPostCarousel = await prisma.postCarousel.update({
			where: { id: sliderId },
			data: updatedSliderData,
		})
		return updatedPostCarousel
	} catch (error) {
		console.error('Update post slider error:', error)
		throw new Error('Update post slider error')
	}
}

export const deletePostCarousel = async (sliderId: number) => {
	try {
		const deletedPostCarousel = await prisma.postCarousel.delete({
			where: { id: sliderId },
		})
		return deletedPostCarousel
	} catch (error) {
		console.error('Delete post slider error:', error)
		throw new Error('Delete post slider error')
	}
}
