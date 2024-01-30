import { Image } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import React, { FC } from 'react'

type ImageGridType = {
	selectedImage: number | undefined
	images: SerializeFrom<Image[]>
	setSelectedImage: React.Dispatch<React.SetStateAction<number | undefined>>
}

const ImageGrid: FC<ImageGridType> = ({ images, selectedImage, setSelectedImage }) => {
	return (
		<div>					{images && (
			<div className="flex gap-4 flex-wrap">
				{images.map((image) => {
					const imagePath = image.path.includes('/') ? image.path : `/uploads/${image.path}`;
					const isSelected = selectedImage === image.id;

					return (
						<img
							key={image.id}
							aria-hidden
							onClick={() => setSelectedImage(image.id)}
							className={`${isSelected ? 'border-sky-500' : ''} rounded-sm max-w-36 border-2 border-white object-cover max-h-36`}
							src={imagePath}
							alt={image.path}
						/>
					);
				})}
			</div>
		)}</div>
	)
}

export default ImageGrid