import { FC } from "react"
import { IoMdClose } from "react-icons/io"
import styles from './styles.module.css'
type ModalType = {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	children: React.ReactNode
	head: string
}


const Modal: FC<ModalType> = ({ setIsOpen, children, head }) => {
	return (
		<>
			<div className={styles.modal} aria-hidden onKeyDown={() => setIsOpen(false)} onClick={() => setIsOpen(false)}>
				<div className={styles.container} />
			</div>

			<div className={styles.wrapper}>
				<h2 className={styles.head}>{head}
					<button className={styles.close} onClick={() => setIsOpen(false)}>
						<IoMdClose />
					</button>
				</h2>
				<div className={styles.children}>
					{children}
				</div>

			</div>

		</>


	)
}

export default Modal