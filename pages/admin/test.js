/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';

// layout for this page
// core components

import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
// import ProductTable from '@/elementAdmin/TABLES/ProductTable/ProductTable';
import { useRouter } from 'next/router';
import useKeys from '@/components/Hooks/useKeys';
import Admin from '@/layouts/Admin';
// import productList from '@/assets/JsonDBU/product.json';

function Layout(props) {
  const router = useRouter();
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);

  const [emit] = useSocket(admin);
  // ...value,

  return (
    <Div width="calc(100% - 5px)" vertical="top" horizontal="left" style={{ userSelect: 'all' }}>
      <pre>
        {JSON.stringify({
          ...Object.entries({})
            .filter(([key, product]) => product.hidden === false)
            .map(([key, value], i) => ([key, { ...value, id: i, colors: [...value.colors.map((color) => ({ ...color, photos: [...color.photos, ...(color.photos.length <= 4 && value.categorie !== 'Pilot' ? ['', ''] : [])] }))] }]))
            .map(([key, value]) => ({ [key]: value }))
            .reduce((a, b) => ({ ...a, ...b }))
        }, null, 2)}
      </pre>
    </Div>
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
