import { Image } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { useRouteLoaderData } from "@remix-run/react"
import { FC, useState } from "react"
import MediaForm from "~/components/DropzoneImage/DropzoneImage"
import usePagination from "~/hooks/usePagination"
import { loader as mediaRouteLoader } from "~/routes/admin/media/route"
import { loader } from "~/routes/admin/posts_.post/$id.edit/route"
import ImageGrid from "./ImageGrid/ImageGrid"
import Navigation from "./Navigation/Navigation"
import SelectButton from "./SelectButton/SelectButton"
import SelectedImage from "./SelectedImage/SelectedImage"


type MediaLibraryType = {
	images: SerializeFrom<Image[]>
	action: string
	setHandler?: (data: {
		id: number;
		postId: number;
	}) => void
	postId?: number
}
const MediaLibrary: FC<MediaLibraryType> = ({ postId, images, action, setHandler }) => {
	const mediaRoutData = useRouteLoaderData<typeof mediaRouteLoader>("routes/admin/media/route")
	const postEditRoute = useRouteLoaderData<typeof loader>('routes/admin/posts_.post/$id.edit/route')
	const routeData = mediaRoutData ?? postEditRoute
	if (!routeData) throw new Error("Not found")
	const Pagination = usePagination({
		currentPage: parseInt(routeData.currentPage),
		totalPages: routeData.totalPages

	})

	const [selectedImage, setSelectedImage] = useState<number>()

	const [tabIsOpen, setOpenTab] = useState<boolean>(true)
	return (
		<div className=" p-4 flex flex-col gap-2 w-full ">
			<Navigation setOpenTab={setOpenTab} tabIsOpen={tabIsOpen} />
			{tabIsOpen && <div className="w-full inline-flex justify-between">
				{/* <FormInput type="text" name="" /> */}
				<select name="" id=""></select>
				search
			</div>}
			{tabIsOpen ?
				<>
					<SelectedImage images={images} selectedImage={selectedImage} />
					<div className="w-full ">
						<ImageGrid images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
						<div className="w-full ">
							{Pagination}
						</div>
					</div>
				</>
				: <MediaForm action={action} type="postImage" label="" />}
			<div className="inline-flex items-center w-full justify-center">
				{setHandler && postId && <>
					{tabIsOpen && <SelectButton postId={postId} selectedImage={selectedImage} setHandler={setHandler} />}
				</>
				}
			</div>
		</div>
	)
}

export default MediaLibrary