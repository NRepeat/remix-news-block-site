import { Widget, WidgetType } from "~/types/types";
import Form from "./Form/Form";

const additionalData = {
	label: 'Post Carousel Widget',
	required: false,
	placeHolder: 'Post Carousel ',
	content: '',
};
const type: WidgetType = "CarouselImageWidget"
const CarouselImageWidget: Widget = {
	type,
	name: "image Carousel",
	construct: ({ id, containerId }) => ({
		id,
		containerId,
		type,
		additionalData
	}),
	button: { name: "Image Carousel" },
	widget: Form,
}

export default CarouselImageWidget