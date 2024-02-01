import { Image } from "@prisma/client"
import { SerializeFrom } from "@remix-run/node"
import { useRouteLoaderData } from "@remix-run/react"
import { FC, useState } from "react"
import MediaForm from "~/components/DropzoneImage/DropzoneImage"
import usePagination from "~/hooks/usePagination"
import { loader as mediaRouteLoader } from "~/routes/admin/media/route"
import { loader as postRouteLoader } from "~/routes/admin/pages_.page/$id/edit/_index"
import { loader } from "~/routes/admin/posts_.post/$id.edit/route"
import ImageGrid from "./ImageGrid/ImageGrid"
import Navigation from "./Navigation/Navigation"
import SelectButton from "./SelectButton/SelectButton"
import SelectedImage from "./SelectedImage/SelectedImage"


type MediaLibraryType = {
	images?: SerializeFrom<Image[]>
	action: string
	setPostImageHandler?: (data: {
		id: number;
		postId: number;
	}) => void
	postId?: number
	setSelectImage?: React.Dispatch<React.SetStateAction<(number | undefined)[]>>
}
const MediaLibrary: FC<MediaLibraryType> = ({ postId, setSelectImage, images, action, setPostImageHandler }) => {
	const mediaRoutData = useRouteLoaderData<typeof mediaRouteLoader>("routes/admin/media/route");
	const postEditRoute = useRouteLoaderData<typeof loader>('routes/admin/posts_.post/$id.edit/route');
	const pageEditRoute = useRouteLoaderData<typeof postRouteLoader>('routes/admin/pages_.page/$id/edit/_index');

	const currentPage = pageEditRoute?.currentPage || mediaRoutData?.currentPage || postEditRoute?.currentPage || "0";
	const totalPages = pageEditRoute?.totalImagePages || mediaRoutData?.totalPages || postEditRoute?.totalPages || 0;

	const Pagination = usePagination({
		currentPage: parseInt(currentPage),
		totalPages,
	});

	const [selectedImage, setSelectedImage] = useState<number | null>(null)

	const [tabIsOpen, setOpenTab] = useState<boolean>(true)
	return (
		<div className="  inline-flex flex-col w-full gap-2  ">
			<Navigation setOpenTab={setOpenTab} tabIsOpen={tabIsOpen} />


			{tabIsOpen ?
				<>
					<SelectedImage images={images} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
					<div className="inline-flex items-center w-full justify-center">
						{setPostImageHandler && postId && <>
							{tabIsOpen && selectedImage && <SelectButton postId={postId} selectedImage={selectedImage} setPostImageHandler={setPostImageHandler} />}
						</>
						}
						{setSelectImage && <>
							{tabIsOpen && selectedImage && <SelectButton postId={postId} selectedImage={selectedImage} setSelectImage={setSelectImage} />}
						</>
						}
					</div>
					<div className="w-full min-w-[500px] max-h-screen overflow-y-auto p-4 ">
						<ImageGrid images={images} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
						<div className="w-full ">
							{Pagination}
						</div>
					</div>
				</>
				: <MediaForm action={action} type="postImage" label="" />}

		</div>
	)
}

export default MediaLibrary