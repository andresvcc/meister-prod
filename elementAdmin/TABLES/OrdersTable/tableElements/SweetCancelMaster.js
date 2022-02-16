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

  const cancelDetele = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: 'block', marginTop: '-100px' }}
        title="The cancellation transaction has been annulled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
      >
        The cancellation transaction has been cancelled, the order status remains unchanged.
      </SweetAlert>
    );
  };

  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title="The order has been cancelled!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
      >
        a cancellation email will be sent to the customer, this email will detail the explanation for the cancellation of this order.
      </SweetAlert>
    );
  };

  const inputConfirmAlertNext = (e) => {
    setAlert(e);
    setTimeout(() => {
      setAlert(
        <SweetAlert
          showCancel
          style={{ display: 'block', marginTop: '-100px' }}
          onConfirm={() => successDelete()}
          onCancel={() => cancelDetele()}
          confirmBtnCssClass={`${classes.button} ${classes.success}`}
          cancelBtnCssClass={`${classes.button} ${classes.link}`}
          title={(
            <span>
              <small style={{ fontSize: '20px' }}>Please confirm reason for cancellation:</small>
            </span>
          )}
        >
          {e}
        </SweetAlert>
      );
    }, 200);
  };

  const inputAlert = () => {
    setAlert(
      <SweetAlert
        input
        showCancel
        style={{ display: 'block', marginTop: '-100px' }}
        title={(
          <span>
            <small style={{ fontSize: '20px' }}>Describe the reason why you want to cancel the order.</small>
          </span>
        )}
        onConfirm={(e) => {
          inputConfirmAlertNext(e);
        }}
        onCancel={() => cancelDetele()}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
        cancelBtnCssClass={`${classes.button} ${classes.link}`}
        customClass={classes.title}
      />
    );
  };

  const warningWithConfirmMessage = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Are you sure?"
        onConfirm={() => inputAlert()}
        onCancel={() => cancelDetele()}
        confirmBtnCssClass={`${classes.button} ${classes.danger}`}
        cancelBtnCssClass={`${classes.button} ${classes.link}`}
        confirmBtnText="Yes, cancel it!"
        cancelBtnText="No, turn back"
        showCancel
      >
        Cancelling an order has some consequences!
      </SweetAlert>
    );
  };

  return (
    <>
      {alert}
      <Button color={color} onClick={warningWithConfirmMessage} className={className}>
        {children}
      </Button>
    </>
  );
}

export default SweetCheckFinal;
