/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withIronSession } from 'next-iron-session';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// layout for this page
// core components
import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
import Admin from '@/layouts/Admin';
import useKeys from '@/components/Hooks/useKeys';
//  style
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';

const useStyles = makeStyles(styles);

function Media() {
  const classes = useStyles();
  return (
    <div>
      <h6>Loading ....</h6>
    </div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const [emit, socket] = useSocket(admin);

  return (
    <Admin session={session}><Media {...props} /></Admin>
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
