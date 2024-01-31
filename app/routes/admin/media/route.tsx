import type { ActionFunctionArgs } from "@remix-run/node";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import MediaLibrary from "~/components/Media/MediaLibrary/MediaLibrary";
import { deleteImage, getAllImages } from "~/service/image.server";


export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const url = new URL(request.url)
		const page = url.searchParams.get("page") ?? "1"
		const { images, totalPages } = await getAllImages({
			page: parseInt(page),
			pageSize: 10
		})

		return json({ images, totalPages, currentPage: page })

	} catch (error) {
		throw new Error("Bad response")
	}
}

export async function action({ request }: ActionFunctionArgs) {
	try {
		const formData = await request.formData()
		const imageIdToDelete = formData.get("imageIdToDelete") as string
		if (imageIdToDelete) {
			await deleteImage({ id: parseInt(imageIdToDelete) })
		}
		return redirect('/admin/media')

	} catch (error) {
		throw new Error("Bad response")
	}
}

export default function MediaRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="flex flex-col p-4">
			<div className="inline-flex gap-4 items-center pb-4">
				<p className="text-2xl text-pretty">Media	</p>
			</div>
			<MediaLibrary action="/admin/media/upload" images={data.images} />

		</div>
	);
}