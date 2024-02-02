import { json } from '@remix-run/node'
import { validationError } from 'remix-validated-form'
import { postCarouselFormValidator } from '~/components/CarouselPostWidget/Form/Form'
import { getLatestPosts, getPostsByRating } from '~/service/post.server'
import {
	connectPostToPostCarousel,
	createPostCarousel,
} from '~/service/postSlider.server'
import { updateElement } from '~/service/widget.server'

export const postActions = async (formData: FormData) => {
	try {
		const postsData = formData.get('posts') as string

		if (postsData) {
			const validatedData = await postCarouselFormValidator.validate(formData)
			if (validatedData.error) {
				return validationError({
					fieldErrors: { id: 'Not valid data' },
				})
			}
			const { id, type, posts, quantity, order, carouselId } =
				validatedData.data

			let existCarouselId = carouselId
			if (!carouselId) {
				const postCarousel = await createPostCarousel()
				existCarouselId = postCarousel.id
			}

			if (posts && type === 'manual') {
				await connectPostToPostCarousel(
					JSON.parse(posts) as number[],
					existCarouselId!
				)
				await updateElement({
					content: JSON.stringify({
						carouselId: existCarouselId,
						postsIds: posts,
						type,
					}),
					id,
					slug: 'main',
				})
				return json({ success: true })
			}
			if (type === 'latest') {
				const latestPost = await getLatestPosts({
					quantity: quantity ? quantity : 10,
				})
				const postsIds = latestPost.map(post => post.id)
				await connectPostToPostCarousel(postsIds, existCarouselId!)
				await updateElement({
					content: JSON.stringify({ postsIds, type, existCarouselId }),
					id,
					slug: 'main',
				})
				return json({ success: true })
			}
			if (type === 'popular') {
				const latestPost = await getPostsByRating({
					quantity: quantity ? quantity : 10,
					order: order === 'asc' ? order : 'desc',
				})
				const postsIds = latestPost.map(post => post.id)
				await connectPostToPostCarousel(postsIds, existCarouselId!)
				await updateElement({
					content: JSON.stringify({ postsIds, type, existCarouselId }),
					id,
					slug: 'main',
				})
				return json({ success: true })
			}
		}
	} catch (error) {
		console.log('🚀 ~ banerActions ~ error:', error)
		throw new Response('Bad request')
	}
}
