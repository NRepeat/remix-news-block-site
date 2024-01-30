import { Link, useLocation } from "@remix-run/react"

const Sidebar = () => {
	const location = useLocation()
	const links = [{ title: "Pages", link: "/admin/pages" }, { title: "Posts", link: "/admin/posts" }, { title: "Media", link: "/admin/media" }, { title: "Mixins", link: "/admin/mixins" }]

	return <nav style={{ gridArea: "sidebar" }}  >
		<ul className=" flex flex-col h-full pl-4 gap-1 bg-sky-900 text-white ">
			{links.map((link, i) => <li style={{
				backgroundColor: `${location.pathname.includes(link.link) ? "rgb(125 211 252) " : ' rgb(12 74 110)'}`
			}} key={i}><Link prefetch="intent" className="h-full w-full p-4 inline-flex items-center hover:bg-sky-300 transition-colors ease-in" to={link.link}> {link.title}</Link>  </li>)}
		</ul>

	</nav>
}

export default Sidebar