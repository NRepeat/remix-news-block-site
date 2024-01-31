import { Widget, WidgetType } from "~/types/types";
import Form from "./Form/Form";

const additionalData = {
	label: 'Post Carousel Widget',
	required: false,
	placeHolder: 'Post Carousel ',
	content: '',
};
const type: WidgetType = "CarouselPostWidget"
const carouselPostWidget: Widget = {
	type,
	name: "Post Carousel",
	construct: ({ id, containerId }) => ({
		id,
		containerId,
		type,
		additionalData
	}),
	button: { name: "Post Carousel" },
	widget: Form,
}

export default carouselPostWidget