
import { json } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import Form from "~/components/Posts/Form/Form";
import { createPost } from "~/service/post.server";


export async function loader() {
	try {
		const createdPost = await createPost()
		return json({ createdPost })
	} catch (error) {
		throw new Error("")
	}
}
let cache;
export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
	try {
		if (cache) {
			return json({ createdPost: cache })

		}
		const createdPost = await createPost()
		return json({ createdPost })
	} catch (error) {
		throw new Error("")
	}
}

export default function PostsRoute() {
	const { createdPost } = useLoaderData<typeof loader>()
	return (
		<>

			<Form createdPost={createdPost} />
		</>
	);
}