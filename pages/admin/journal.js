/* eslint-disable camelcase */
import React, { useRef, useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';

// layout for this page
// core components

import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
// import ProductTable from '@/elementAdmin/TABLES/ProductTable/ProductTable';
import { useRouter } from 'next/router';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useKeys from '@/components/Hooks/useKeys';
import Admin from '@/layouts/Admin';
import Contains from '@/elementAdmin/page/mapJournal/container';

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const useSocketHook = useSocket(admin);

  return (
    <Admin session={session}>
      <Div width="100%" vertical="top">
        <Div width="calc(100% - 50px)" vertical="top" style={{ paddingTop: '10px', maxWidth: '1600px' }}>
          <DndProvider backend={HTML5Backend}>
            <Contains useSocketHook={useSocketHook} />
          </DndProvider>
        </Div>
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
