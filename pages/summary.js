import React, { useEffect, useMemo } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
// components
import { Div, redux, hookDeviceInfo } from 'components';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head';
import Layout from '@/layouts/Default2';
// elements
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import OrderSection from '@/elementsClient/Sections/SummarySection2/OrderSection';
import PriceSection from '@/elementsClient/Sections/SummarySection2/TotalSection';
// import PriceSection from '@/elementsClient/Sections/SummarySection/PriceSection';

const TitleMyBag = ({ cartItemsLength, width }) => (
  <Grid
    container
    // direction="row"
    // justify="flex-start"
    // alignItems="left"
    style={{ width: width < 450 ? 'calc(100%)' : 'calc(100% - 50px)', paddingLeft: width < 450 ? '20px' : '0px', marginBottom: '10px', }}
  >
    <Div style={{ fontFamily: 'GorgiaBold', fontSize: '20px' }}>
      {cartItemsLength > 1
        ? (
          <Div>
            {`My Cart (${cartItemsLength} articles)`}
          </Div>
        ) : (
          <Div>
            {`My Cart (${cartItemsLength} article)`}
          </Div>
        )}
    </Div>
  </Grid>
);

function Page(props) {
  const {
    user, useSocketHook, step, ...rest
  } = props;

  const [emit, socket] = useSocketHook;
  const [{ profilInfo, products }, dispatch] = redux();
  const { cartItems = {} } = profilInfo;
  const { width } = hookDeviceInfo();
  const router = useRouter();

  // const bagListKey = Object.keys(cartItems);
  // const subTotal = bagListKey.map((val) => products[cartItems[val].id].prix * cartItems[val].qty).reduce((a, b) => a + b, 0);

  // useEffect(() => {

  const cartItemsLength = Object.values(cartItems || {}).length;

  const marginInside = useMemo(() => {
    if (width < 600) return { marginLeft: '0px', marginRight: '0px' };
    return { marginLeft: '25px', marginRight: '25px' };
  }, [width]);

  const marginLeftInside = useMemo(() => {
    if (width < 600) return { marginLeft: '0px', marginRight: '0px' };
    if (width < 960) return { marginLeft: '25px', marginRight: '25px' };
    return { marginLeft: '0px', marginRight: '25px' };
  }, [width]);

  return (
    <Div width="100%">
      <Div height={['50px', '120px', '120px', '120px', '120px']} />
      <Div width="100%" vertical="top" style={{ paddingTop: '30px', background: '#F1EFEA' }}>
        <GridContainer>
          <GridItem num={[12, 12, 12, 12, 12]}>
            <TitleMyBag cartItemsLength={cartItemsLength} width={width} />
          </GridItem>
          <GridItem num={[12, 12, 8, 8, 8]}>
            <OrderSection marginInside={marginInside} />
          </GridItem>
          <GridItem num={[12, 12, 4, 4, 4]}>
            <PriceSection marginLeftInside={marginLeftInside} />
          </GridItem>
        </GridContainer>
        <Div height="80px" />
      </Div>
    </Div>
  );
}

function SummaryCart(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  const [{ profilInfo }] = redux();

  // useEffect(() => {

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>Order Summary</title>
      </Head>
      <Layout useSocketHook={useSocketHook}>
        <Page user={user} useSocketHook={useSocketHook} {...rest} />
      </Layout>
    </>

  );
}

export default SummaryCart;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
