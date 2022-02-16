import React, {
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Dialog } from '@material-ui/core';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
  redux, Div, FlexDiv, hookDeviceInfo
} from 'components';
import Divider from '@material-ui/core/Divider';
import CartTable from 'elementsClient/Table/CheckoutTable/CheckoutTable';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import {
  grayColor, blackColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

import Button from '@/components/CustomButtons/Button';
import { typeDelivery } from '@/assets/dataBase/BDCategories';

const useStyles = makeStyles({
  number: {
    marginTop: '10px',
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '15px',
    color: blackColor
  },
  total: {
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: '300',
    color: grayColor[2]
  },
  totalBold: {
    fontSize: '1.2em',
    marginTop: '10px',
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: 'bold',
    color: blackColor
  },
  titleNumber: {
    marginTop: '10px',
    fontFamily: 'GorgiaBold',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#0c0c0c',
    textTransform: 'uppercase'
  },
  numberTotal: {
    fontSize: '1.2em',
    marginTop: '10px',
    fontFamily: 'Ubuntu, sans-serif',
    color: blackColor,
    fontWeight: 'bold'
  },
  btOrder: {
    width: '90%',
    height: '60px',
    marginBottom: '20px',
    fontSize: '1em'
  },
});

const style = {
  container: {
    background: 'white',
    fontSize: '0.8em'
  }
};

const price = (localCurrency, productList, currencyRates, tva, val) => {
  const finalPrice = (Math.round((((productList[val.name]?.price * val.qty) / currencyRates[productList[val.name]?.currency]) * currencyRates[localCurrency]) * 100) / 100);
  return finalPrice + (finalPrice * tva);
};

const convert = (value, currency, localCurrency, currencyRates) => {
  if (currencyRates === undefined) return 0;
  const a = (Math.round(((value / currencyRates[currency]) * currencyRates[localCurrency]) * 100) / 100);
  return a;
};

const covertToCurrency = (curentLanguage, localCurrency, val) => {
  const a = new Intl.NumberFormat(`${curentLanguage}`, { style: 'currency', currency: localCurrency }).format(val);
  return a;
};

const cal = (val, max) => {
  if (val === 0) return 'void';
  if (val <= 15 && max) return 'cumbersome_upTo_30kg';
  if (val === 1) return 'parcel_100x60x60_2kg';
  if (val <= 5) return 'parcel_100x60x60_10kg';
  if (val <= 15) return 'parcel_100x60x60_30kg';
  if (val > 15) return 'cumbersome_upTo_maxkg';
};

export default function BagCardDialog(props) {
  const { color } = props;
  const classes = useStyles();
  const [{
    profilInfo, currencyRates, productList, localCurrency, curentLanguage, dialogBag = 'false', tva
  }, dispatch] = redux();

  const {
    cartItems = {}, billings = {}, selectedDelivery, selectedBilling, addresses,
  } = profilInfo;

  const router = useRouter();
  const total = Object.values(cartItems || {}).map((val) => {
    const priceProduct = price(localCurrency, productList, currencyRates, tva, val);
    return priceProduct;
  });

  const productsData = Object.values(cartItems || {}).map((val) => [typeDelivery[productList[val.name].packageSize]?.pt * val.qty, productList[val.name].packageSize.indexOf('cumbersome') !== -1]); // .reduce((a, b) => a + b);
  const totalPT = productsData.length > 0 ? productsData.reduce((a, b) => [a[0] + b[0], a[1] || b[1]]) : [0, false];
  const packageType = cal(totalPT[0], totalPT[1]);
  const deliveryPackSet = typeDelivery[packageType]?.countries.Switzerland.split(' ') || [];
  const deliveryCostInLocalCurrency = convert(deliveryPackSet[0], deliveryPackSet[1], localCurrency, currencyRates);

  const totalValue = total.length > 0 ? total.reduce((a, b) => a + b) : 0;

  const totalwhitCurrency = covertToCurrency(curentLanguage, localCurrency, totalValue);
  const totalCostDelivery = covertToCurrency(curentLanguage, localCurrency, deliveryCostInLocalCurrency);
  const totalCost = covertToCurrency(curentLanguage, localCurrency, totalValue + deliveryCostInLocalCurrency);

  const order = async () => {
    const login = !!profilInfo.registered;

    /*
      const dateNow = new Date().toLocaleDateString();
      const idBilling = `${dateNow.replaceAll('/', '')}_${Object.keys(billings).length}`;
      await dispatch({
        state: 'profilInfo',
        value: {
          billings: {
            ...billings,
            [idBilling]: {
              date: dateNow,
              idBilling,
              address: addresses[selectedDelivery].address,
              zipCode: addresses[selectedDelivery].zipCode,
              zipArea: addresses[selectedDelivery].zipArea,
              country: addresses[selectedDelivery].country,
              billingAddress: addresses[selectedBilling].address,
              billingZipCode: addresses[selectedBilling].zipCode,
              billingZipArea: addresses[selectedBilling].zipArea,
              billingCountry: addresses[selectedBilling].country,
              shippingCost: deliveryCostInLocalCurrency,
              shippingService: 'Suisse Post',
              packageSize: packageType,
              estimatedShippingDelay: (new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
              currency: localCurrency,
              products: [
                ...Object.values(cartItems).map((val, i) => ({
                  date: '02/02/2000',
                  price: Math.round((((productList[val.name]?.price * val.qty) / currencyRates[productList[val.name]?.currency]) * currencyRates[localCurrency]) * 100) / 100,
                  currency: localCurrency,
                  ...val,
                }))
              ],
            }
          }
        }
      });
      */
    await router.push({
      pathname: `/checkout/${login ? 'step3' : 'step1'}`,
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  return (
    <Div width="100%">
      <Div width={['100%', '100%', 'calc(100% - 30px)', 'calc(100% - 30px)', 'calc(100% - 30px)']} style={style.container}>

        <Div width="100%" style={style.container}>
          <Div width="100%" style={{ maxWidth: '900px' }}>

            <Div width="calc(100% - 40px)" horizontal="at" row>
              <p className={classes.titleNumber}>
                Order Summary
              </p>
              <p className={classes.number}>
                <span className={classes.total} />
              </p>
            </Div>
            <Div width="calc(100% - 40px)" horizontal="at" row>
              <p className={classes.number}>
                Subtotal:
              </p>
              <p className={classes.number}>
                <span className={classes.total}>
                  {totalwhitCurrency}
                </span>
              </p>
            </Div>
            <Div width="calc(100% - 40px)" horizontal="at" row style={{ paddingBottom: '10px', borderBottom: 'solid 1px grey' }}>
              <p className={classes.number}>
                Shipping:
              </p>
              <p className={classes.number}>
                <span className={classes.total}>
                  {totalCostDelivery}
                </span>
              </p>
            </Div>
            <Div width="calc(100% - 40px)" horizontal="at" row>
              <p className={classes.totalBold}>
                Total (TVA included):
              </p>
              <p className={classes.number}>
                <span className={classes.total}>
                  {totalCost}
                </span>
              </p>
            </Div>
            <Div height="12px" />

          </Div>
        </Div>

      </Div>

      <Div height="20px" />
      <Div width={['100%', '100%', 'calc(100% - 30px)', 'calc(100% - 30px)', 'calc(100% - 40px)']} style={{ background: 'white' }}>
        <Div width="calc(92%)" horizontal="left">
          <p className={classes.titleNumber}>
            Product summary
          </p>
        </Div>
        <Div height="10px" />
        <CartTable cartItems={cartItems} />
      </Div>

    </Div>
  );
}
