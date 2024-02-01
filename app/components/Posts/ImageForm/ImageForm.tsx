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
	return <div className=" flex w-full ">

		<div aria-hidden className='  max-w-[100%] relative h-[250px] overflow-hidden border-4 border-gray-500 rounded-md border-dotted flex flex-col items-center justify-center' onClick={() => setIsOpen(true)}>
			<CustomDropzone image={image} action={`/admin/posts/post/${id}/create/upload`} />
		</div>
		{open && <Modal setIsOpen={setIsOpen} head="Select or Upload Media">
			<MediaLibrary setPostImageHandler={setImageHandler} postId={id} action={`/admin/posts/post/${id}/create/upload`} images={images} />
		</Modal>}
	</div>



}

export default ImageForm