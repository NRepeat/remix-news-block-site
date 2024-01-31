import { Image } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { useSubmit } from '@remix-run/react'
import { useState } from 'react'
import CustomDropzone from '~/components/DropzoneImage/Dropzone/Dropzone'
import MediaLibrary from '~/components/Media/MediaLibrary/MediaLibrary'
import Modal from '~/components/Modal/Modal'

type ImageFormParams = {
	id: number, images: SerializeFrom<Image[]>
	image: SerializeFrom<Image | null>
}
const ImageForm = ({ id, images, image }: ImageFormParams) => {
	const [open, setIsOpen] = useState<boolean>(false)
	const submit = useSubmit()
	const setImageHandler = (data: { id: number, postId: number }) => {

		submit({ imageId: data.id, type: "media" }, { method: 'post', action: `/admin/posts/post/${data.postId}/edit`, navigate: false, preventScrollReset: true })
	}
	return <div className="w-full flex pr-4  justify-end min-w-[300px]">

		<div aria-hidden className='w-[250px]  relative h-[250px] overflow-hidden border-4 border-gray-500 rounded-md border-dotted flex flex-col items-center justify-center' onClick={() => setIsOpen(true)}>
			<CustomDropzone image={image} action={`/admin/posts/post/${id}/create/upload`} />
		</div>
		{open && <Modal setIsOpen={setIsOpen} head="Select or Upload Media">
			<div className='min-w-min p-4'>	<MediaLibrary setHandler={setImageHandler} postId={id} action={`/admin/posts/post/${id}/create/upload`} images={images} />
			</div>
		</Modal>}
	</div>



}

export default ImageForm