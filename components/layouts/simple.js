// React and modules
import React from 'react';

// @material-ui/core components
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { hookDeviceInfo, redux } from 'components';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/layouts/default';

import Logo from '@/components/layouts/headerDescktop/logo';

// css style

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

export default function Components(props) {
  const { width } = hookDeviceInfo();
  const { children } = props;

  const [{
    adminProfilInfo, productList, users, globalSettings
  }] = redux();

  if (adminProfilInfo.init === true || productList?.none === true || users === undefined || globalSettings === undefined) {
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
    <main style={{ width: '100%' }}>
      <div style={{ height: '20px' }} />
      {children}
    </main>
  );
}
