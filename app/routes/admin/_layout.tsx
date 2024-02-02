import {MetaFunction} from '@remix-run/node';
import AdminLayout from '~/components/Layout/Admin';

export const meta: MetaFunction = () => {
  return [
    {title: 'Dashboard'},
    {name: 'description', content: 'Welcome to Remix!'},
  ];
};

export default function Index() {
  return <AdminLayout />;
}
