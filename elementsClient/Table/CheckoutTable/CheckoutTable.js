/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Div, redux } from 'components';
import { useRouter } from 'next/router';
import Table from './table';

const OrdersTables = React.memo(({ cartItems, delToBag, addQTY, restQTY }) => {
  const router = useRouter();
  const cartItemArr = Object.keys(cartItems).map((val, i) => ({
    key: val,
    i,
    ...cartItems[val]
  }));

  if (cartItemArr.length <= 0) {
    return (
      <Div height="50px" width="92%" style={{ fontFamily: 'GeorgiaLight', fontSize: '16px' }} horizontal="left">
        Payment is being processed...
      </Div>
    );
  }

  return (
    <Table
      cartItemArr={cartItemArr}
      delToBag={delToBag}
      addQTY={addQTY}
      restQTY={restQTY}
    />
  );
}, (propPred, propNext) => propPred.cartItems === propNext.cartItems);

export default OrdersTables;
