import { Image } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';

const Table = ({ images }: {
	images: (SerializeFrom<Image> | undefined)[]
}) => {

	return <>
		{images && images.map(image => {
			const src = image?.path.includes('/') ? image.path : `/uploads/${image?.path}`;
			return <img key={image?.id} src={src} alt={image?.path} />
		})}
	</>
}
export default Table