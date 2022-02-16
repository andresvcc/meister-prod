import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { redux, Div } from 'components';
import useSocket from 'useSocket';
import nextCookies from 'next-cookies';
import LoginElement from 'elementsClient/Sections/Login/LoginElement';
import RegisterElement from 'elementsClient/Sections/Login/RegisterElement';
import ForgotPasswordElement from 'elementsClient/Sections/Login/ForgotPassElement';
import Head from 'next/head';
import Link from 'next/link';
import Body from '@/components/Body/Body';

export default function ConnexionSection(props) {
  const { user, ...rest } = props;
  const [emit, socket] = useSocket(user);
  const [{ sessions, profilInfo }, dispatch] = redux();
  const router = useRouter();
  const params = router.query.option;

  // Ajouté les states pour Login, pour ne pas avoir le même message que sur Register
  const [errorApiLogin, serErrorApiLogin] = useState([]);
  const [errorsApiRecovery, setErrorApiRecovery] = useState([]);

  // register
  const [errorsApi, setErrorApi] = useState([]);
  const [validateRegister, setValidateRegister] = useState([]);

  // recovery
  const [validateRecovery, setValidateRecovery] = useState([]);

  const [loading, setLoading] = useState(false);

  const goingTo = (params) => {
    router.push({
      pathname: '/login',
      query: { option: params },
    });
  };

  // Login
  const login = (data) => {
    if (data.email && data.password) {
      setLoading(true);
      emit('login', data);
      serErrorApiLogin([]);
    } else {
      const missingErrMsg = ['All the fields must be filled'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorApiLogin)) serErrorApiLogin(missingErrMsg);
    }
  };

  const loginRes = (data) => {
    if (data.err) serErrorApiLogin([data.err]);
    if (profilInfo.registered) {
      setTimeout(() => {
        setLoading(false);
        router.push({
          pathname: '/',
        });
      }, 1000);
    }
  };

  // Register
  const register = (data) => {
    if (data.email && data.password && data.fname && data.lname && data.password) {
      setLoading(true);
      emit('register', data);
      setErrorApi([]);
      const accountConfirmation = ['An email has been sent to confirm your account!'];
      setValidateRegister(accountConfirmation);
    } else {
      const missingErrMsg = ['All the fields must be filled'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorsApi)) setErrorApi(missingErrMsg);
    }
  };

  const registreRes = (data) => {
    if (data.err) {
      setErrorApi([data.err]);
    } else {
      setErrorApi([]);
      setLoading(false);
    }
  };

  const recovery = async (data) => {
    if (data.email) {
      setLoading(true);
      await emit('recovery', data);
      setErrorApiRecovery([]);
    } else {
      const missingErrMsg = ['All the fields must be filled'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorsApiRecovery)) setErrorApiRecovery(missingErrMsg);
    }
  };

  const recoveryRes = (data) => {
    if (data.err) {
      setErrorApiRecovery([data.err]);
    } else {
      setErrorApiRecovery([]);
      setLoading(false);
      const accountRecoveryPass = ['An email has been sent to your email address!'];
      setValidateRecovery(accountRecoveryPass);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('registreRes', registreRes);
      socket.on('loginRes', loginRes);
      socket.on('recoveryRes', recoveryRes);
    }
  }, [socket]);

  useEffect(() => {
    if (profilInfo.registered) {
      router.push('/');
    }
  }, [profilInfo]);

  return (
    <>
      <Head>
        <title>{`${params || 'login'} Meister`}</title>
      </Head>
      <main>
        <Body>
          <Div height="150px" />

          {params === 'login' || !params ? (<LoginElement goingTo={goingTo} submit={login} errorsApi={errorApiLogin} />) : null }
          {params === 'register' ? (<RegisterElement goingTo={goingTo} submit={register} errorsApi={errorsApi} validate={validateRegister} />) : null }
          {params === 'recovery' ? <ForgotPasswordElement goingTo={goingTo} submit={recovery} errorsApi={errorsApiRecovery} validate={validateRecovery} /> : null}

        </Body>
      </main>
    </>
  );
}

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.login');
  const verifiedSeo = {
    title: seo.title ?? 'Log In',
    description: seo.description ?? 'Log in to the Meister-Engineering Website',
    firstTitle: seo.firstTitle ?? 'Log In Meister-Engineering',
    links: seo.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
