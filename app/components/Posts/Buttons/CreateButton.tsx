import { Link } from "react-router-dom"

const CreateButton = () => {

	return (
		<Link to={"/posts/create/"} className='inline-flex pr-4 pl-4 pt-1 pb-1 bg-green-200 hover:bg-green-400 '>Create post</Link>
	)
}

export default CreateButton