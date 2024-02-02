import { UniqueIdentifier } from '@dnd-kit/core'
import { Page } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
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
	page: SerializeFrom<Page>
}

const WidgetButtonWrapper: FC<WidgetButtonWrapper> = ({ page, button, dropZones, widgetsArr }) => {
	console.log("🚀 ~ widgetsArr:", widgetsArr)

	const [open, setIsOpen] = useState<boolean>(false)
	const { id, type } = button

	const widgetButtonData = widgets[type].button
	const sub = useSubmit()
	const addWidgetToContainer = (containerId: string | UniqueIdentifier) => {
		const newElement = widgets[type].construct({ id: `widget-button-${id}`, containerId });
		const stringifiedNewElement = JSON.stringify(newElement)
		sub({ newElement: stringifiedNewElement, page: page.slug, index: widgetsArr?.length ? widgetsArr.length : 0 }, { method: "post" })
	}
	const isDisabled = (zone: DropInstance,) => {
		if (zone.type === "TagsPageTopBanerContainer" && widgetsArr?.filter(w => w.id === zone.id).length > 1 ? true : false) {
			console.log("🚀 ~ isDisabled ~  widgetsArr?.filter(w => w.id === zone.id):", widgetsArr?.filter(w => w.id === zone.id).length > 1 ? true : false)
			return true;
		} else {
			return false; // Change this line to false if you want to enable the button in other cases
		}

	}
	const zones = dropZones.map(zone => zone).filter(z => z.type !== 'TagsPageMixinControl')
	return (
		<>
			<button onClick={() => setIsOpen(true)} onKeyDown={() => setIsOpen(true)} className={styles.widgetButton} >
				<p>{widgetButtonData.name}</p>
			</button>
			{
				open &&
				<div>
					<Modal head='Chose container' setIsOpen={setIsOpen} >
						<div className='flex flex-col w-50% gap-4'>
							{zones.map(zone => <button disabled={isDisabled(zone)} className={styles.modalButton} onClick={() => { setIsOpen(false), addWidgetToContainer(zone.id) }} key={zone.id} >{zone.name}</button>)}
						</div>

					</Modal>
				</div>


			}
		</>

	)
}

export default WidgetButtonWrapper