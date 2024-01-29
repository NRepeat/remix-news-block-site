
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CreateButton from "~/components/Posts/Buttons/CreateButton";
import PostTable from "~/components/Posts/Table/Table";
import { getAllPosts } from "~/service/post.server";
export async function loader() {
	try {
		const posts = await getAllPosts()
		return json({ posts })
	} catch (error) {
		throw new Error("Not found")
	}
}


export default function PostsRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<>
			<CreateButton />
			<PostTable posts={data.posts} />

		</>
	);
}