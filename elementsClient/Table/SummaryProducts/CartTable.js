// pour le Summary: Table et Table mobile
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Div, redux, hookDeviceInfo } from 'components';
import { useRouter } from 'next/router';
import TableMobile from 'elementsClient/Table/CartTable/tableMobile';
import Table from './table';

const OrdersTables = React.memo(({ cartItems, delToBag, addQTY, restQTY }) => {
  const router = useRouter();
  const { width } = hookDeviceInfo();

  const cartItemArr = Object.keys(cartItems).map((val, i) => ({
    key: val,
    i,
    ...cartItems[val]
  }));

  if (cartItemArr.length <= 0) {
    return (
      <Div width="95%" style={{ fontFamily: 'GeorgiaLight', fontSize: '16px' }} horizontal="left">
        The cart is empty
      </Div>
    );
  }

  return (
    <Div width="100%">

      {width > 600
        ? <Table cartItemArr={cartItemArr} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />
        : <TableMobile cartItemArr={cartItemArr} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />}
    </Div>
  );
}, (propPred, propNext) => propPred.cartItems === propNext.cartItems);

export default OrdersTables;
