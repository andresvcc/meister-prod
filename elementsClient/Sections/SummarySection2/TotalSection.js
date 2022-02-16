// Summary
import React, {
  useState,
} from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import {
  redux, Div, FlexDiv, hookDeviceInfo
} from 'components';
import CouponForm from 'elementsClient/Forms/Coupon';
import {
  grayColor, blackColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

import Button from '@/components/CustomButtons/Button';
import { typeDelivery } from '@/assets/dataBase/BDCategories';
import CustomOptions from '@/components/CustomInput/CustomOptions';

const useStyles = makeStyles({
  number: {
    marginTop: '10px',
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '15px',
    color: blackColor
  },
  number2: {
    marginTop: '10px',
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: '13px',
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
  total: {
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: '300',
    color: grayColor[2]
  },
  totalBold: {
    fontSize: '0.8em',
    marginTop: '10px',
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: 'bold',
    color: blackColor
  },
  couponFont: {
    fontSize: '0.8em',
    marginTop: '10px',
    textAlign: 'right',
    minWidth: '80px',
    color: blackColor
  },
  btOrder: {
    width: '88%',
    height: '45px',
    marginBottom: '20px',
    textTransform: 'uppercase',
    fontFamily: 'GorgiaBold',
    fontSize: '13px',
    fontWeight: 'bold',
  },
});

const style = {
  container: {
    background: 'white',
  }
};

const price = (localCurrency, productList, currencyRates, tva, val) => {
  const product = productList[val?.name];

  const reg = /[(](\d+(\.\d)*)[)]/g;
  const reg2 = /[(]*[)]*(null)*/g;

  const priceOption1 = val.opt1;
  const so1 = [...new Set(product?.selectableOptions1?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
  const so1A = parseInt(so1[priceOption1] || '0', 10) || 0;

  const priceOption2 = val.opt2;
  const so2 = [...new Set(product?.selectableOptions2?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
  const so2A = parseInt(so2[priceOption2] || '0', 10) || 0;

  const priceOption3 = val.opt3;
  const so3 = [...new Set(product?.selectableOptions3?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
  const so3A = parseInt(so3[priceOption3] || '0', 10) || 0;

  const finalPrice = (Math.round(((((parseInt(product?.price, 10) + so1A + so2A + so3A) * val.qty) / currencyRates[product?.currency]) * currencyRates[localCurrency]) * 100) / 100);

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
  const { color, marginLeftInside } = props;
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

  const LinkTo = (props) => {
    const { link, children } = props;
    const [hover, setHover] = useState(false);
    return (
      <span
        type="link2"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: 'pointer', color: hover ? 'black' : null, textDecoration: hover ? 'underline' : null,
        }}
      >
        <Link href={link} passHref>
          <span>{children}</span>
        </Link>
      </span>
    );
  };

  const [coupon, setCoupon] = useState(false);

  const withCoupon = () => {
    setCoupon(!coupon);
  };

  return (
    <Div width="100%" style={{ ...marginLeftInside }}>

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
          <Div height="10px" />

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
          <Div width="calc(100% - 40px)" onClick={() => withCoupon()} horizontal="left">
            <p className={classes.couponFont}>
              Apply a coupon
              {' '}
            </p>
          </Div>
          {
            coupon ? (
              <Div width="100%" height="100%">
                <CouponForm language="EN" />
              </Div>
            ) : <Div />
          }

          <Div height="15px" />
          <Div width="104%">
            <Button
              color="primary"
              disabled={total.length <= 0}
              className={classes.btOrder}
              onClick={order}
            >
              CHECKOUT
            </Button>
          </Div>
          <Div width="100%" height="35px">
            <Button
              color="primary"
              disabled={total.length <= 0}
              className={classes.btOrder}
              onClick={() => router.push('/')}
              link
            >
              CONTINUE SHOPPING
            </Button>
          </Div>
        </Div>

      </Div>
      <Div height={15} />
      <Div width="100%" style={style.container}>
        <Div width="100%" style={{ maxWidth: '900px' }}>
          <Div width="calc(100% - 40px)" horizontal="left" row>
            <p className={classes.totalBold}>
              Need assistance?
            </p>
            <div style={{ width: '5px', height: '5px' }} />
            <p className={classes.number2} />
          </Div>
          <Div width="calc(100% - 40px)" horizontal="left" row>
            <p className={classes.number2}>
              Call us on:
            </p>
            <div style={{ width: '5px', height: '5px' }} />
            <p className={classes.number2}>
              <LinkTo link="tel:+41 (0)79 336 61 29">+41 (0)79 336 61 29</LinkTo>
            </p>
          </Div>

          <Div width="calc(100% - 40px)" horizontal="left" row>
            <p className={classes.number2}>
              Email:
            </p>
            <div style={{ width: '5px', height: '5px' }} />
            <p className={classes.number2}>
              <LinkTo link="mailto: moto@meister-engineering.com">moto@meister-engineering.com</LinkTo>
            </p>
          </Div>
          <Div height="10px" />

        </Div>

      </Div>

    </Div>
  );
}
