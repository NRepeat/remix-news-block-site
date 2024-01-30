import { useSubmit } from '@remix-run/react'
import { MdDelete } from 'react-icons/md'

const DeleteButton = ({ id }: { id: number }) => {
	const submit = useSubmit()
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		submit({ id }, { action: `/admin/posts/post/${id}/delete`, navigate: false, method: 'delete' })
	}
	return (
		<button onClick={(e) => handleDelete(e)} className='inline-flex justify-center items-center    pt-1 '> <MdDelete className='fill-red-500 h-5 w-5' /></button>
	)
}

export default DeleteButton