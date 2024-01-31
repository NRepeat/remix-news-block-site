import { useSubmit } from '@remix-run/react'
import { MdDelete } from 'react-icons/md'

const DeleteButton = ({ id }: { id: number }) => {
	const submit = useSubmit()
	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		submit({ id }, { action: `/admin/posts/post/${id}/delete`, navigate: false, method: 'delete' })
	}
	return (
		<button onClick={(e) => handleDelete(e)} className='inline-flex justify-center items-center     '> <MdDelete className='fill-red-500 h-6 w-6' /></button>
	)
}

export default DeleteButton