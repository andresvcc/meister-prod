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

const ProductTable = dynamic(
  () => import('@/elementAdmin/TABLES/ProductTable/ProductTable'),
  { loading: () => <Div width="100%" height="50vh">...Loading</Div>, ssr: false }
);

function Layout(props) {
  const router = useRouter();
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const [{ productList }, dispatch] = redux();
  const [emit] = useSocket(admin);
  const [count, setCount] = useState(false);

  const delRow = async (data) => {
    await emit('delProduct', data.product);
  };

  const onVisibility = async ({ product, visibility }) => {
    await emit('editVisibilityProduct', { product, value: !visibility });
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setCount(true), 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <Admin session={session}>
      <Div width="calc(100% - 50px)" vertical="top" style={{ minHeight: '90vh' }}>
        <h6>Liste des produits proposées + possibilité de modifier quantité + mettre visible ou invisible</h6>
        {count ? (
          <ProductTable
            list={Object.values({ ...productList }).filter((val) => !val.hidden).map((val, i) => ({ ...val, multiCategorie: `${val.categorie} ${val.subcategorie} ${val.genre}` }))}
            delRow={delRow}
            onVisibility={onVisibility}
          />
        ) : <p>loading .....</p>}
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
