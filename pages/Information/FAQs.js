import React, { useMemo, useState } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
import Link from 'next/link';

// components
import {
  redux, Div, hookDeviceInfo, Button
} from 'components';
import Grid from '@material-ui/core/Grid';
import Span from '@/components/Typography/Spam';
// layout
import Layout from '@/layouts/Default2';
import GeneralSection from '@/elementsClient/Sections/FaqSection/GeneralSection';
import MostPopular from '@/elementsClient/Sections/FaqSection/MostPopular';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';

function Page(props) {
  const { user, ...rest } = props;
  const [emit, socket] = useSocket(user);
  const [{ profilInfo }, dispatch] = redux();
  const router = useRouter();
  const params = router.query.option || 'general';

  const goingTo = (params) => {
    router.push({
      pathname: '/Information/FAQs',
      query: { option: params },
    });
  };

  const arrayLinks = [
    { title: 'General', link: 'general' },
    { title: 'Motorcycle & Parts', link: 'motorcycleparts' },
    { title: 'Riding Gear', link: 'riding' },
    { title: 'Homologations', link: 'homologations' },
    { title: 'Customer Service', link: 'customer' },
    { title: 'Others', link: 'others' },
  ];

  const TitleSelectCategorie = useMemo(() => {
    const results = arrayLinks.filter((a) => a.link === params);
    if (results.length >= 0) return results[0]?.title || arrayLinks[0].title;
    return 'AAA';
  }, [params]);

  // Pour le bouton Contact us
  const LinkTo = (props) => {
    const { link, children } = props;
    const [hover, setHover] = useState(false);
    return (
      <span
        type="link2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Button color="primary" style={{ width: '200px' }}>
          <Link href={link} passHref>
            <span>{children}</span>
          </Link>
        </Button>

      </span>
    );
  };

  return (
    <Div width="100%" style={{ minHeight: '1000px' }} vertical="top">
      <Div height={['100px', '150px', '150px', '150px', '150px']} />
      <Div onClick={() => goingTo('popular')} style={{ fontSize: '25px', fontFamily: 'GorgiaBold' }}>
        FAQs
      </Div>
      <Div height="20px" />
      <Div
        width="calc(100% - 20px)"
        style={{
          // maxWidth: '1000px',
          display: 'flex',
          flexDirection: 'row',
          justifyItems: 'center',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <GridContainer spacing={2}>
          {
            arrayLinks.map((val, i) => (
              <GridItem num={[12, 4, 4, true, true]} key={`${i + 1}`}>
                <Div
                  vertical="bottom"
                  width={['calc(100% - 20px)', '100%', '100%', '100%', '100%']}
                  style={{
                    border: 'solid 2px #18374C',
                    padding: '5px',
                    ...`${val.link}` === `${params}` ? { background: '#18374C', color: 'white' } : {}
                  }}
                  onClick={() => goingTo(`${val.link}`)}
                >
                  <Div>{val.title}</Div>
                </Div>
              </GridItem>
            ))
          }
        </GridContainer>
      </Div>
      <Div width="calc(100% - 20px)" style={{ paddingTop: '20px', borderBottom: '1.5px solid black' }} />
      <Div width="calc(100% - 20px)" vertical="top" horizontal="left" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Span type="serifTitleBold" style={{ marginBottom: '20px', marginTop: '20px' }}>{`${TitleSelectCategorie}`}</Span>
        <GeneralSection goingTo={goingTo} />

        <Div width="100%" horizontal="left">
          <Span type="serifTitleBold">
            Specific Issue
          </Span>
          <LinkTo link="mailto: moto@meister-engineering.com">
            <Span type="aboutSmallTitle1">
              Contact Us
            </Span>
          </LinkTo>
        </Div>
        <Div height={50} />
      </Div>
    </Div>
  );
}

// style={{ borderRight: arr.length - 1 === i ? 'none' : '1px solid grey', fontFamily: 'NovaLight, sans serif' }}

function AboutMeister(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default AboutMeister;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
