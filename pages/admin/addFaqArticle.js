/* eslint-disable camelcase */
import React from 'react';
import { withIronSession } from 'next-iron-session';

// @material-ui/core components

// core components
import { redux } from 'components';
import useSocket from 'useSocketAdmin';
import SimpleLayout from '@/layouts/simple';
import useKeys from '@/components/Hooks/useKeys';

import AddJournal from '@/elementAdmin/page/addFaq/AddJournal';

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const useSocketHook = useSocket(admin, session.key);

  return (
    <SimpleLayout session={session}><AddJournal useSocketHook={useSocketHook} /></SimpleLayout>
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
