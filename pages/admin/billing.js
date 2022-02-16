/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';

// layout for this page
// core components

import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
// import ProductTable from '@/elementAdmin/TABLES/ProductTable/ProductTable';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import useKeys from '@/components/Hooks/useKeys';
import Admin from '@/layouts/Admin';

import BillingT from '@/elementAdmin/TABLES/BillingTable2/BillingT';

function Layout(props) {
  const router = useRouter();
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const [{ users }, dispatch] = redux();
  const [emit] = useSocket(admin);

  return (
    <Admin session={session}>
      <Div width="calc(100% - 50px)" vertical="top">
        <BillingT list={Object.values({ ...users })} />
      </Div>
    </Admin>
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
