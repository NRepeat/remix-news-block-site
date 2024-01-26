import { Widget } from "~/types/types"
import Form from "./Form/Form"

const textWidget: Widget = {
	type: "TextWidget",
	name: "Text widget",
	button: { name: "Text" },
	form: Form,
}

export default textWidget