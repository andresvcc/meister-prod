import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/layouts/Default2';
import Page from '@/elementsClient/Sections/JournalSection/journalPageSection';

function Journal(props) {
  const { user, seo } = props;
  const useSocketHook = useSocket(user);
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <div style={{ display: 'none' }}>
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
        <Page />
      </Layout>
    </>
  );
}
export default Journal;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.journal');
  const verifiedSeo = {
    title: seo.title ?? 'The Journal',
    description: seo.description ?? 'The journal of Meister-Engineering Motorcycle. All the news concerning Meister.',
    firstTitle: seo.firstTitle ?? 'Journal of Meister-Engineering',
    links: seo.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
