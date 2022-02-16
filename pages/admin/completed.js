/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// layout for this page
import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
import Admin from '@/layouts/Admin';
// core components
import OrdersTable from '@/elementAdmin/TABLES/OrdersTable/OrdersTableCompleted';
import SalesTable from '@/elementAdmin/TABLES/SalesTable/SalesTable';

import useKeys from '@/components/Hooks/useKeys';
// styles

const useRefresh = (useSocketHook) => {
  const [show, setShow] = useState(false);
  const [emit, socket, admin] = useSocketHook;

  useEffect(
    () => {
      const timer1 = setTimeout(() => {
        setShow(true);
      }, 1000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  useEffect(() => {
    if (show) emit('refreshDataAdmin', admin);
  }, [show]);

  return [show];
};

function Orders({ useSocketHook }) {
  const [refresh] = useRefresh(useSocketHook);

  if (!refresh) {
    return (
      <Div width="100%" height="500px"><p>Loading last Orders</p></Div>
    );
  }

  return (
    <div>
      <OrdersTable useSocketHook={useSocketHook} />
    </div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const useSocketHook = useSocket(admin);

  return (
    <Admin session={session}><Orders {...props} useSocketHook={useSocketHook} /></Admin>
  );
}

export default Layout;

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const login = await req.session.get('login');
    const loginStatus = !!login;
    const admin = req.cookies;

    if (loginStatus === false) {
      return {
        props: { loginStatus, ...(admin || {}) },
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    return {
      props: { loginStatus: false, session: login || {}, ...(admin || {}) }
    };
  },
  {
    cookieName: 'adminMeister',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    },
    password: process.env.APPLICATION_SECRET
  }
);
