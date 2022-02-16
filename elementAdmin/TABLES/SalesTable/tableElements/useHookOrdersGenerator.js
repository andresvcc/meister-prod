import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import Close from '@material-ui/icons/Close';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

// core components
import { useWindowWidth } from 'react-window-size-hooks';
// core components
import PaymentIcon from '@material-ui/icons/Payment';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import Button from '@/components/CustomButtons/Button';
// import Data from file
// react component used to create sweet alerts

import SweetPrintMaster from './SweetPrintMaster';
import SweetStatusMaster from './SweetStatusMaster';

const useStyles = makeStyles(styles);

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const format = (val) => {
  const objetDate = new Date(val.date);
  const formDate = `${objetDate.getDay()}/${objetDate.getMonth()}/${objetDate.getFullYear()}`;
  const total = [...val.products.map((val) => (val?.price * val?.qty) + (val?.price * val?.qty) * 0.16), 0, 0].reduce((a, b) => a + b) + (val.shippingCost || 0);
  return { ...val, formDate, total };
};

const formatDate = (date) => {
  const objetDate = new Date(date);
  const formDate = `${objetDate.getDay()}-${objetDate.getMonth()}-${objetDate.getFullYear()}`;
  return formDate;
};

const useHookOrdersGenerator = () => {
  const width = useWindowWidth();
  const [ordersData, setorders] = useState([]);
  const classes = useStyles();
  const [{ orders, billing, users }, dispatch] = redux();

  const { list = [] } = orders || {};
  const ordersArr = list;

  const Buttons = (props) => {
    const { product } = props;
    const formatProduct = format(product);
    return (
      <Div row>
        <SweetStatusMaster
          product={product}
          color="github"
          className={classes.actionButton}
        >
          <PriorityHighIcon className={classes.icon} />
        </SweetStatusMaster>
        <SweetPrintMaster
          product={formatProduct}
          color="info"
          className={classes.actionButton}
        >
          <PrintIcon className={classes.icon} />
        </SweetPrintMaster>
      </Div>
    );
  };

  const PayButton = ({ payService }) => (
    <Button
      color="primary"
      className={width < 1040 ? classes.actionButton3 : classes.actionButton2}
    >
      <span>{payService}</span>
      {width >= 1040 ? (
        <div>
            &nbsp;
            &nbsp;
          <PaymentIcon className={classes.icon} />
        </div>
      ) : null}
    </Button>
  );

  useEffect(() => {
    if (orders !== undefined && orders.list && billing && users) {
      // get all data

      const newOrdersData = ordersArr.map(({
        indexOrder, dateOrder, idBilling, idOrder, indexBilling, payCode, payDate, payService, pay, user
      }, i) => ({
        indexOrder,
        idOrder,
        dateOrder,
        payCode,
        payDate,
        payService,
        pay,
        idBilling,
        indexBilling,
        fname: users[user].billings[idBilling].fname,
        lname: users[user].billings[idBilling].lname,
        email: users[user].email,
        products: users[user].billings[idBilling].products,
        billingCountry: users[user].billings[idBilling].billingCountry,
        billingAddress: users[user].billings[idBilling].billingAddress,
        billingZipCode: users[user].billings[idBilling].billingZipCode,
        billingZipArea: users[user].billings[idBilling].billingZipArea,
        shippingCost: users[user].billings[idBilling].shippingCost,
        currency: users[user].billings[idBilling]?.currency,
        shippingService: users[user].billings[idBilling].shippingService,
        packageSize: users[user].billings[idBilling].packageSize,
        estimatedShippingDelay: users[user].billings[idBilling].estimatedShippingDelay,
        country: users[user].billings[idBilling].country,
        address: users[user].billings[idBilling].address,
        zipCode: users[user].billings[idBilling].zipCode,
        zipArea: users[user].billings[idBilling].zipArea,
      }));

      const rowData = newOrdersData.map(({
        indexOrder, idOrder, dateOrder, fname, lname, email, country, products, address, payCode, payService, zipCode, zipArea, shippingCost, currency, ...rest
      }) => [
        idOrder,
        `${fname} ${lname}`,
        email,
        `${[...products].map((val) => val.prix).reduce(reducer) + shippingCost} ${currency}`,
        (formatDate(dateOrder)),
        'received',
        <Buttons
          product={{
            indexOrder,
            idOrder,
            dateOrder,
            fname,
            lname,
            email,
            country,
            products,
            address,
            payCode,
            payService,
            zipCode,
            zipArea,
            shippingCost,
            currency,
            ...rest
          }}
        />
      ]);

      
      setorders(rowData);
    }
  }, [orders, width, users, billing]);

  return [ordersData];
};

export default useHookOrdersGenerator;

/*

        const newOrdersData = ordersArr.map(({
          id, name, idOrder, address, zipCode, zipArea, country, products = [], ...rest
        }) => [
          id,
          name,
          idOrder,
          shippingAddress,
          country,
          buttonsProduct,
          [...products].map((val) => val.prix).reduce(reducer),
          <Buttons
            product={{
              id,
              name,
              idOrder,
              address,
              zipCode,
              zipArea,
              country,
              products,
              ...rest
            }}
          />
        ]);

*/
