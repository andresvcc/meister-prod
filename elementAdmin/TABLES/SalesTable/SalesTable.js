import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@/components/Table/Table';

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import useHookOrdersGenerator from './tableElements/useHookOrdersGenerator';

const useStyles = makeStyles(styles);


const OrdersTables = React.memo(({ orders }) => {
  const classes = useStyles();

  return (
    <Div width="100%">
      <Div width={['calc(100% - 20px)', 'calc(100% - 20px)', 'calc(100% - 20px)', 900, 1200]} style={{ minHeight: '75vh' }} vertical="top">
        <h3>Orders</h3>
        <Table
          tableShopping
          tableHeaderColor="primary"
          tableHead={['ID', 'Customer', 'email', 'total', 'Order Date', 'status', '']}
          tableData={orders}
          customCellClasses={[
            classes.centerID,
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.right,
          ]}
          // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
          customClassesForCells={[0, 1, 2, 3, 4, 5, 6]}
          customHeadCellClasses={[
            classes.centerID,
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.right,
          ]}
          customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6]}
        />
      </Div>
    </Div>
  );
});

const OrdersTablesMemo = () => {
  const [orders] = useHookOrdersGenerator();

  return (
    <OrdersTables orders={orders} />
  );
};

export default OrdersTablesMemo;
