import { Image } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { useSubmit } from "@remix-run/react"
import { FC, useState } from "react"
type MediaLibraryType = {
	images: SerializeFrom<Image[]>
	action: string
}
const MediaLibrary: FC<MediaLibraryType> = ({ images, action }) => {
	const submit = useSubmit()
	const [selectedImage, setSelectedImage] = useState<number>()
	const handleSubmit = (id: number) => {
		submit({ imageId: id, type: 'media' }, { action, method: "post", navigate: false })
	}
	return (
		<div>
			{/* <FormInput type="text" name="" /> */}
			<select name="" id=""></select>
			<div>
				{selectedImage &&
					images.map((image) =>
						image.id === selectedImage ? (
							<img
								key={image.id}
								src={image.path.includes("/") ? image.path : `/uploads/${image.path}`}
								alt={image.path}
							/>
						) : null
					)}
			</div>
			{images && <div className="flex gap-2  flex-wrap">
				{images.map(image => {

					if (image.path.includes("/")) {
						return (<img aria-hidden onClick={() => setSelectedImage(image.id)} className="max-w-36 object-cover  min-h-36" key={image.id} src={image.path} alt={image.path} />)
					}

					return (<img aria-hidden onClick={() => setSelectedImage(image.id)} className="max-w-36 object-cover max-h-36" key={image.id} src={`/uploads/${image.path}`} alt={image.path} />)
				})}
			</div>}

			<button disabled={selectedImage ? false : true} onClick={() => handleSubmit(selectedImage ? selectedImage : 0)}> select</button>
		</div>
	)
}

export default MediaLibrary