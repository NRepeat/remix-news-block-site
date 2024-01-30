import { Image } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { useSubmit } from '@remix-run/react'
import { useState } from 'react'
import MediaForm from '~/components/DropzoneImage/DropzoneImage'
import MediaLibrary from '~/components/Media/MediaLibrary/MediaLibrary'
import Modal from '~/components/Modal/Modal'

type ImageFormParams = {
	id: number, images: SerializeFrom<Image[]>
}
const ImageForm = ({ id, images, }: ImageFormParams) => {
	const [open, setIsOpen] = useState<boolean>(false)
	const submit = useSubmit()
	const setImageHandler = (data: { id: number, postId: number }) => {

		submit({ imageId: data.id, type: "media" }, { method: 'post', action: `/admin/posts/post/${data.postId}/edit` })
	}
	return <div className="w-full flex pr-4  justify-end min-w-[300px]">
		<div className="flex flex-col w-full gap-1 ">
			<div>
				<p className="text-xl border-b-2 border-slate-300">Upload image</p>
				<p className="pt-2">Upload an image file, pick one from your media library, or add one with a URL.</p>
			</div>
			<MediaForm label="" type="postImage" action={`/admin/posts/post/${id}/create/upload`} />
			<button className="border-2 border-sky-500 pt-1 pb-1 hover:bg-sky-100" onClick={() => setIsOpen(true)}> Media library</button>
			{open && <Modal setIsOpen={setIsOpen} head="Select or Upload Media">
				<MediaLibrary setHandler={setImageHandler} postId={id} action={`/admin/posts/post/${id}/create/upload`} images={images} />
			</Modal>}
		</div>



	</div>
}

export default ImageForm