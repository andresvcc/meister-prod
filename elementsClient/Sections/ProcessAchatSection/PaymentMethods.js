import React, { useEffect, useState } from 'react';
// components
import { useRouter } from 'next/router';
import StripePay from 'elementsClient/Payement/StripePay';

import {
  redux, Div, hookDeviceInfo
} from 'components';
import Spam from '@/components/Typography/Spam';

import { typeDelivery } from '@/assets/dataBase/BDCategories';

const price = (localCurrency, productList, currencyRates, val) => {
  const a = (Math.round((((productList[val.name]?.price * val.qty) / currencyRates[productList[val.name]?.currency]) * currencyRates[localCurrency]) * 100) / 100);
  return a;
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

function PaymentMethods({ useSocketHook }) {
  // const device = hookDeviceInfo();
  const router = useRouter();
  const [emit, socket] = useSocketHook;
  const { width } = hookDeviceInfo();
  const [{
    profilInfo, currencyRates, productList, localCurrency, curentLanguage, dialogBag = 'false', tva
  }, dispatch] = redux();

  const {
    cartItems = {}, billings = {}, selectedDelivery, selectedBilling, addresses, email
  } = profilInfo;

  const total = Object.values(cartItems || {}).map((val) => {
    const priceProduct = price(localCurrency, productList, currencyRates, val);
    return priceProduct + (priceProduct * tva);
  });

  const productsData = Object.values(cartItems || {}).map((val) => [typeDelivery[productList[val.name].packageSize]?.pt * val.qty, productList[val.name].packageSize.indexOf('cumbersome') !== -1]); // .reduce((a, b) => a + b);
  const totalPT = productsData.length > 0 ? productsData.reduce((a, b) => [a[0] + b[0], a[1] || b[1]]) : [0, false];
  const packageType = cal(totalPT[0], totalPT[1]);
  const deliveryPackSet = typeDelivery[packageType]?.countries.Switzerland.split(' ') || [];
  const deliveryCostInLocalCurrency = convert(deliveryPackSet[0], deliveryPackSet[1], localCurrency, currencyRates);

  const totalValue = total.length > 0 ? total.reduce((a, b) => a + b) : 0;

  // const totalwhitCurrency = covertToCurrency(curentLanguage, localCurrency, totalValue);
  // const totalCostDelivery = covertToCurrency(curentLanguage, localCurrency, deliveryCostInLocalCurrency);
  const totalCostValue = (deliveryCostInLocalCurrency + totalValue);
  const totalCost = covertToCurrency(curentLanguage, localCurrency, (deliveryCostInLocalCurrency + totalValue));

  const dateNow = new Date().toLocaleDateString();
  const [idBilling, setIdBilling] = useState(`${dateNow.replaceAll('/', '')}_${Object.keys(billings).length}`);
  const [finPayment, setFinPayment] = useState(false);

  const billing = {
    Useremail: email,
    Totalamount: totalCostValue,
    currency: localCurrency,
    idBilling,
    amountButton: totalCost,
  };

  const ok = addresses[selectedDelivery] && addresses[selectedBilling];

  const successPayment = async (data) => {
    const value = {
      date: dateNow,
      idBilling,
      email,
      fname: addresses[selectedDelivery].fname,
      lname: addresses[selectedDelivery].lname,
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
      TVA: tva,
      estimatedShippingDelay: (new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      currency: localCurrency,
      payment: {
        payDate: new Date(),
        payCode: data.response.id,
        payService: 'Stripe',
        pay: data.response.amount,
        payment_method_types: data.response.payment_method_types,
        description: data.response.description,
        status: data.status,
        currency: data.status?.currency,
      },
      products: [
        ...Object.values(cartItems).map((val, i) => ({
          date: new Date(),
          price: Math.round((((productList[val.name]?.price * val.qty) / currencyRates[productList[val.name]?.currency]) * currencyRates[localCurrency]) * 100) / 100,
          currency: localCurrency,
          ...val,
        }))
      ],
    };

    await emit('checkout', { key: idBilling, value });
  };

  const action = (data) => {
    if (data.status === 'succeeded') {
      successPayment(data);
    }
  };

  useEffect(() => {
    if (profilInfo.billings[idBilling] && !finPayment) {
      setFinPayment(true);
      dispatch({ state: 'profilInfo', value: { cartItems: {} } });
      router.push({
        pathname: '/checkout/step4',
        query: { idBilling },
      });
    }
  }, [profilInfo.billings]);

  return (
    <Div width={['100%', '100%', '95%', '95%', '95%']} style={{ background: 'white' }}>

      <Div width="100%" height="50px" style={{ borderBottom: '1px solid #00000040', paddingTop: '3px' }}>
        <Div width="90%" horizontal="left" height="45px" row>
          {width < 400
            ? <Spam type="shipPayInfo_2">{'Payement '}</Spam>
            : <Spam type="shipPayInfo">{'Payement '}</Spam>}
        </Div>
      </Div>

      <Div width="100%">
        <StripePay billing={billing} action={action} ok={ok} />
      </Div>
    </Div>

  );
}

export default PaymentMethods;

/*
05 Mai 2021: Je enlève le ID billing pour l'instant car à discuter
Code supprimé ICI
          {width < 400
            ? <Spam type="shipPayInfo_2">{`Payement ${idBilling}`}</Spam>
            : <Spam type="shipPayInfo">{`Payement ${idBilling}`}</Spam>}
*/
