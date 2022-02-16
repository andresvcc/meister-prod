import React, { useEffect, useState, useMemo } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@/components/CustomButtons/Button';
// react component used to create sweet alerts
// material-ui components

import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';
import SweetTreatmentOrder from './SweetTreatmentOrder';

const useStyles2 = makeStyles(styles2);

const sweetAlertStyle = { display: 'block', marginTop: '-100px' };

function SweetCheckFinal(props) {
  const {
    children, color, className, product, useSocketHook, updateList
  } = props;

  const [emit, socket] = useSocketHook;
  const classes = useStyles2();
  const [alert, setAlert] = React.useState(null);

  const hideAlert = () => {
    setAlert(null);
  };

  const onConfirm = () => {
    setAlert(null);
  };

  useEffect(() => {
    if (socket) {
      socket.on('setOrder', (data) => {
        
        if (data.idBilling === product.idBilling) {
          emit('sendMail', {
            to: product.email,
            objet: `your command ${product.idBilling} is being sender`,
            message: `your command ${product.idBilling} is being sender`,
            res: 'confirmClientResMail',
            idBilling: product.idBilling
          }).then((v2) => {
            updateList();
            setAlert(
              <SweetAlert
                success
                style={sweetAlertStyle}
                title="Good job!"
                onConfirm={() => onConfirm()}
                onCancel={() => hideAlert()}
                confirmBtnCssClass={
                 `${classes.button} ${classes.success}`
               }
              >
                A confirmation email will be sent to the customer, to inform him that the order is being prepared, as soon as it is shipped, he should come back here and confirm the shipment.
              </SweetAlert>
            );
          });
        }
      });
    }
  }, [socket]);

  const successAlert = async (data) => {
    await emit('setOrder', {
      idBilling: product.idBilling,
      orderData: {
        status: 'delivered',
      },
    });

    
  };

  const confirmAlert = () => {
    setAlert(<SweetTreatmentOrder product={product} successAlert={successAlert} hideAlert={hideAlert} useSocketHook={useSocketHook} />);
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
