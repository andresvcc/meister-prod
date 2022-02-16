import React from 'react';
// components
import { redux } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// elements
import NumberCard_1 from '@/elementAdmin/NumberCard/NumberCard_1';
import NumberCard_2 from '@/elementAdmin/NumberCard/NumberCard_2';
import NumberCard_3 from '@/elementAdmin/NumberCard/NumberCard_3';
import NumberCard_4 from '@/elementAdmin/NumberCard/NumberCard_4';

function NumberCards() {
    const [{ dsa }] = redux();
    const {
 newUserAccount, lastRevenue, lastOrders, connectedUsers
} = dsa[0];
    return (
      <GridContainer spacing={3}>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_1 data={newUserAccount} title="New User Account" subTitle="Last 7 days" />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_2 data={connectedUsers} title="Num. of users connected" subTitle="Just Updated" />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_3 data={lastOrders} title="Latest orders" subTitle="Last 24 Hours" />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_4 data={lastRevenue} title="Revenue" subTitle="Last 24 Hours" />
        </GridItem>
      </GridContainer>
 );
}

export default NumberCards;
