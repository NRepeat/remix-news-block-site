import { FC } from 'react';

type SelectButtonType = {
	selectedImage: number | null,
	setHandler: (data: {
		id: number;
		postId: number;
	}) => void
	postId: number
}

const SelectButton: FC<SelectButtonType> = ({ selectedImage, setHandler, postId }) => {
	return (
		<button className={` ${selectedImage ? "border-green-300" : "border-gray-300 bg-gray-200 text-gray-600 hover:bg-gray-200"}  border-2 rounded-sm hover:bg-green-50   pr-7 pl-7 pt-1 pb-1 `} disabled={selectedImage ? false : true} onClick={() => setHandler({ id: selectedImage ? selectedImage : 0, postId })}> Select</button>
	)
}

export default SelectButton