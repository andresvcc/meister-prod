// 1. Index - Home Page of website
import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
// components
import { redux, Div, Button } from 'components';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '@/layouts/Default2';

const Index = React.memo((props) => {
  const { user, seo, ...rest } = props;
  const useSocketHook = useSocket(user);

  const [{ productList = {}, localCurrency, currencyRates }] = redux();

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>Test 5</title>
      </Head>

      <Script
        async
        id="mcjs2"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Layout
        useSocketHook={useSocketHook}
        parallaxImage="/static/images/Meister_paralax_img.png"
        parallaxVideo="https://youtu.be/wg-NMpah4oQ"
      >
        <Div>
          <Button>Test</Button>
          <Div height="150px" dev>Test</Div>
          <Div>
            <pre>{JSON.stringify(seo, null, 2)}</pre>
          </Div>
        </Div>
      </Layout>
    </>
  );
});

export default Index;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo');
  if (!user) { return { props: { seo } }; }
  return { props: { user, seo } };
};
