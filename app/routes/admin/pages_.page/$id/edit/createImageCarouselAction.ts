import { json } from '@remix-run/node'
import { validationError } from 'remix-validated-form'
import { imageCarouselFormValidator } from '~/components/ImageCarouselWidget/Form/Form'
import {
	connectImagesToImageCarousel,
	createImageCarousel,
} from '~/service/imageSlider.server'
import { updateElement } from '~/service/widget.server'

type createImageCarouselActionParams = {
	formData: FormData
}

export const createImageCarouselAction = async ({
	formData,
}: createImageCarouselActionParams) => {
	try {
		const validatedFormData = await imageCarouselFormValidator.validate(
			formData
		)
		console.log('🚀 ~ validatedFormData:', validatedFormData)
		if (validatedFormData.error) {
			return validationError({
				fieldErrors: { id: 'Not valid data ' },
			})
		}
		const { id, imagesIds, carouselId } = validatedFormData.data
		console.log('🚀 ~ imagesIds:', imagesIds)
		if (!imagesIds) throw new Error('Not found')
		let existCarouselId = carouselId
		if (!carouselId) {
			const postCarousel = await createImageCarousel()
			existCarouselId = postCarousel.id
		}
		await connectImagesToImageCarousel(
			JSON.parse(imagesIds) as number[],
			existCarouselId!
		)
		await updateElement({
			content: JSON.stringify({ carouselId: existCarouselId, imagesIds }),
			id,
			slug: 'main',
		})
		return json({ success: true })
	} catch (error) {
		console.log('🚀 ~ error:', error)
		throw new Response('Bad request')
	}
}
