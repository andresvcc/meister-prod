import React, { useEffect, useState } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import BillingTableGenerator from './tableElements/billingTableGenerators';

const OrdersTables = React.memo(({ billing, users }) => (
  <div
    style={{
      width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center', flexDirection: 'column'
    }}
  >
    <div
      style={{
        width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center',
      }}
    >
      <h3>Billing</h3>
    </div>
    <br />
    <div
      style={{
        width: '100%', display: 'flex', justifyContent: 'center', justifyItems: 'center',
      }}
    >
      <Div width={['calc(100% - 20px)', 'calc(100% - 50px)', 650, 900, 900]}>
        <Div width={['calc(100% - 20px)', 'calc(100% - 50px)', 700, 900, 900]} vertical="top">
          <BillingTableGenerator billing={billing} users={users} />
        </Div>
      </Div>
    </div>
  </div>
));

const OrdersTablesMemo = () => {
  const [{ billing, users }] = redux();

  return (
    <OrdersTables billing={billing} users={users} />
  );
};

export default OrdersTablesMemo;
