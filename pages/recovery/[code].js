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
import ChangePassForm from '@/elementsClient/Forms/changePass';
// icon
import Logo from './Logo';

const Index = React.memo((props) => {
  const { user } = props;
  const router = useRouter();
  const [emit, socket] = useSocket(user);

  const recovery = (data) => {
    if (data.password === data.passwordConfirm) {
      emit('changePass', { code: router.query.code, password: data.password });
    }
  };

  const changeRes = () => {
    router.push('/login');
  };

  useEffect(() => {
    if (socket) {
      socket.on('changeRes', changeRes);
    }
  }, [socket]);
  // Validation de l'address mail
  return (
    <>
      <Head>
        <title>Recovery Password</title>
      </Head>
      <main>
        <Body>
          <Div height="130px" />
          <Div height="120vh" width="100%" style={{ background: '#18374C' }}>

            <Div style={{ background: 'white' }} width="95%">
              <GridItem num={[4, 4, 4, 4, 4]}>
                <Logo />
              </GridItem>

              <Div width="100%" style={{ fontFamily: 'NovaBold', fontSize: '20px' }}>
                Recover your password
              </Div>

            </Div>

            <Div width="95%" height="40%" style={{ background: 'white' }}>

              <Div height={10} />

              <ChangePassForm language="EN" submit={recovery} />

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
