import { Widget } from "~/types/types"
import Form from "./Form/Form"

const carouselPostWidget: Widget = {
	type: "CarouselPostWidget",
	name: "Post Carousel",
	button: { name: "Post Carousel" },
	form: Form,
}

export default carouselPostWidget