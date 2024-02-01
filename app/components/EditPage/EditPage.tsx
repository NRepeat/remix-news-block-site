import { Image, Page } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { useState } from 'react'
import { PostWithTags } from '~/service/post.server'
import DropZone from '../DropZone/DropZone'

type EditPageType = {
	images: SerializeFrom<Image[]>
	page: SerializeFrom<Page>, posts: SerializeFrom<PostWithTags[]>
}

const EditPage = ({ images, page, posts }: EditPageType) => {
	const [isSave, setSave] = useState<boolean | 'save'>(false)
	return (
		<div style={{ gridArea: "main" }} className="flex flex-col relative bg-gray-100  p-4">
			<p className="text-2xl pb-4 border-b-2 text-pretty">Edit page 	</p>
			<button disabled={isSave ? false : true} className={`${!isSave ? 'bg-slate-400 text-slate-300' : "bg-green-500"}`} onClick={() => setSave("save")}>Save</button>
			<DropZone page={page} isSave={isSave} setSave={setSave} posts={posts} images={images} />
		</div>
	)
}

export default EditPage