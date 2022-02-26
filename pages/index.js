// 1. Index - Home Page of website
import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
// components
import { redux } from 'components';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Layout from '@/layouts/Default2';
// Home section
import Page from '@/elementsClient/pageComponents/index';

const Index = React.memo((props) => {
  const { user, seo, ...rest } = props;
  const useSocketHook = useSocket(user);

  const [{ productList = {}, localCurrency, currencyRates }] = redux();

  const productsPilot = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Pilot').splice(0, 5), [productList, localCurrency]);
  const productsParts = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Parts').splice(0, 5), [productList, localCurrency]);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <div style={{
        display: 'none', height: '200px', width: '100vw', background: 'red'
      }}
      >
        <h1>{seo.firstTitle}</h1>
        {
          seo.links.map((link) => (
            <Link key={link} href={link} passHref>
              {link}
            </Link>
          ))
        }
      </div>
      <Script async id="mcjs">
        {'!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/e252a53feef4c02199339a207/7bd00700069c60f111aa7ed45.js");'}
      </Script>
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

        <Script async id="mcjs3">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
          `}
        </Script>
        <Page productListPilot={productsPilot} productListParts={productsParts} />
      </Layout>
    </>
  );
});

export default Index;

const editJsonFile = require('edit-json-file');

//
export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.index');
  const verifiedSeo = {
    title: seo.title ?? 'Home',
    description: seo.description ?? 'Home Page of Meister Engineering',
    firstTitle: seo.firstTitle ?? 'Home Page',
    links: seo.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
