import { FC } from 'react'

type NavigationType = {
	setOpenTab: React.Dispatch<React.SetStateAction<boolean>>,
	tabIsOpen: boolean
}

const Navigation: FC<NavigationType> = ({ setOpenTab, tabIsOpen }) => {
	return (
		<nav className="inline-flex w-full pt-4 gap-2">
			<button
				onClick={() => setOpenTab(true)}
				className={`rounded-sm border-2 p-2 ${tabIsOpen ? 'bg-gray-200' : ''}`}
			>
				Select
			</button>
			<button
				onClick={() => setOpenTab(false)}
				className={`rounded-sm border-2 p-2 ${!tabIsOpen ? 'bg-gray-200' : ''}`}
			>
				Upload
			</button>

		</nav>
	)
}

export default Navigation