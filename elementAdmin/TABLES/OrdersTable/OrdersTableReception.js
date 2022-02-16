import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
//
import Update from './refreshData';
//
import Table from '@/components/Table/Table';

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import useHookOrdersGenerator from './tableElements/useHookOrdersGeneratorReception';

const useStyles = makeStyles(styles);

const OrdersTables = React.memo(({ orders, useSocketHook }) => {
  const [reload, setReload] = useState(false);
  const classes = useStyles();

  if (reload) {
    return (
      <Div width="100%" height="450px">
        Reload data...
      </Div>
    );
  }

  return (
    <Div width="100%">
      <Div width={['calc(100% - 20px)', 'calc(100% - 20px)', 'calc(100% - 20px)', 900, 1200]} style={{ minHeight: '75vh' }} vertical="top">
        <h2>Reception</h2>
        <Table
          tableShopping
          tableHeaderColor="primary"
          tableHead={['ID', 'Customer', 'Informations', 'total', 'Pay', <Update useSocketHook={useSocketHook} setReload={setReload} />]}
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

//

const OrdersTablesMemo = ({ useSocketHook }) => {
  const [orders] = useHookOrdersGenerator({ useSocketHook });

  return (
    <>
      <OrdersTables orders={orders} useSocketHook={useSocketHook} />
    </>
  );
};

export default OrdersTablesMemo;
