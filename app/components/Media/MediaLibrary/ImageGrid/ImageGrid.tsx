import { Image } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { useSubmit } from '@remix-run/react'
import React, { FC } from 'react'
import { MdDelete } from 'react-icons/md'

type ImageGridType = {
	selectedImage: number | null
	images?: SerializeFrom<Image[]>
	setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>
}

const ImageGrid: FC<ImageGridType> = ({ images, selectedImage, setSelectedImage }) => {

	const isSelected = (id: number) => selectedImage === id;
	const submit = useSubmit()
	const handleDeleteImage = () => {
		if (selectedImage) {
			submit({ imageIdToDelete: selectedImage }, { method: 'delete', navigate: false, action: "/admin/media" })
			setSelectedImage(null)
		}
	}
	return (
		<div>
			{images && (
				<div className="flex gap-4 flex-wrap">
					{images.map((image) => {
						const imagePath = image.path.includes('/') ? image.path : `/uploads/${image.path}`;
						return (
							<div key={image.id} className='relative '>
								{selectedImage === image.id &&
									<button className='absolute top-1 right-0' onClick={() => handleDeleteImage()}><MdDelete className='fill-red-500 h-[30px] w-[30px] ' />
									</button>
								}
								<img
									aria-hidden
									onClick={() => setSelectedImage(image.id)}
									className={`${isSelected(image.id) ? 'border-sky-600' : 'border-white'} rounded-sm min-w-36 max-w-36 border-2   object-cover max-h-36 min-h-36`}
									src={imagePath}
									alt={image.path}
								/>
							</div>

						);
					})}
				</div>
			)}</div>
	)
}

export default ImageGrid