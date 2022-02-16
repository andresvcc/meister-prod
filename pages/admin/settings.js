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

function Parameters({ socketObj }) {
  const classes = useStyles();
  const [statesRedux, dispatch] = redux();
  return (
    <Div width="100%">
      <h5>Settings</h5>
      <br />
      <pre>{JSON.stringify(Object.keys(statesRedux), null, 2)}</pre>
    </Div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const socketObj = useSocket(admin);

  return (
    <Admin session={session}><Div width="100%"><Div width={['100%', '100%', '100%', '100%', 1400]} horizontal="center"><Parameters {...props} socketObj={socketObj} /></Div></Div></Admin>
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
