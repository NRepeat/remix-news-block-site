import { json } from '@remix-run/node'
import { validationError } from 'remix-validated-form'
import { banerValidator } from '~/components/BanerWidget/Form/Form'
import { imageLinkValidator } from '~/components/ImageCarouselWidget/Wrapper/Wrapper'
import {
	createBaner,
	deleteBanerImage,
	updateBaner,
	updateBanerLink,
} from '~/service/baner.server'
import { updateElement } from '~/service/widget.server'

export const banerActions = async (formData: FormData) => {
	try {
		if (formData.has('link')) {
			const validatedData = await imageLinkValidator.validate(formData)
			if (validatedData.error) {
				return validationError({
					fieldErrors: { id: 'Not valid data' },
				})
			}
			const { id, link, banerId } = validatedData.data
			await updateBanerLink(id, banerId!, link!)

			return json({ success: true })
		}

		const validatedData = await banerValidator.validate(formData)
		if (validatedData.error) {
			return validationError({
				fieldErrors: { id: 'Not valid data' },
			})
		}
		const { imageId, banerId, id } = validatedData.data
		if (!banerId) {
			const baner = await createBaner({ imageId })
			await updateElement({
				content: JSON.stringify({ banerId: baner.id, imageId }),
				id,
				slug: 'main',
			})
			return json({ success: true })
		}
		if (imageId === 0) {
			await deleteBanerImage({ id: parseInt(id), imageId })
			await updateElement({
				content: JSON.stringify({ banerId }),
				id,
				slug: 'main',
			})

			return json({ success: true })
		}
		const baner = await updateBaner({ id: banerId, data: { imageId } })
		await updateElement({
			content: JSON.stringify({ banerId: baner.id, imageId }),
			id,
			slug: 'main',
		})
		return json({ success: true })
	} catch (error) {
		console.log('🚀 ~ banerActions ~ error:', error)
		throw new Response('Bad request')
	}
}
