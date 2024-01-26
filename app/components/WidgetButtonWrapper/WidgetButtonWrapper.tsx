import { UniqueIdentifier } from '@dnd-kit/core'
import { useSubmit } from '@remix-run/react'
import { FC, useState } from 'react'
import { DropInstance, WidgetButton } from '~/types/types'
import Modal from '../Modal/Modal'
import widgets from '../Widgets/Widgets'
import styles from "./styles.module.css"

type WidgetButtonWrapper = {
	button: WidgetButton,
	dropZones: DropInstance[]
}

const WidgetButtonWrapper: FC<WidgetButtonWrapper> = ({ button, dropZones }) => {
	const [open, setIsOpen] = useState<boolean>(false)
	const { id, type } = button

	const widgetButtonData = widgets[type].button
	const sub = useSubmit()
	const addWidgetToContainer = (containerId: string | UniqueIdentifier) => {
		const newFormData = new FormData()


		newFormData.set('id', `widget-button-${id}`)
		newFormData.set('type', type)
		newFormData.set('containerId', `${containerId}`)

		sub(newFormData, { method: "post", action: "/?index" })
	}

	return (
		<div>
			<button onClick={() => setIsOpen(true)} onKeyDown={() => setIsOpen(true)} className={styles.widgetButton} >
				<p>{widgetButtonData.name}</p>
			</button>
			{
				open &&
				<Modal head='Chose container' setIsOpen={setIsOpen} >
					{dropZones.map(zone => <button className={styles.modalButton} onClick={() => { setIsOpen(false), addWidgetToContainer(zone.id) }} key={zone.id} >{zone.type}</button>)}
				</Modal>

			}
		</div>

	)
}

export default WidgetButtonWrapper