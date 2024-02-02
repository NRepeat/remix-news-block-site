import {Outlet} from '@remix-run/react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from './styles.module.css';

const AdminLayout = () => {
  return (
    <section className={styles.grid}>
      <Header />
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default AdminLayout;
