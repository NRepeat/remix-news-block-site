export const connectImagesToImageCarousel = async (
	imageId: number[],
	carouselId: number
) => {
	try {
		const images = await prisma.image.findMany({
			where: { id: { in: imageId } },
		})

		const imageCarousel = await prisma.imageCarousel.findUnique({
			where: { id: carouselId },
		})

		if (!images || images.length !== imageId.length || !imageCarousel) {
			throw new Error('One or more posts or the post carousel were not found.')
		}

		const imageCarouselPosts = imageId.map(id => ({
			imageId: id,
			imageCarouselId: carouselId,
		}))

		await prisma.imageCarouselImage.createMany({
			data: imageCarouselPosts,
		})

		return 'Successfully connected post to post carousel'
	} catch (error) {
		console.log('🚀 ~ connectPostToPostCarousel ~ error:', error)
		throw new Error('Error to connect post to post carousel ')
	}
}

export const createImageCarousel = async () => {
	try {
		const createdImageCarousel = await prisma.imageCarousel.create({
			data: {},
		})
		return createdImageCarousel
	} catch (error) {
		console.error('Create post slider error:', error)
		throw new Error('Create post slider error')
	}
}
