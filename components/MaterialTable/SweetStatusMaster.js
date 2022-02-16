import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from '@/components/CustomButtons/Button';

// react component used to create sweet alerts
// material-ui components

import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';

const useStyles2 = makeStyles(styles2);

const sweetAlertStyle = { display: 'block', marginTop: '-100px' };

function SweetCheckFinal(props) {
  const {
    children, color, className, product
  } = props;

  const classes = useStyles2();
  const [alert, setAlert] = React.useState(null);

  const hideAlert = () => {
    setAlert(null);
  };

  const status = () => {
    setAlert(
      <SweetAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title="STOCK"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
      >
        STOCK System
      </SweetAlert>
    );
  };

  return (
    <>
      {alert}
      <Button color={color} onClick={status} className={className}>
        {children}
      </Button>
    </>
  );
}

export default SweetCheckFinal;
