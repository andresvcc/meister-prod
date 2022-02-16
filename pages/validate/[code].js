import React, { useEffect } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
import Head from 'next/head';
// components
import { Div } from 'components';
import Body from '@/components/Body/Body';
import Button from '@/components/CustomButtons/Button';
import GridItem from '@/components/Grid/GridItem';
// icon
import Logo from './Logo';

const Index = React.memo((props) => {
  const { user } = props;
  const router = useRouter();
  const [emit, socket] = useSocket(user);

  const activate = () => {
    emit('validate', router.query.code);
  };

  const validateRes = () => {
    router.push('/');
  };

  useEffect(() => {
    if (socket) {
      socket.on('validateRes', validateRes);
    }
  }, [socket]);
  // Validation de l'address mail
  return (
    <>
      <Head>
        <title>Email Validator</title>
      </Head>
      <main>
        <Body>
          <Div height="130px" />
          <Div height="100vh" width="100%" style={{ background: '#18374C' }}>

            <Div width="80%" height="50%" style={{ background: 'white' }}>

              <GridItem num={[4, 4, 4, 4, 4]}>
                <Logo />
              </GridItem>

              <Div width="100%" style={{ fontFamily: 'NovaBold', fontSize: '20px' }}>
                Verify your email address
              </Div>

              <Div height={10} />

              <Div width="100%" style={{ fontFamily: 'NovaLight', fontSize: '17px', textAlign: 'center' }}>
                Please verify this email address by clicking on the button below.
              </Div>

              <Div height={10} />

              <Button color="primary" onClick={activate}>Validate email</Button>

            </Div>
          </Div>
        </Body>
      </main>
    </>
  );
});

export default Index;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: { } };
  return { props: { user } };
};
