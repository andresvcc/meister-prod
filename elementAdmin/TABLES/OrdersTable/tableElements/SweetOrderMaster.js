import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@/components/CustomButtons/Button';

import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';
import SweetCheckOrder from './SweetCheckOrder';
// react component used to create sweet alerts
// material-ui components
const mailTreating = require('../../../../socketOn/mail/treatment_mail');

const useStyles2 = makeStyles(styles2);

const sweetAlertStyle = { display: 'block', marginTop: '-100px' };

function SweetCheckFinal(props) {
  const {
    children, color, className, product, providers, useSocketHook
  } = props;

  const [emit, socket] = useSocketHook;
  const classes = useStyles2();
  const [alert, setAlert] = React.useState(null);
  const [promise1, setPromise1] = useState(false);
  const [promise2, setPromise2] = useState(false);
  const [promise3, setPromise3] = useState(false);
  const [senderMails, setSenderMails] = useState({});

  const hideAlert = () => {
    setAlert(null);
  };

  const confirmClientResMail = async () => {
    await emit('setOrder', {
      idBilling: product.idBilling,
      orderData: {
        status: 'treatment',
        productsByProvider: senderMails
      },
    });

    setAlert(
      <SweetAlert
        success
        style={sweetAlertStyle}
        title="Good job!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={
          `${classes.button} ${classes.success}`
        }
      >
        A confirmation email will be sent to the customer, to inform him that the order is being prepared, as soon as it is shipped, he should come back here and confirm the shipment.
      </SweetAlert>
    );
  };

  useEffect(() => {
    if (promise1 && promise3) {
      confirmClientResMail();
    }
  }, [promise1, promise2, promise3]);

  useEffect(() => {
    if (socket) {
      socket.on('setOrderProvider', (data) => (data.idBilling === product.idBilling ? setPromise1(true) : false));
      socket.on('setOrder', (data) => (data.idBilling === product.idBilling ? setPromise2(true) : false));
      socket.on('confirmClientResMail', (data) => (data.idBilling === product.idBilling ? setPromise3(true) : false));
    }
  }, [socket]);

  const successAlert = async (senderMails, order) => {
    setSenderMails(senderMails);

    const newProviderList = [...Object.entries(senderMails).map(([key, value]) => ({
      [key]: {
        ...(providers[key] || { name: key }),
        orders: [
          ...(providers[key]?.orders || []),
          {
            idBilling: order.idBilling,
            user: product.user,
            products: value.products.map((val) => val.i)
          }
        ]
      }
    })), {}, {}].reduce((a, b) => ({ ...a, ...b }));

    await emit('setOrderProvider', {
      newProviderList, idBilling: order.idBilling
    });

    await emit('sendMail', {
      to: product.email,
      objet: 'Your order is being treated',
      message: mailTreating({}),
      res: 'confirmClientResMail',
      idBilling: product.idBilling
    });

    setAlert(
      <SweetAlert
        style={sweetAlertStyle}
        title="Loading..."
        onConfirm={() => console.log('confirm')}
        showConfirm={false}
      >
        <CircularProgress disableShrink style={{ width: '40px', height: '40px', color: '#7b818a' }} />
      </SweetAlert>
    );
  };

  const confirmAlert = () => {
    setAlert(<SweetCheckOrder providers={providers} product={product} successAlert={successAlert} hideAlert={hideAlert} useSocketHook={useSocketHook} />);
  };

  return (
    <>
      {alert}
      <Button color={color} onClick={confirmAlert} className={className}>
        {children}
      </Button>
    </>
  );
}

export default SweetCheckFinal;
