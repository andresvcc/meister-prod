/* eslint-disable camelcase */
import React, { useEffect, useMemo } from 'react';
import { withIronSession } from 'next-iron-session';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// layout for this page
// core components
import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
import Admin from '@/layouts/Admin';
import useKeys from '@/components/Hooks/useKeys';
import EditSeoPage from '@/elementAdmin/Seo/EditSeoPage';
//  style
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';

const useStyles = makeStyles(styles);

function Seo({ socketObj }) {
  const [emit, socket] = socketObj;
  const classes = useStyles();
  const [{ profilInfo, globalSettings }, dispatch] = redux();
  const pages = useMemo(() => Object.entries(globalSettings.seo ?? {}).map(([key, value]) => ({ page: key, ...value })), [globalSettings.seo]);

  const saveSeoSettings = (data) => {
    emit('EDIT-SEOS-ETTINGS', data);
  };

  return (
    <Div width="100%">
      <h5>Profil</h5>
      <br />
      <Div vertical="top" horizontal="left" width="100%">
        {
          pages.map(({
            page, title, description, firstTitle, links
          }) => (
            <EditSeoPage
              key={page}
              saveSeoSettings={saveSeoSettings}
              {...{
                page, title, description, firstTitle, links
              }}
            />
          ))
        }
      </Div>
    </Div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [login, send] = useKeys(loginStatus);
  const socketObj = useSocket(admin);

  return (
    <Admin session={session}>
      <Div width="100%">
        <Div width={['100%', '100%', '100%', '100%', 1400]} horizontal="center">
          <Seo {...props} socketObj={socketObj} />
        </Div>
      </Div>
    </Admin>
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
