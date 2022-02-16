/* eslint-disable object-curly-newline */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';
import { useRouter } from 'next/router';
import { redux, Div } from 'components';
import LoginForm from 'elementsClient/Forms/login';
import Head from 'next/head';
import Button from '@/components/CustomButtons/Button';
import useKeys from '@/components/Hooks/useKeys';

export default function ConnexionSection(props) {
  const { loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const [{ adminProfilInfo }, dispatch] = redux();
  const router = useRouter();

  const connectLogin = async (data) => {
    await send('/api/admin/login', data);
  };

  useEffect(() => {
    if (login === true) {
      router.push('/admin/dashboard');
    }
  }, [login]);

  return (
    <>
      <Head>
        <title>Login admin Meister</title>
      </Head>
      <main>
        <Div
          width="100%"
          height="100vh"
          dev
          style={{
            backgroundImage: 'url(/static/images/bg7.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#cccccc',
            backgroundPosition: 'center',
          }}
        >
          <Div
            width="350px"
            height="400px"
            style={{
              background: 'white',
              borderRadius: '8px'
            }}
            vertical="at"
          >
            <Div>
              <span>Login</span>
            </Div>
            <span>Access link for administrator users</span>
            <LoginForm submit={connectLogin} language="FR" />
          </Div>

          <Div
            height="20px"
          />

          <Div
            width="350px"
            height="70px"
            style={{
              background: 'white',
              borderRadius: '8px'
            }}
          >
            <Button color="primary" style={{ width: '290px' }}>
              <span>Password recovery</span>
            </Button>
          </Div>
        </Div>

      </main>
    </>
  );
}

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const login = await req.session.get('login');
    const loginStatus = !!login;

    if (loginStatus === true) {
      return {
        props: { loginStatus },
        redirect: {
          destination: '/admin/dashboard',
          permanent: false,
        },
      };
    }

    return {
      props: { loginStatus: false, session: login || {} }
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
