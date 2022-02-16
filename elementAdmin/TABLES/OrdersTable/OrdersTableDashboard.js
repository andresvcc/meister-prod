import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@/components/Table/Table';

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import useHookOrdersGenerator from './tableElements/useHookOrdersGeneratorDashboard';

const useStyles = makeStyles(styles);

const OrdersTables = React.memo(({ orders }) => {
  const classes = useStyles();
  //  // ICI

  return (
    <Div width="100%" style={{ borderRadius: '15px', backgroundColor: '#3b9ea780' }}>
      <Div width="100%" vertical="top">
        <Div width="90%" horizontal="left" style={{ fontSize: '18px', textTransform: 'capitalize', color: '#18374C' }}>Last orders</Div>
        <Table
          tableShopping
          tableHeaderColor="primary"
          tableHead={['Date', 'ID', 'Name', 'Price']}
          tableData={orders}
          customCellClasses={[
            classes.centerDashboard,
            classes.centerID,
            classes.centerDashboard,
            classes.centerDashboard,
            classes.centerDashboard,
          ]}
          // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
          customClassesForCells={[0, 1, 2, 3, 4]}
          customHeadCellClasses={[
            classes.centerID,
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.center,
            classes.right,

          ]}
          customHeadClassesForCells={[0, 1, 2, 3, 4]}
        />
      </Div>
    </Div>
  );
});

const OrdersTablesMemo = ({ useSocketHook }) => {
  const [orders] = useHookOrdersGenerator({ useSocketHook });

  return (
    <>
      <OrdersTables orders={orders} useSocketHook={useSocketHook} />
    </>
  );
};

export default OrdersTablesMemo;
