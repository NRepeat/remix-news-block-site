
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import Pagination from "~/components/Pagination/Pagination";
import CreateButton from "~/components/Posts/Buttons/CreateButton";
import PostTable from "~/components/Posts/Table/Table";
import { getAllPosts } from "~/service/post.server";
export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const url = new URL(request.url)
		const page = url.searchParams.get("page") ?? "1"
		const { totalPages, posts } = await getAllPosts({
			page: parseInt(page), pageSize: 10
		})

		return json({ posts, totalPages, currentPage: page })
	} catch (error) {
		throw new Error("Not found")
	}
}


export default function PostsRoute() {
	const data = useLoaderData<typeof loader>()
	const submit = useSubmit()
	const HandlePageChange = (page: number) => {
		submit({ page })
	}
	return (
		<div style={{ gridArea: "main" }} className="p-4 bg-slate-100 ">
			<div className="inline-flex gap-4 items-center pb-4">
				<p className="text-2xl text-pretty">Posts  	</p><CreateButton />
			</div>

			<PostTable posts={data.posts} />
			<Pagination currentPage={parseInt(data.currentPage)} totalPages={data.
				totalPages} onPageChange={HandlePageChange} />
		</div>
	);
}

