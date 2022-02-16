import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';

function ConfirmationBox(props) {
  const [{ profilInfo, products }, dispatch] = redux();
  const { cartItems = {} } = profilInfo;
  const bagListKey = Object.keys(cartItems);
  const subTotal = bagListKey.map((val) => products[cartItems[val].id].prix * cartItems[val].qty).reduce((a, b) => a + b, 0);
  const router = useRouter();
  const {
    title, fname, lname, address, zipCode, city, country
  } = props;

  const goTo = () => {
    router.push({
      pathname: '/checkout/step2',
    }).then(() => window.scrollTo(0, 0));
  };

  return (
    <Div width="95%" height="100%" style={{ background: 'white' }}>

      <Div width="90%" horizontal="at" row style={{ borderBottom: '1px solid #00000030' }}>
        <Div width="45%">
          <Spam type="serifDescription">{title}</Spam>
        </Div>
        <Div width="45%" onClick={() => goTo()}>
          <Spam type="serifDescription">Edit</Spam>
        </Div>
      </Div>

      <Div width="90%">

        <Div width="90%" horizontal="left">
          <Spam type="serifDescription">
            {fname}
            {' '}
            {lname}
          </Spam>
        </Div>

        <Div width="90%" horizontal="left">
          <Spam type="serifDescription">{address}</Spam>
        </Div>

        <Div width="90%" horizontal="left">
          <Spam type="serifDescription">
            {zipCode}
            {', '}
            {city}
            {', '}
            {country}
          </Spam>
        </Div>

      </Div>

    </Div>

  );
}
export default ConfirmationBox;
