import { useDndMonitor } from "@dnd-kit/core"
import { useSubmit } from "@remix-run/react"
import { withZod } from "@remix-validated-form/with-zod"
import { FC, useEffect, useState } from "react"
import { MdArrowDropDown } from "react-icons/md"
import { ValidatedForm } from "remix-validated-form"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { SubmitButton } from "~/components/UI/SubmitButton/SubmitButton"
import FormInput from "~/components/UI/ValidatedFormInput/ValidatedFormInput"
import FormTextArea from "~/components/UI/ValidatedTextArea/ValidatedTextArea"
import { WidgetDataType, WidgetInstance } from "~/types/types"
import styles from "./styles.module.css"

type TextFormType = {
	widget: WidgetInstance;
};

const Form: FC<TextFormType> = ({ widget }) => {
	const [value, setValue] = useState<WidgetDataType | null>(null);
	const sub = useSubmit();

	useDndMonitor({
		onDragStart() {
			const stringifyWidgetData = JSON.stringify(value)
			sub({ widgetData: stringifyWidgetData }, { method: "post", navigate: false })
		},

	})

	useEffect(() => {
		if (widget.data) {
			setValue(widget.data);
		}
	}, [widget]);

	const defaultValues = {
		title: widget.data?.title || "",
		text: widget.data?.text || "",
	};

	const textValidator = withZod(
		z.object({
			title: zfd.text(z.string().min(5).max(15)),
			text: zfd.text(z.string().min(10).max(500)),
		})
	);

	const [open, setOpen] = useState<boolean>(false);

	const deleteWidget = () => {
		sub({ containerId: widget.containerId, widgetId: widget.id }, { action: "?index", method: "delete", navigate: false });
	};

	const handleTitleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue((prevValue) => ({ ...prevValue, title: e.target.value }));

	};

	const handleTextValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue((prevValue) => ({ ...prevValue, text: e.target.value }));

	};

	return (
		<div className={styles.container}>
			<button className={styles.button} onClick={() => setOpen((prev) => !prev)}>
				<p>Widget Name {widget.id}</p>
				<MdArrowDropDown />
			</button>
			{open && (
				<ValidatedForm className={styles.form} defaultValues={defaultValues} validator={textValidator} method="post">
					<FormInput name="title" value={value?.title} placeholder="Title" onChange={handleTitleValueChange} label="Title" type="text" />
					<FormTextArea name="text" value={value?.text} placeholder="text" onChange={handleTextValueChange} type="text" />
					<div className="flex justify-between">
						<SubmitButton classNames={styles.saveButton}>Save</SubmitButton>
						<button className={styles.deleteButton} onClick={deleteWidget}>
							Delete
						</button>
					</div>
				</ValidatedForm>
			)}
		</div>
	);
};

export default Form;