import React, { useEffect, useState } from 'react';
import { Div, redux } from 'components';
import dynamic from 'next/dynamic';
import SubTable from '@/components/MaterialTable/subTable';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import { useRouter } from 'next/router';
import config from './HeaderTable';

const Table = dynamic(
  () => import('@/components/MaterialTable/table'),
  { loading: () => <Div width="100%" height="50vh">...Loading</Div>, ssr: false }
);

const OrdersTables = React.memo(({ list, delRow, onVisibility }) => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const addRow = (data) => {
    router.push({
      pathname: '/admin/addProduct/',
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const editRow = (data) => {
    router.push({
      pathname: `/admin/editProduct/${data.product}`,
      query: { productName: data.product }
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  useEffect(() => {
    setProducts(list);
  }, [list]);

  return (
    <Table
      data={{
        action: config.action,
        columns: config.columns,
        detailPanel: config.detailPanel,
        data: products
      }}
      onAddRow={addRow}
      onEditRow={editRow}
      onDelRow={delRow}
      onVisibility={onVisibility}
    />

  );
}, (propPred, propNext) => propPred.list === propNext.list);


export default OrdersTables;
