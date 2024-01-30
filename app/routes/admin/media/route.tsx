import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import MediaLibrary from "~/components/Media/MediaLibrary/MediaLibrary";
import { getAllImages } from "~/service/image.server";


export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const url = new URL(request.url)
		const page = url.searchParams.get("page") ?? "1"
		const { images, totalPages } = await getAllImages({
			page: parseInt(page),
			pageSize: 5
		})

		return json({ images, totalPages, currentPage: page })

	} catch (error) {
		throw new Error("Bad response")
	}
}

export default function MediaRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<>
			<MediaLibrary action="/admin/media/upload" images={data.images} />

		</>
	);
}