
import { redirect } from "@remix-run/node";
import { createPost } from "~/service/post.server";


export async function action() {
	try {
		const createdPost = await createPost()
		return redirect(`/posts/post/${createdPost.id}/edit`)
	} catch (error) {
		console.log("🚀 ~ loader ~ error:", error)
		throw new Error("")
	}
}

// export async function loader({ request, params }: LoaderFunctionArgs) {
// 	try {
// 		// if (postId) {
// 		// 	const createdPost = await getPostById(parseInt(postId))
// 		// 	return json({ createdPost })
// 		// }
// 		return {}
// 	} catch (error) {
// 		console.log("🚀 ~ loader ~ error:", error)
// 		throw new Error("")
// 	}
// }


