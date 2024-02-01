import { Image } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { FC } from 'react'
import { IoClose } from 'react-icons/io5'


type SelectedImageType = {
	selectedImage: number | null
	images?: SerializeFrom<Image[]>
	setSelectedImage: React.Dispatch<React.SetStateAction<number | null>>
}
const SelectedImage: FC<SelectedImageType> = ({ images, selectedImage, setSelectedImage }) => {
	return (
		<div className="max-h-[300px]  pb-4 border-b-2  relative">
			{selectedImage &&
				<button className=' absolute top-0 right-0' onClick={() => setSelectedImage(null)}>
					<IoClose className='fill-red-500 h-8 w-8' />
				</button>
			}

			{selectedImage &&
				images?.map((image) =>
					image.id === selectedImage ? (
						<img
							className="object-cover w-full max-h-[300px]"
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