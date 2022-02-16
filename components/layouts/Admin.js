// React and modules
import React, { useEffect, createRef, useState } from 'react';
import cx from 'classnames';
import Router, { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles';

// fonctions
import {
  redux, Div, Button, axios
} from 'component';
import LinearProgress from '@material-ui/core/LinearProgress';
import getActiveRoute from '@/layouts/functions/getActiveRoute';

// core components
import AdminNavbar from '@/components/Navbars/AdminNavbar';
import AuthNavbar from '@/components/Navbars/AuthNavbar';
import Footer from '@/components/Footer/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import useNavigatorPlatform from '@/components/Hooks/useNavigatorPlatform';

// others
import routes from '@/layouts/routes';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/layouts/adminStyle';
import Logo from '@/components/layouts/headerDescktop/logo';

const useStyles = makeStyles(styles);

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: 'white',
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'black',
  },
}))(LinearProgress);

export default function Dashboard(props) {
  const { children, session, ...rest } = props;
  // used for checking current route
  const router = useRouter();
  // get type of navigator
  const navigatorPlatform = useNavigatorPlatform();
  // states and functions
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniActive, setMiniActive] = useState(false);
  const color = 'white';
  const bgColor = 'black';

  // styles
  const classes = useStyles();
  const mainPanelClasses = `${classes.mainPanel
  } ${
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.perfectScrollbar]:
        navigatorPlatform.indexOf('Win') > -1,
    })}`;

  const resizeFunction = () => {
    if (window.innerWidth >= 860) {
      setMobileOpen(false);
    }
  };

  // ref for main panel div
  const mainPanel = createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };

  const [{
    adminProfilInfo, productList, users, globalSettings, providers
  }] = redux();

  const [show, setShow] = useState(false);
  const [problem, setProblem] = useState(false);

  const resetConnection = async () => {
    const keycode = await axios.post({
      url: '/api/admin/logout',
    });

    await Cookies.remove('admin');
    await Cookies.remove('adminMeister');
    await Router.reload('/admin/login');
  };

  useEffect(
    () => {
      const timer1 = setTimeout(() => setShow(true), 5000);
      return () => {
        clearTimeout(timer1);
      };
    },
    []
  );

  useEffect(() => {
    if (show === true && (adminProfilInfo.init === true || providers?.none === true || productList?.none === true || users === undefined || globalSettings === undefined)) {
      setProblem(true);
    }
  }, [show]);

  if (problem) {
    return (
      <main>
        <div style={{
          display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '100vw', height: '100vh'
        }}
        >
          <div style={{ width: '160px', height: '130px' }}>
            <Logo />
          </div>
          <Div width="750px">
            We have encountered a problem, you must reload the page to correct it, if you encounter this problem repeatedly, then Contact Andres or Alexis to resolve the issue.
            <Button color="warning" onClick={resetConnection} style={{ marginTop: '50px' }}>
              Refresh
            </Button>
          </Div>
        </div>
      </main>
    );
  }

  if (adminProfilInfo.init === true || providers?.none === true || productList?.none === true || users === undefined || globalSettings === undefined) {
    return (
      <main>
        <div style={{
          display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '100vw', height: '100vh'
        }}
        >
          <div style={{ width: '160px', height: '130px' }}>
            <Logo />
          </div>
          <div style={{ width: '160px', color: 'black', textAlign: 'center' }}>
            <div style={{
              display: 'flex', justifyItems: 'center', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', width: '160px'
            }}
            >
            &nbsp;&nbsp;&nbsp;Loading...
            </div>
            <BorderLinearProgress />
          </div>

        </div>
      </main>
    );
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        session={session}
        routes={routes}
        logoText="Meister"
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          brandText={getActiveRoute(routes, router.route)}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
