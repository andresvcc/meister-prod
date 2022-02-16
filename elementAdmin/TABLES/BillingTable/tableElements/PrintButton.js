import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import PrintIcon from '@material-ui/icons/Print';
import ReactPDF, {
  Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink
} from '@react-pdf/renderer';
import FactureClient from '@/elementAdmin/PDF/FactureClient';

// import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';

import Button from '@/components/CustomButtons/Button';

const style = {
  actionButton: {
    margin: '0px',
    padding: '0px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      margin: '0px'
    },
  },
  icon: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    // top: '-1px',
    // position: 'absolute',
  },
};

const useStyles = makeStyles(style);

const deliveryFormatdate = (estimatedShippingDelay, dayVariable = 4) => {
  const today = new Date(estimatedShippingDelay);
  const month = today.toLocaleString('en-EN', {
    month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
  });
  const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayVariable);
  const month2 = nextweek.toLocaleString('en-EN', {
    month: 'long', weekday: 'long', day: 'numeric', year: 'numeric'
  });

  return `${month} and ${month2}`;
};

function PrintButton(props) {
  const classes = useStyles();
  const {
    product,
    user,
  } = props;

  useEffect(() => {
    console.log({
      product, user
    });
  }, [product, user]);

  const delivery = deliveryFormatdate(product.estimatedShippingDelay);

  return (
    <Div row>
      <PDFDownloadLink document={<FactureClient product={product} user={user} delivery={delivery} />} fileName="Facture Meister-Engineering.pdf">
        {({
          blob, url, loading, error
        }) => (
          <Div
            style={{
              position: 'absolute', zIndex: 2, top: 0, left: -5
            }}
            dev
          >
            <Button color="info" className={classes.actionButton}>
              <PrintIcon className={classes.icon} />
            </Button>
          </Div>
        )}
      </PDFDownloadLink>
    </Div>
  );
}

export default PrintButton;
