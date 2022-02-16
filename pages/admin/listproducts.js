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
import CircularProgress from '@material-ui/core/CircularProgress';
import useKeys from '@/components/Hooks/useKeys';
import Admin from '@/layouts/Admin';

import ProductTable from '@/elementAdmin/TABLES/ProductTable2/ProductTable';

function Layout(props) {
  const router = useRouter();
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const [{ productList }, dispatch] = redux();
  const [emit] = useSocket(admin);

  const delRow = async (productName) => {
    await emit('delProduct', productName);
  };

  const onVisibility = async (productName, visibility) => {
    await emit('editVisibilityProduct', { product: productName, value: !visibility });
  };

  const onRecomendation = async (productName, recomendation) => {
    await emit('editRattingProduct', { product: productName, value: recomendation });
  };

  const setStock = async (productName, stock) => {
    await emit('editStockProduct', { product: productName, value: stock });
  };

  const setTags = async (productName, tag) => {
    if (tag.actif === true) await emit('editTagProduct', { product: productName, value: tag });
    else await emit('editTagProduct', { product: productName, value: undefined });
  };

  return (
    <Admin session={session}>
      <Div width="calc(100% - 5px)" vertical="top">
        <ProductTable
          list={Object.values({ ...productList }).filter((val) => !val.hidden)}
          delRow={delRow}
          onVisibility={onVisibility}
          onRecomendation={onRecomendation}
          setStock={setStock}
          setTags={setTags}
        />
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
