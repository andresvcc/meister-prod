import React from 'react';
// components
import { redux } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// elements
import BarChartCard_1 from '@/elementAdmin/GraphCard/BarChartCard_1';


function GraphCardsTraffics() {
    const [{ dsa }] = redux();
    const { trafficSource, browserSource, osSource } = dsa[2];
    return (
      <GridContainer spacing={3}>
        <GridItem xs={12} sm={4} md={4} lg={6}>
          <BarChartCard_1 data={trafficSource} title="Principal source of traffic" />
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={6}>
          <BarChartCard_1 data={browserSource} title="Principal web browser by visit" />
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={6}>
          <BarChartCard_1 data={osSource} title="Principal source by OS" />
        </GridItem>
      </GridContainer>
 );
}
export default GraphCardsTraffics;
