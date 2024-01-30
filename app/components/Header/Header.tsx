import { Link } from "@remix-run/react"

const Header = () => {
	return <header style={{ gridArea: "header" }} className="inline-flex  w-full p-4 items-center bg-sky-900 text-white"> <Link prefetch="intent" to={'/'} className="h-full w-full inline-flex items-center  transition-colors ease-in hover:text-sky-300"> Admin panel</Link>  </header>
}
export default Header