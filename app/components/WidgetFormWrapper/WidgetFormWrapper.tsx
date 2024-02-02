import React, { FC, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { WidgetInstance } from '~/types/types'
import styles from "./styles.module.css"


type WidgetFormWrapperType = {
	children: React.ReactNode
	widget: WidgetInstance
}



const WidgetFormWrapper: FC<WidgetFormWrapperType> = ({ children, widget, }) => {
	console.log("🚀 ~  widget:", widget.additionalData?.placeHolder)

	const [open, setOpen] = useState<boolean>()
	return (
		<div className={styles.container}>
			<button className={styles.button} onClick={() => setOpen((prev) => !prev)}>
				<p>{widget.additionalData?.placeHolder} </p>
				<MdArrowDropDown />
			</button>
			{open && (
				<div className='p-4'>
					{children}
				</div>
			)}
		</div>
	)
}

export default WidgetFormWrapper