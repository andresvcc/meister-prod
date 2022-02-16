// import 'babel-polyfill';
import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import PrintIcon from '@material-ui/icons/Print';
import ReactPDF, {
  PDFViewer
} from '@react-pdf/renderer';
import Button from '@/components/CustomButtons/Button';

import Facture from '@/elementAdmin/PDF/Facture';
import FactureClient from '@/elementAdmin/PDF/FactureClient';

// import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';

const style = {
  actionButton: {
    margin: '0',
    padding: '1px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      margin: '0'
    },
  },
  icon: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    top: '-1px',
    position: 'relative',
  },
};

const useStyles = makeStyles(style);

const deliveryFormatdate = (estimatedShippingDelay, dayVariable = 4) => {
  const [{ localCurrency, currencyRates }] = redux();
  const today = new Date(`${estimatedShippingDelay}`);
  const month = today.toLocaleString('fr-FR', {
    month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
  });
  const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayVariable);
  const month2 = nextweek.toLocaleString('fr-FR', {
    month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
  });

  return `${month} et ${month2}`;
};

function PrintButton(props) {
  const classes = useStyles();
  const {
    product,
    color,
    className,
    children,
    deliveryDate,
    ...rest
  } = props;

  const delivery = deliveryFormatdate(deliveryDate);

  return (
    <Div width="100%">
      {
       PDFViewer ? (
         <PDFViewer style={{ width: '100%', height: '100vh' }}>
           <FactureClient delivery={delivery} product={product} user={{ lname: product.lname, fname: product.fname, email: product.email }} />
         </PDFViewer>
       ) : null
      }
    </Div>
  );
}

export default PrintButton;
