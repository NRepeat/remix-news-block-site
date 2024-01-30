import { Image } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { FC } from 'react'


type SelectedImageType = {
	selectedImage: number | undefined
	images: SerializeFrom<Image[]>
}
const SelectedImage: FC<SelectedImageType> = ({ images, selectedImage }) => {
	return (
		<div className="max-h-[400px] pb-4 border-b-2 ">
			{selectedImage &&
				images.map((image) =>
					image.id === selectedImage ? (
						<img
							className="object-cover w-full h-full"
							key={image.id}
							src={image.path.includes("/") ? image.path : `/uploads/${image.path}`}
							alt={image.path}
						/>
					) : null
				)}
		</div>
	)
}

export default SelectedImage