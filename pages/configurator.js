import React, { useEffect } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { redux, Div, hookDeviceInfo } from 'components';
import Iframe from 'react-iframe';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/layouts/Default2';

function Page(props) {
  const { user, useSocketHook, ...rest } = props;
  const [emit, socket] = useSocketHook;
  const { height, type } = hookDeviceInfo();
  const [{ profilInfo }, dispatch] = redux();
  const imagine2 = '/static/images/MotoCategorie/Motorcycle_Custom.png';
  /*
    <Iframe
          url="https://webgl.tailora.fr/demo/"
          width="100%"
          height={`${type === 'mobile' ? height * 0.79 : height * 0.70}px`}
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
        */

  return (
    <Div width="100%" style={{ minHeight: `${height * 0.70}px`, background: 'white' }} vertical="top">
      <Div height={type === 'mobile' ? 80 : 150} />
      <Div
        width="100%"
      >
        <Div
          width="100%"
          style={{ fontFamily: 'Georgia', fontSize: '18px' }}
        >
          Coming soon:

        </Div>

        <Div
          width="100%"
          style={{ fontFamily: 'Georgia', fontSize: '18px' }}
        >
          Design your future meister Motorcycle here!

        </Div>
        <Div width="500px" height="370px">
          <Image src={imagine2 ?? '/static/images/notPhoto.png'} alt="..." width="600px" height="370px" />
        </Div>

      </Div>
    </Div>
  );
}

function MadeToOrder(props) {
  const { user, seo, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <div style={{ visibility: 'hidden' }}>
        <h1 style={{ visibility: 'hidden' }}>{seo.firstTitle}</h1>
        {
          seo.links.map((link) => (
            <Link key={link} href={link} passHref>
              {link}
            </Link>
          ))
        }
      </div>
      <Layout useSocketHook={useSocketHook}>
        <Page user={user} useSocketHook={useSocketHook} {...rest} />
      </Layout>
    </>

  );
}

export default MadeToOrder;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.configurator');
  const verifiedSeo = {
    title: seo.title ?? 'The Configurator',
    description: seo.description ?? 'Meister-Engineering s Motorcycle configurator',
    firstTitle: seo.firstTitle ?? 'Configurator Meister-Engineering',
    links: seo.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
