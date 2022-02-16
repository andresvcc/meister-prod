import React from 'react';
import nextCookies from 'next-cookies';
import { useRouter } from 'next/router';
import useSocket from 'useSocket';
import Image from 'next/image';
// components
import { Div } from 'components';
import AddAddress from 'elementsClient/Sections/ProcessAchatSection/NewAddressPrimary';
import PriceSection2 from 'elementsClient/Sections/SummarySection/PriceSectionPlus';
import OrdersMap2 from 'elementsClient/Sections/SummarySection/OrdersMapPlus';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// layout
import Layout from '@/layouts/DefaultCheckout';
// elements section

import image from '@/assets/img/logoMeister.png';

function Page(props) {
  const { user, useSocketHook, ...rest } = props;
  const [emit, socket] = useSocketHook;
  const router = useRouter();

  return (
    <Div width="100%" style={{ minHeight: '835px', background: '#F1EFEA' }} vertical="top">
      <Div width="100%" height="20px" />

      <Div width="100%" vertical="top">

        <GridContainer>

          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div width="100%" horizontal="left" row style={{ paddingTop: '10px' }}>
              <Div width="15%">
                <Image src={image} alt="..." height="90px" width="140px" />
              </Div>
              <Div width="15%">
                <Spam type="serifTitleBold">
                  1. Shipping
                </Spam>
              </Div>
              <Div width="15%" onClick={() => router.push('/checkout/step3')}>
                <Spam type="serifTitle">
                  2. Payment
                </Spam>
              </Div>
            </Div>
          </GridItem>

          <GridItem num={[7, 7, 7, 7, 7]}>
            <Div width="100%" style={{ paddingTop: '40px' }}>
              <Div width="100%">
                <AddAddress />
              </Div>
            </Div>
          </GridItem>

          <GridItem num={[5, 5, 5, 5, 5]}>
            <Div width="100%" style={{ paddingTop: '10px' }}>
              <OrdersMap2 />
              <PriceSection2 />
            </Div>
          </GridItem>

        </GridContainer>
      </Div>
      <Div height="50px" />
    </Div>
  );
}

function Step2(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default Step2;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
