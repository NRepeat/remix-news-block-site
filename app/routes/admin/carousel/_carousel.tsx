import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CustomCarousel, { Slide } from "~/components/Carousel/Carousel";
import { getPostCarouselById } from "~/service/postSlider.server";


export async function loader() {

	const carouselPosts = await getPostCarouselById(1)


	return json({ carouselPosts })
}





export default function CarouselRoute() {
	const { carouselPosts } = useLoaderData<typeof loader>()

	return (
		<div>
			{carouselPosts && <CustomCarousel>
				{carouselPosts.posts.map(post => (<Slide text={post.post.title} key={post.post.id} >
					<Post />
				</Slide>))}

			</CustomCarousel>}

		</div>
	);
}

const Post = () => {
	return <>Post</>
}