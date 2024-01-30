import { useSubmit } from '@remix-run/react'
const CreateButton = () => {
	const submit = useSubmit()
	const handleSubmit = () => {
		submit({ asd: "asd" }, { action: "/admin/posts/post/create/", method: "post" })
	}
	return (
		<button onClick={() => handleSubmit()} className='inline-flex pr-4 pl-4 pt-1 pb-1 border-2 rounded-sm text-green-600 border-green-600 hover:bg-green-200  hover:text-white'>Create post</button>
	)
}

export default CreateButton