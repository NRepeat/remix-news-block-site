import { FC } from 'react';

type SelectButtonType = {
	selectedImage: number | null,
	setPostImageHandler?: (data: {
		id: number;
		postId: number;
	}) => void
	setSelectImage?: React.Dispatch<React.SetStateAction<(number | undefined)[]>>
	postId?: number
}



const SelectButton: FC<SelectButtonType> = ({ selectedImage, setPostImageHandler, postId, setSelectImage }) => {

	const handleImageSave = ({ selectedImage, postId }: { selectedImage: number, postId: number }) => {
		if (setSelectImage)
			return setSelectImage(prev => [selectedImage, ...prev])
		if (setPostImageHandler) {
			return setPostImageHandler({ id: selectedImage, postId })
		}
	}
	return (
		<button className={` ${selectedImage ? "border-green-300" : "border-gray-300 bg-gray-200 text-gray-600 hover:bg-gray-200"}  border-2 rounded-sm hover:bg-green-50   pr-7 pl-7 pt-1 pb-1 `} disabled={selectedImage ? false : true} onClick={() => handleImageSave({ selectedImage: selectedImage ? selectedImage : 0, postId: postId ? postId : 0 })}> Select</button>
	)
}

export default SelectButton