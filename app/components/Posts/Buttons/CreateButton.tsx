import { useSubmit } from '@remix-run/react'
const CreateButton = () => {
	const submit = useSubmit()
	const handleSubmit = () => {
		submit({ asd: "asd" }, { action: "/posts/post/create/", method: "post" })
	}
	return (
		<button onClick={() => handleSubmit()} className='inline-flex pr-4 pl-4 pt-1 pb-1 bg-green-200 hover:bg-green-400 '>Create post</button>
	)
}

export default CreateButton