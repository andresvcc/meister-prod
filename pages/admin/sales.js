/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withIronSession } from 'next-iron-session';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// layout for this page
import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
import Admin from '@/layouts/Admin';
// core components
import SalesTable from '@/elementAdmin/TABLES/SalesTable/SalesTable';

import useKeys from '@/components/Hooks/useKeys';
// styles
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';

const useStyles = makeStyles(styles);

function Orders() {
  const classes = useStyles();

  return (
    <div>
      <SalesTable />
    </div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const [emit, socket] = useSocket(admin);

  return (
    <Admin session={session}><Orders {...props} /></Admin>
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
