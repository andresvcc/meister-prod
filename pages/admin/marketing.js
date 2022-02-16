/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { withIronSession } from 'next-iron-session';

// @material-ui/core components

// layout for this page
import useSocket from 'useSocketAdmin';
import ChartistGraph from 'react-chartist';
import BaseCard from 'elementsClient/Cards/BaseCard';
import { redux, Div } from 'components';
import Admin from '@/layouts/Admin';
// core elements
import NumberCardsVisites from '@/elementAdmin/sections/MarketingKpi/NumberCardsVisites';
import GraphCardsTraffic from '@/elementAdmin/sections/MarketingKpi/GraphCardsTraffic';

import useKeys from '@/components/Hooks/useKeys';

import GridItem from '@/components/Grid/GridItem';

import {
  pieChart,
} from '@/assets/variables/charts';

function Marketing() {
  const [{ dsa }] = redux();
  const { deviceSource } = dsa[2];
  return (
    <div>
      <Div height="80px" horizontal="left">
        <h6>Traffic</h6>
      </Div>
      <NumberCardsVisites />
      <Div height="80px" horizontal="left">
        <h6>Source</h6>
      </Div>
      <GraphCardsTraffic />
      <Div height="80px" horizontal="left">
        <h6>Traffic</h6>
      </Div>
      <GridItem num={[12, 10, 3, 3, 3]}>
        <BaseCard
          header="Device by traffic"
          color="dark"
        >
          <ChartistGraph
            data={deviceSource}
            type="Pie"
            options={pieChart.options}
          />
        </BaseCard>
      </GridItem>
      <Div height="80px" horizontal="left">
        <h6> Tableau Nombre de commandes par produits</h6>
      </Div>
      <Div height="80px" horizontal="left">
        <h6> Tableau Liste des utilisateurs</h6>
      </Div>

    </div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const [emit, socket] = useSocket(admin);

  return (
    <Admin session={session}><Marketing {...props} /></Admin>
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
