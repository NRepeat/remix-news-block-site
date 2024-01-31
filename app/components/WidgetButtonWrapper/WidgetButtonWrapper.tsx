import { UniqueIdentifier } from '@dnd-kit/core'
import { useSubmit } from '@remix-run/react'
import { FC, useState } from 'react'
import { DropInstance, WidgetButton, WidgetInstance } from '~/types/types'
import Modal from '../Modal/Modal'
import widgets from '../Widgets/Widgets'
import styles from "./styles.module.css"

type WidgetButtonWrapper = {
	button: WidgetButton,
	dropZones: DropInstance[]
	widgetsArr: WidgetInstance[] | undefined
}

const WidgetButtonWrapper: FC<WidgetButtonWrapper> = ({ button, dropZones, widgetsArr }) => {

	const [open, setIsOpen] = useState<boolean>(false)
	const { id, type } = button

	const widgetButtonData = widgets[type].button
	const sub = useSubmit()
	const addWidgetToContainer = (containerId: string | UniqueIdentifier) => {
		console.log("🚀 ~ addWidgetToContainer ~ containerId:", containerId)
		const newFormData = new FormData()
		const newElement = widgets[type].construct({ id: `widget-button-${id}`, containerId });
		const stringifiedNewElement = JSON.stringify(newElement)
		console.log("🚀 ~ addWidgetToContainer ~ newElement:", newElement)
		newFormData.set("page", "main")
		newFormData.set("newElement ", stringifiedNewElement)
		newFormData.set("index", `${widgetsArr?.length}`)
		sub({ newElement: stringifiedNewElement, page: "main", index: widgetsArr?.length ? widgetsArr.length : 0 }, { method: "post" })
	}
	return (
		<>
			<button onClick={() => setIsOpen(true)} onKeyDown={() => setIsOpen(true)} className={styles.widgetButton} >
				<p>{widgetButtonData.name}</p>
			</button>
			{
				open &&
				<div>
					<Modal head='Chose container' setIsOpen={setIsOpen} >
						{dropZones.map(zone => <button className={styles.modalButton} onClick={() => { setIsOpen(false), addWidgetToContainer(zone.id) }} key={zone.id} >{zone.type}</button>)}
					</Modal>
				</div>


			}
		</>

	)
}

export default WidgetButtonWrapper