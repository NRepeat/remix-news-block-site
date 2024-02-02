import {Link} from '@remix-run/react';

const Header = () => {
  return (
    <header
      style={{gridArea: 'header'}}
      className="inline-flex  border-b-2 w-full p-4 items-center bg-sky-900 text-white"
    >
      {' '}
      <Link
        prefetch="intent"
        to={'/admin/pages'}
        className="h-full w-full font-bold text-xl inline-flex items-center  transition-colors ease-in hover:text-sky-300"
      >
        Admin panel
      </Link>{' '}
    </header>
  );
};
export default Header;
