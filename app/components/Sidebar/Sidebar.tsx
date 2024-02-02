import {Link, useLocation} from '@remix-run/react';

const Sidebar = () => {
  const location = useLocation();
  const links = [
    {title: 'Pages', link: '/admin/pages'},
    {title: 'Posts', link: '/admin/posts'},
    {title: 'Media', link: '/admin/media'},
    {title: 'Texts ', link: '/admin/texts'},
  ];

  return (
    <nav className="min-h-screen " style={{gridArea: 'sidebar'}}>
      <ul className=" flex flex-col h-full pl-4 gap-1 bg-sky-900 text-white ">
        {links.map((link, i) => (
          <li
            style={{
              backgroundColor: `${location.pathname.includes(link.link) ? 'rgb(125 211 252) ' : ' rgb(12 74 110)'}`,
            }}
            className="w-full"
            key={i}
          >
            <Link
              prefetch="intent"
              className="h-full w-full pl-4 p-4 inline-flex hover:bg-sky-300 transition-colors ease-in"
              to={link.link}
            >
              {link.title}
            </Link>{' '}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
