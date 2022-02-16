import React from 'react';
// components
import { redux } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// elements
import NumberCard_1 from '@/elementAdmin/NumberCard/NumberCard_1';
import NumberCard_2 from '@/elementAdmin/NumberCard/NumberCard_2';
import NumberCard_3 from '@/elementAdmin/NumberCard/NumberCard_3';

function NumberCards() {
    const [{ dsa }] = redux();
    const {
        numberSession, pagesViewed, sessionDuration, meanUserAge
} = dsa[2];
    return (
      <GridContainer spacing={3}>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_1 data={numberSession} title="Number of sessions" subTitle="Last 7 days" />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_2 data={pagesViewed} title="Pages viewed" subTitle="Last 7 days" />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_3 data={sessionDuration} title="Session duration" subTitle="In minutes" />
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <NumberCard_3 data={meanUserAge} title="Mean user age" subTitle="Just Updated" />
        </GridItem>
      </GridContainer>
 );
}

export default NumberCards;
