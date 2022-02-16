import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
// components
import { Div, redux } from 'components';
// layout
// element
import PaymentMethod from 'elementsClient/Sections/ProcessAchatSection/PaymentMethods';
import ShippingDetails from 'elementsClient/Sections/ProcessAchatSection/ShippingDetail';
import BillingDetails from 'elementsClient/Sections/ProcessAchatSection/BillingDetail';
import JustTotal from 'elementsClient/Sections/SummarySection2/justTotals';
import Logo from 'elementsClient/Sections/ProcessAchatSection/Logo';
import Layout from '@/layouts/DefaultCheckout';
import Spam from '@/components/Typography/Spam';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';

function Page(props) {
  const { user, useSocketHook, ...rest } = props;
  // const [emit, socket] = useSocketHook;

  return (
    <Div width="100%" style={{ background: '#F1EFEA' }} vertical="top">
      <Div width={['100%', '100%', 'calc(100% - 40px)', 'calc(100% - 40px)', 'calc(100% - 40px)']} vertical="top">
        <Div width="100%" height="20px" />
        <Div width={['100%', '100%', 'calc(100% - 20px)', 'calc(100% - 50px)', 'calc(100% - 100px)']}>
          <GridContainer spacing={0}>
            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div width="100%" style={{ paddingTop: '10px', paddingBottom: '20px' }}>
                <Div width="200px">
                  <Logo />
                </Div>
              </Div>
            </GridItem>

            <GridItem num={[12, 12, 6, 7, 7]}>
              <Div width="100%">
                <Div horizontal="left" height="50px" width="94%" style={{ paddingBottom: '11px' }}>
                  <Spam type="shipPay">
                    Shipping and Payment
                  </Spam>
                </Div>
                <Div width="100%">
                  <ShippingDetails />
                </Div>
                <Div width="100%" style={{ paddingTop: '20px' }}>
                  <BillingDetails />
                </Div>
                <Div width="100%" style={{ paddingTop: '20px' }}>
                  <PaymentMethod useSocketHook={useSocketHook} />
                </Div>
                <Div height={['20px', '20px', '80px', '80px', '80px']} />
              </Div>
            </GridItem>
            <GridItem num={[12, 12, 6, 5, 5]}>
              <Div width="100%">
                <Div height={[0, 0, '50px', '50px', '50px']} />
                <JustTotal />
                <Div height="100px" />
              </Div>
            </GridItem>
          </GridContainer>
        </Div>
      </Div>
    </Div>
  );
}

function Step3(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);

  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default Step3;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
