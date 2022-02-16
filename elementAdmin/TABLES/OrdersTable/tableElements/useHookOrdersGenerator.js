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
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import Button from '@/components/CustomButtons/Button';
// import Data from file
// react component used to create sweet alerts

import SweetOrderMaster from './SweetOrderMaster';
import SweetPrintMaster from './SweetPrintMaster';
import SweetCancelMaster from './SweetCancelMaster';

const useStyles = makeStyles(styles);

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const format = (val) => {
  const objetDate = new Date(val.dateOrder);
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
  const [{ orders, users }, dispatch] = redux();

  const { list = {} } = orders || {};
  const ordersArr = Object.values(list);

  const Buttons = (props) => {
    const { product } = props;
    const formatProduct = format(product);

    return (
      <Div row>
        <SweetPrintMaster
          product={formatProduct}
          color="info"
          className={classes.actionButton}
        >
          <PrintIcon className={classes.icon} />
        </SweetPrintMaster>
        <SweetOrderMaster
          product={product}
          color="success"
          className={classes.actionButton}
        >
          <PlaylistAddCheckIcon fontSize="large" className={classes.icon} />
        </SweetOrderMaster>
        <SweetCancelMaster
          product={product}
          color="danger"
          className={classes.actionButton}
        >
          <Close className={classes.icon} />
        </SweetCancelMaster>
      </Div>
    );
  };

  const PayButton = ({ payService, pay, currency }) => (
    <Div>
      <Button
        disabled
        color="primary"
        className={width < 1040 ? classes.actionButton3 : classes.actionButton2}
      >
        <Div>
          <p>{`${pay} ${currency}`}</p>
          <Div row>
            <span>{`by ${payService}`}</span>
            {width >= 1040 ? (
              <div>
            &nbsp;
            &nbsp;
                <PaymentIcon className={classes.icon} />
              </div>
            ) : null}
          </Div>
        </Div>
      </Button>
    </Div>
  );

  useEffect(() => {
    if (orders !== undefined && orders.list && users && ordersArr.length > 0) {
      // get all data

      const newOrdersData = ordersArr.map(({
        indexOrder, dateOrder, idBilling, indexBilling, payCode, payDate, payService, pay, user
      }, i) => ({
        indexOrder: i,
        idOrder: `${i}`,
        dateOrder,
        payCode,
        payDate,
        payService,
        pay,
        idBilling,
        indexBilling,
        fname: users[user]?.fname,
        lname: users[user]?.lname,
        email: users[user]?.email,
        products: users[user]?.billings[idBilling]?.products,
        billingCountry: users[user]?.billings[idBilling]?.billingCountry,
        billingAddress: users[user]?.billings[idBilling]?.billingAddress,
        billingZipCode: users[user]?.billings[idBilling]?.billingZipCode,
        billingZipArea: users[user]?.billings[idBilling]?.billingZipArea,
        shippingCost: users[user]?.billings[idBilling]?.shippingCost,
        currency: users[user]?.billings[idBilling]?.currency,
        shippingService: users[user]?.billings[idBilling]?.shippingService,
        packageSize: users[user]?.billings[idBilling]?.packageSize,
        estimatedShippingDelay: users[user]?.billings[idBilling]?.estimatedShippingDelay,
        country: users[user]?.billings[idBilling]?.country,
        address: users[user]?.billings[idBilling]?.address,
        zipCode: users[user]?.billings[idBilling]?.zipCode,
        zipArea: users[user]?.billings[idBilling]?.zipArea,
        TVA: users[user]?.billings[idBilling]?.TVA,
      }));

      const rowData = newOrdersData.map(({
        indexOrder, idOrder, dateOrder, fname, lname, email, country, products = [], address, pay, payCode, payService, zipCode, zipArea, shippingCost, currency, TVA, payDate, ...rest
      }) => [
        idOrder,
        <Div>
          <p style={{ userSelect: 'all', WebkitUserSelect: 'all', MozUserSelect: 'all' }}>{`${fname} ${lname}`}</p>
          <p style={{ userSelect: 'all', WebkitUserSelect: 'all', MozUserSelect: 'all' }}>{email}</p>
        </Div>,
        <Div style={{ userSelect: 'all', WebkitUserSelect: 'all', MozUserSelect: 'all' }}>
          <p style={{ fontSize: '15px' }}>{`${country}`}</p>
          <p style={{ fontSize: '15px' }}>{`${zipCode} ${zipArea}`}</p>
          <p style={{ fontSize: '16px' }}>{`${(new Date(payDate)).toLocaleDateString()}`}</p>
        </Div>,
        <Div width="100%">
          <Div horizontal="right" style={{ userSelect: 'all', WebkitUserSelect: 'all', MozUserSelect: 'all' }}>
            <p style={{ fontSize: '15px' }}>{`Shiping: ${(parseFloat(shippingCost, 10)).toFixed(2)} ${currency}`}</p>
            <p style={{ fontSize: '15px' }}>{`Subtotal: ${([...[...products].map((val) => val.price), 0, 0].reduce(reducer) + parseFloat(shippingCost, 10)).toFixed(2)} ${currency}`}</p>
            <p style={{ fontSize: '16px', fontWeight: 'bolder' }}>{`Total: ${([...[...products].map((val) => val.price + (val.price * 0.16)), 0, 0].reduce(reducer) + parseFloat(shippingCost, 10)).toFixed(2)} ${currency}`}</p>
          </Div>
        </Div>,
        <PayButton payService={payService} pay={pay} currency={currency} />,
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
            pay,
            payCode,
            payService,
            zipCode,
            zipArea,
            shippingCost,
            currency,
            TVA,
            payDate,
            ...rest
          }}
        />
      ]);

      setorders(rowData);
    }
  }, [orders, width, users]);

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
          [...products].map((val) => val.price).reduce(reducer),
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
