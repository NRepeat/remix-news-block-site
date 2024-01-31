import React, { FC, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { WidgetInstance } from '~/types/types'
import styles from "./styles.module.css"


type WidgetFormWrapperType = {
	children: React.ReactNode
	widget: WidgetInstance
}



const WidgetFormWrapper: FC<WidgetFormWrapperType> = ({ children, widget, }) => {

	const [open, setOpen] = useState<boolean>()
	return (
		<div className={styles.container}>
			<button className={styles.button} onClick={() => setOpen((prev) => !prev)}>
				<p>{widget.type} {widget.id}</p>
				<MdArrowDropDown />
			</button>
			{open && (
				<>
					{children}
				</>
			)}
		</div>
	)
}

export default WidgetFormWrapper