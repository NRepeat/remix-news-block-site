import { Widget, WidgetType } from "~/types/types";
import Form from "./Form/Form";

const additionalData = {
	label: 'Text Block',
	required: false,
	placeHolder: 'Text',
	content: '',
};
const type: WidgetType = "TextWidget"
const textWidget: Widget = {
	name: "Text widget",
	type,
	construct: ({ id, containerId }) => ({
		id,
		containerId,
		type,
		additionalData
	}),
	button: { name: "Text" },
	widget: Form,
}

export default textWidget