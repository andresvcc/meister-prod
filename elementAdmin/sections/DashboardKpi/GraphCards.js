import React from 'react';
// components
import { redux } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// elements
// import BarChartCard1 from '@/elementAdmin/GraphCard/BarChartCard_1';
// import BarChartCard2 from '@/elementAdmin/GraphCard/BarChartCard_2';

function BarChartCards() {
  const [{ dsa }] = redux();
  const { newUserAccountMonthly, newOrdersMonthly, connectedUsersToday } = dsa[0];
  return (
    <GridContainer spacing={3}>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        ICI grapic statistic
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        ICI grapic statistic
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={3}>
        ICI grapic statistic
      </GridItem>
    </GridContainer>
  );
}
export default BarChartCards;
