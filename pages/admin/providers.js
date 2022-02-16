/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withIronSession } from 'next-iron-session';

// layout for this page
// core components
import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
import Admin from '@/layouts/Admin';
import useKeys from '@/components/Hooks/useKeys';

import Providers from '@/elementAdmin/page/Provider/Providers';

function Page({ useDataSocket }) {
  const [emit, socket] = useDataSocket;

  const addNew = async (val) => {
    await emit('newProvider', { key: val.name, value: val });
  };

  const editProvider = async (val) => {
    await emit('editProvider', { key: val.name, value: val });
  };

  const deleteProvider = async (val) => {
    await emit('deleteProvider', { key: val.name });
  };

  const registreNewProvider = (val) => {

  };

  useEffect(() => {
    if (socket) {
      socket.on('newProvider', registreNewProvider);
      socket.on('editProvider', registreNewProvider);
    }
  }, [socket]);

  return (
    <Div width="100%">
      <Div width={['100%', '100%', '100%', 'calc(100% - 20px)', 1400]} style={{ paddingTop: '20px' }}>
        <Providers addNew={addNew} editProvider={editProvider} deleteProvider={deleteProvider} />
      </Div>
    </Div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const useDataSocket = useSocket(admin);

  return (
    <Admin session={session}><Page {...props} useDataSocket={useDataSocket} /></Admin>
  );
}

export default Layout;

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const login = await req.session.get('login');
    const loginStatus = !!login;
    const admin = req.cookies;

    if (loginStatus === false) {
      return {
        props: { loginStatus, ...(admin || {}) },
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    return {
      props: { loginStatus: false, session: login || {}, ...(admin || {}) }
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
