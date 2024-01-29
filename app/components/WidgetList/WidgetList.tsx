import { FC } from "react"
import { randomNumber } from "~/routes/_index/_index"
import { DropInstance, WidgetButton, WidgetInstance } from "~/types/types"
import WidgetButtonWrapper from "../WidgetButtonWrapper/WidgetButtonWrapper"

type WidgetListType = {
	buttons: WidgetButton[]
	dropZones: DropInstance[]
	widgetsArr: WidgetInstance[] | undefined
}

const WidgetButtonList: FC<WidgetListType> = ({ buttons, dropZones, widgetsArr }) => {

	return (
		<div className="flex flex-col items-center rounded-sm bg-gray-300  p-2 gap-4 border-2 border-gray-400 w-max">
			{buttons.map(button => <WidgetButtonWrapper widgetsArr={widgetsArr} dropZones={dropZones} key={randomNumber()} button={button} />)}
		</div>
	)
}

export default WidgetButtonList