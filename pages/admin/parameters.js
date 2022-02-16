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
import Categories from '@/elementAdmin/section/parametters/categories';

const useStyles = makeStyles(styles);

function Parameters({ socketObj }) {
  const classes = useStyles();
  return (
    <Div width="100%">
      <h5>Parameters</h5>
      <br />
      <Div width="100%" horizontal="left" style={{ marginBottom: '20px' }}>
        <h6>Categories</h6>
      </Div>
      <Categories socketObj={socketObj} />
    </Div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
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
