import React, { useEffect, useState } from 'react';
import { Div, redux } from 'components';
import { useRouter } from 'next/router';
import Table from './table';

const OrdersTables = React.memo(({ list }) => {
  const router = useRouter();

  const delRow = (data) => {

  };

  return (
    <Div width={['100%', '100%', '100%', 900, 1500]}>
      <Table list={[...list]} delRow={delRow} />
    </Div>
  );
}, (prev, next) => JSON.stringify(prev.list) === JSON.stringify(next.list));

export default OrdersTables;
