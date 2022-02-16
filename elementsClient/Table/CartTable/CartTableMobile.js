/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Div, redux } from 'components';
import { useRouter } from 'next/router';
import Table from './tableMobile2';

const OrdersTables = React.memo(({ cartItems, delToBag, addQTY, restQTY }) => {
  const router = useRouter();
  const cartItemArr = Object.keys(cartItems).map((val, i) => ({
    key: val,
    i,
    ...cartItems[val]
  }));

  if (cartItemArr.length <= 0) {
    return (
      <Div height="65vh">
        <Div height="70px" style={{ fontFamily: 'serif', fontSize: '22px' }}>
          Your Shopping Cart Is Empty
        </Div>
      </Div>
    );
  }

  return (
    <Table cartItemArr={cartItemArr} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />
  );
}, (propPred, propNext) => propPred.cartItems === propNext.cartItems);

export default OrdersTables;
