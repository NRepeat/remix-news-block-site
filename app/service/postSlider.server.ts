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
	postId: number,
	carouselId: number
) => {
	try {
		const post = await prisma.post.findUnique({ where: { id: postId } })
		console.log('🚀 ~ post:', post)
		const postCarousel = await prisma.postCarousel.findUnique({
			where: { id: carouselId },
		})

		if (!post || !postCarousel) {
			throw new Error('Post or post carousel not found')
		}

		await prisma.postCarouselPost.create({
			data: {
				postId: postId,
				postCarouselId: carouselId,
			},
		})

		return 'Successfully connected post to post carousel'
	} catch (error) {
		console.log('🚀 ~ connectPostToPostCarousel ~ error:', error)
		throw new Error('Error to connect post to post carousel ')
	}
}

// Get all postCarousels
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

// Delete a postCarousel by ID
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
