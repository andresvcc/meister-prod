import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
// components
import { redux, Div, hookDeviceInfo } from 'components';
// layout
import Layout from '@/layouts/Default2';
import DisplayTitle from '@/elementsClient/Sections/JournalSection/DisplayTitle';
import DisplaySubTitle from '@/elementsClient/Sections/JournalSection/DisplaySubTitle';
import DisplayDivider from '@/elementsClient/Sections/JournalSection/DisplayDivider';
import DisplayEditor from '@/elementsClient/Sections/JournalSection/DisplayEditor';
import DisplayGrid from '@/elementsClient/Sections/JournalSection/DisplayGrid';
import DoubleImage from '@/elementsClient/Sections/JournalSection/DoubleImage';
// pour text et image a coté : displayMultiple Elements
// import DisplayEditor from '@/elementsClient/Sections/JournalSection/DisplayMultipleElements';
import JournalMapUnique from '@/elementsClient/Sections/JournalSection/JournalMapUnique';

const FullImageRender = ({ data }) => (
  <Div width="100%" style={{ marginBottom: '20px', marginTop: '20px' }}>
    <Div
      height={['40vh', '400px', '500px', '700px', '700px']}
      width={['100%', '100%', '700px', '900px', '1200px']}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${data.style}`,
        backgroundPosition: `${data.position}`,
        backgroundImage: `url('${data.urlPhoto}')`,
      }}
    />
  </Div>
);

const render = {
  Title: (data) => <DisplayTitle data={data} />,
  'Sub Title': (data) => <DisplaySubTitle data={data} />,
  Divider: (data) => <DisplayDivider data={data} />,
  'Text Editor': (data) => <DisplayEditor data={data} />,
  'Full Image': (data) => <FullImageRender data={data} />,
  'Image with Text': (data) => <DisplayGrid data={data} />,
  'Double Image': (data) => <DoubleImage data={data} />,
};

function Page(props) {
  const { user, useSocketHook, ...rest } = props;
  const [emit, socket] = useSocketHook;
  const router = useRouter();
  const { width } = hookDeviceInfo();
  const [stateRedux, dispatch] = redux();
  const { articlesJournal = { list: {} } } = stateRedux;
  const { list } = articlesJournal;

  const article = React.useMemo(() => list[router.query.journal], [list]);

  if (!article) {
    return (
      <div style={{
        minHeight: '75vh', color: 'black', display: 'flex', alignItems: 'center'
      }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Div width="95%" style={{ minHeight: '75vh' }} vertical="top">
      <Div height="calc(10vh + 50px)" />
      {
        article.content.map((a, i) => <Div key={`${i + 1}`} width="100%">{render[a.component] && render[a.component](a.contain)}</Div>)
      }
      <Div height="10vh" />
      <Div width="100%" style={{ borderBottom: '0.5px solid #00000050' }} />
      <Div height={5} />
      <JournalMapUnique />
    </Div>
  );
}

function JournalUniqueArticle(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default JournalUniqueArticle;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};

/*
<Div width="100%" height="400px" horizontal="left" vertical="top" style={{ overflowY: 'scroll' }}>
        <pre>{JSON.stringify(article, null, 2)}</pre>
      </Div>
       */
