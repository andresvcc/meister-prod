/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { withIronSession } from 'next-iron-session';
import { useRouter } from 'next/router';
import cookies from 'next-cookies';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Language from '@material-ui/icons/Language';
import { redux, Div } from 'components';
import useSocket from 'useSocketAdmin';
import { CollectionsBookmarkRounded } from '@material-ui/icons';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';
// icons
// layout for this page
import Admin from '@/layouts/Admin';
// core components
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Table from '@/components/Table/Table';
import Card from '@/components/Card/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardIcon from '@/components/Card/CardIcon';
import CardBody from '@/components/Card/CardBody';
import useKeys from '@/components/Hooks/useKeys';

// import section
import OrdersTable from '@/elementAdmin/TABLES/OrdersTable/OrdersTableDashboard';
import PieChart from '@/elementAdmin/GraphCard/PieCharts/PieChartCard';
import PieChartBrand from '@/elementAdmin/GraphCard/PieCharts/PieChartBrand';
import BarChart from '@/elementAdmin/GraphCard/BartChartSales';
import BarChart2 from '@/elementAdmin/GraphCard/BarChartMostSold';
import useData from '@/elementAdmin/page/dashboard/useDataHook';
import BarChartOrders from '@/elementAdmin/GraphCard/BarCharts/BarChartOrders';
import PieChartDevise from '@/elementAdmin/GraphCard/PieCharts/PieChartDevise';
// Get date now
const dateNow = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  return date;
};

const useStyles = makeStyles(styles);

function Dashboard({ useSocketHook }) {
  // import variables from useData
  const {
    numUserAccountLogged, userConnectedToday, receivedOrders, monthOrdersTotal, WeekOrdersTotal, weekNames, monthNAmes,
  } = useData();
  const date = dateNow();
  const [filter, setFilter] = useState(['Orders this week', 'Orders by month']);
  const Add = filter.map((Add) => Add);
  const [finalFilter, setFinalFilter] = useState('');
  const handleAddrTypeChange = (e) => { setFinalFilter((filter[e.target.value])); };

  useEffect(() => {
  }, [filter, finalFilter]);
  return (
    <Div width="100%">
      <Div width="100%" horizontal="left">
        <Div style={{
          fontFamily: 'Open Sans', fontSize: '30px', color: '#18374C', fontWeight: 'bold'
        }}
        >
          Dashboard
        </Div>
        <Div style={{ color: 'grey' }}>{date}</Div>
        <Div height="40px" />
      </Div>
      <GridContainer>
        <GridItem num={[3, 3, 3, 3]}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="primary">
                Utilisateurs logged in (Live):
              </CardIcon>
            </CardHeader>
            <CardBody>
              {numUserAccountLogged}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem num={[1, 1, 1, 1]} />
        <GridItem num={[3, 3, 3, 3]}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="primary">
                Nombre de visiteurs (Live):
              </CardIcon>
            </CardHeader>
            <CardBody>
              {userConnectedToday}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem num={[1, 1, 1, 1]} />
        <GridItem num={[3, 3, 3, 3]}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="primary">
                Nombre de commandes reçues:
              </CardIcon>
            </CardHeader>
            <CardBody>
              {receivedOrders}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Div height="100px" />

      <GridContainer>
        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div width="100%" height="100%">
            <Div>
              <select
                onChange={(e) => handleAddrTypeChange(e)}
                className="browser-default custom-select"
              >
                {Add.map((address, key) => <option key={`${key + 1}`} value={key}>{address}</option>)}
              </select>
            </Div>
            <Div width="100%" height="100%">
              {finalFilter === filter[0] ? <Div width="100%"><BarChartOrders datas={WeekOrdersTotal} label={weekNames} title="Nombre de commandes cette semaine" /></Div> : <Div width="100%"><BarChartOrders datas={monthOrdersTotal} label={monthNAmes} title="Nombre de ventes par mois" /></Div>}
            </Div>
          </Div>

        </GridItem>
        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div>Pie Chart Produits vendus par catégorie</Div>
          <BarChart2 />
        </GridItem>
      </GridContainer>

      <Div height="80px" />

      <GridContainer spacing={2}>
        <GridItem num={[6, 6, 6, 6, 6]}>
          <BarChart />
        </GridItem>
        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div width="380px">
            <Div>Produits vendus par catégorie</Div>
            <PieChart />
          </Div>
        </GridItem>
      </GridContainer>

      <Div height="80px" />

      <GridContainer spacing={2}>
        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div width="380px">
            <Div>Produits vendus par Marques</Div>
            <PieChartBrand />
          </Div>
        </GridItem>
        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div width="380px">
            <Div>Produits vendus par Devise</Div>
            <PieChartDevise />
          </Div>
        </GridItem>
      </GridContainer>

      <Div height="80px" />

      <GridContainer spacing={2}>
        <GridItem num={[12, 12, 12, 12, 12]}>
          <OrdersTable useSocketHook={useSocketHook} />
        </GridItem>
      </GridContainer>

      <GridContainer />

    </Div>
  );
}

function Layout(props) {
  const { admin, loginStatus, session } = props;
  const [{ adminProfilInfo }, dispatch] = redux();
  const [login, send] = useKeys(loginStatus);
  const [emit, socket] = useSocket(admin, session.key);
  const useSocketHook = useSocket(admin);

  return (
    <Admin session={session}><Dashboard {...props} useSocketHook={useSocketHook} /></Admin>
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
