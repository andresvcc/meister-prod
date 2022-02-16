// import 'babel-polyfill';
import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { renderToString } from 'react-dom/server';
import dynamic from 'next/dynamic';
import PrintIcon from '@material-ui/icons/Print';
import ReactPDF, {
  PDFDownloadLink
} from '@react-pdf/renderer';
import Button from '@/components/CustomButtons/Button';

import Facture from '@/elementAdmin/PDF/Facture';
import FactureClient from '@/elementAdmin/PDF/FactureClient';

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
    <Div row>
      {
        PDFDownloadLink ? (
          <PDFDownloadLink document={<FactureClient delivery={delivery} product={product} user={{ lname: product.lname, fname: product.fname, email: product.email }} />} fileName="Facture Meister-Engineering">
            {({
              blob, url, loading, error
            }) => (
              <Button color={color} className={className} {...rest}>
                {children}
              </Button>
            )}
          </PDFDownloadLink>
        ) : null
      }
    </Div>
  );
}

export default PrintButton;
