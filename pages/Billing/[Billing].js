import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { redux, Div, hookDeviceInfo } from 'components';
import useSocket from 'useSocket';
import nextCookies from 'next-cookies';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Body from '@/components/Body/Body';
import Layout from '@/layouts/Default2';
import BillingSectionCards from '@/elementsClient/Sections/ProfilSection/BillingSectionCards';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
import Button from '@/components/CustomButtons/Button';
import Popover from '@/components/Popover/Popover';

function Page(props) {
  const { user, useSocketHook, ...rest } = props;
  const [emit, socket] = useSocketHook;
  const [{ profilInfo }] = redux();
  const { billings = {}, registered = 0, orders = {} } = profilInfo;
  const router = useRouter();
  const { width } = hookDeviceInfo();
  const [radio, setRadio] = useState(false);
  const [evaluate, setEvaluate] = useState(false);
  const idOrder = router.query.Billing;
  const billingsData = React.useMemo(() => billings[idOrder], [billings]);

  const [billingData, setBillingData] = useState({});
  const [userIsue, setUserIsuse] = useState('desition');

  const sendData = () => {
    emit('setReturn', {
      userIsue,
      products: billingData,
      idBilling: billingsData.idBilling
    });
    setRadio(false);
    setBillingData({});
  };

  const setEvaluationProduct = (evaluation) => {
    emit('setEvaluation', evaluation);
  };

  // Pour le retour ==> confirm, mettre ce onclick
  //  onClick={sendData}

  // Ajouter useEffect pour sauvegarder les informations du billing lors d'un refresh

  const confirmReturn = () => {
    setUserIsuse('return');
    setRadio(!radio);
  };

  const confirmReturnEmit = () => {
    sendData();
  };

  const confirmRefund = () => {
    setUserIsuse('refund');
    setRadio(!radio);
  };

  const confirmSupport = () => {

  };

  const options = {
    default: {
      'Contact support': confirmSupport
    },
    reception: {
      'Contact support': confirmSupport
    },
    treatment: {
      'Contact support': confirmSupport
    },
    delivered: {
      'Request a refund': confirmRefund,
      'Request a return': confirmReturn,
      'Contact support': confirmSupport
    },
    completed: {
      'Request a return': confirmReturn,
      'Contact support': confirmSupport
    },
    reportered: {
      'Contact support': confirmSupport
    },
    all: {
      'Request a refund': confirmRefund,
      'Request a return': confirmReturn,
      'Contact support': confirmSupport
    }
  };

  const select = (val) => {
    options.all[val]();
  };

  useEffect(() => {
    if (registered !== 0 && registered !== undefined && profilInfo.init === undefined && registered === false) {
      router.push('/login');
    }
  }, [billingsData, registered]);

  if (!billingsData && registered === true) {
    return (
      <Div width="100vw" height="100vh">
        <p>billingsData id not found</p>
      </Div>
    );
  }

  return (
    <Div width="95%" style={{ minHeight: '75vh', paddingTop: width < 400 ? '80px' : '120px', paddingBottom: '150px' }} vertical="top">
      <Div
        width={['97%', '99%', '99%', '99%', '99%']}
        horizontal="left"
        height="50px"
        onClick={() => router.push('/userProfil')}
      >
        <Div style={{
          fontFamily: 'NovaLight',
          fontSize: '18x',
          color: 'black',
          textTransform: 'capitalize',
          cursor: 'pointer',
        }}
        >
          Back
        </Div>
      </Div>

      <GridContainer spacing={0}>
        <GridItem num={[8, 6, 6, 6, 6, 6]}>
          <Div width="95%%" horizontal="left" style={{ paddingLeft: '5px' }}>
            <Spam type="BillingNum">
              {`Order Number ${billingsData && billingsData.idBilling && billingsData.idBilling}`}
            </Spam>
            <Spam type="BillingNumInfo">
              {`Order status: ${orders[billingsData?.idBilling]?.status ?? 'Processing'}`}
            </Spam>
            <Spam type="BillingNumInfo">
              {`Date of order: ${billingsData && billingsData.date && billingsData.date}`}
            </Spam>
            <Spam type="BillingNumInfo">
              {`Pay: ${billingsData?.currency} ${billingsData?.payment?.pay}`}
            </Spam>
            <Div height="40px" />
          </Div>
        </GridItem>

        <GridItem num={[5, 6, 6, 6, 6, 6]}>
          <Div width="100%" horizontal="right">
            {
              orders[billingsData?.idBilling]?.status === 'reception' ? (
                <>
                  <Popover
                    title="Report an issue"
                    options={Object.keys(options[orders[billingsData?.idBilling]?.status || 'default'])}
                    select={select}
                  />
                </>
              ) : null
            }

            {
              orders[billingsData?.idBilling]?.status === 'treatment' ? (
                <>
                  <Popover
                    title="Report an issue"
                    options={Object.keys(options[orders[billingsData?.idBilling]?.status || 'default'])}
                    select={select}
                  />
                </>
              ) : null
            }

            {
              orders[billingsData?.idBilling]?.status === 'delivered' ? (
                radio ? (
                  <Div>
                    <Button color="primary" onClick={confirmReturnEmit} fullWidth>Confirm</Button>
                    <Button color="primary" onClick={() => setRadio(false)} fullWidth>Cancel</Button>
                  </Div>
                ) : evaluate ? (
                  <Div width="160px">
                    <Button color="primary" link onClick={() => setEvaluate(false)} fullWidth>Cancel</Button>
                  </Div>
                ) : (
                  <>
                    <Div width="160px">
                      <Button color="primary" onClick={() => setEvaluate(true)} fullWidth>Evaluate products</Button>
                    </Div>
                    <Popover
                      title="Report an issue"
                      options={Object.keys(options[orders[billingsData?.idBilling]?.status || 'default'])}
                      select={select}
                    />
                  </>
                )
              ) : null
            }

            {
              orders[billingsData?.idBilling]?.status === 'completed' ? (
                radio ? (
                  <Div>
                    <Button color="primary" onClick={confirmReturnEmit} fullWidth>Confirm</Button>
                    <Button color="primary" onClick={() => setRadio(false)} fullWidth>Cancel</Button>
                  </Div>
                ) : evaluate ? (
                  <Div width="160px">
                    <Button color="primary" link onClick={() => setEvaluate(false)} fullWidth>Cancel</Button>
                  </Div>
                ) : (
                  <>
                    <Popover
                      title="Report an issue"
                      options={Object.keys(options[orders[billingsData?.idBilling]?.status || 'default'])}
                      select={select}
                    />
                  </>
                )
              ) : null
            }

            {
              orders[billingsData?.idBilling]?.status === 'reportered' ? (
                <>
                  <Popover
                    title="Report an issue"
                    options={Object.keys(options[orders[billingsData?.idBilling]?.status || 'default'])}
                    select={select}
                  />
                </>
              ) : null
            }

          </Div>
        </GridItem>

      </GridContainer>

      <Div width="100%">
        {
          billingsData && billingsData.products && billingsData.products.map((val, i) => (
            <Div key={`${i + 1}`} width="100%" horizontal="left">
              <BillingSectionCards userIsue={userIsue} setEvaluationProduct={setEvaluationProduct} order={orders[billingsData?.idBilling]} billingData={billingData} billingsData={billingsData} setBillingData={setBillingData} radio={radio} evaluate={evaluate} product={val} i={i} TVA={billingsData.TVA} />
            </Div>
          ))
        }
      </Div>

      <Div width="100%">

        <Div style={{ borderTop: '1px solid grey' }} height="40px" width="100%" />

        <GridContainer spacing={0}>

          <GridItem num={[6, 4, 4, 4, 4]}>
            <Div width="100%" horizontal="left">
              <Spam type="BillingNum">Total</Spam>
            </Div>
          </GridItem>

          <GridItem num={[6, 4, 4, 4, 4]}>
            <Div width="100%" horizontal="right">
              <Div horizontal="left" width="100%">
                <Spam type="BillingNumInfo">
                  <span>
                    TVA
                  </span>
                  <span style={{ fontWeight: 'bolder' }}>
                    {` ( ${billingsData?.TVA * 100}% ) : `}
                  </span>
                  {`${billingsData?.currency} ${parseFloat(billingsData?.products?.map((val, i) => val.price * billingsData.TVA).reduce((a, b) => a + b), 10).toFixed(2)}`}
                </Spam>
                <Spam type="BillingNumInfo">
                  {`Subtotal (Without TVA): ${billingsData?.currency} ${parseFloat(billingsData?.products?.map((val, i) => val.price).reduce((a, b) => a + b), 10).toFixed(2)}`}
                </Spam>
                <Spam type="BillingNumInfo">
                  {`Subtotal (TVA included): ${billingsData?.currency} ${parseFloat(billingsData?.products?.map((val, i) => val.price + (val.price * billingsData.TVA)).reduce((a, b) => a + b), 10).toFixed(2)}`}
                </Spam>
                <Spam type="BillingNumInfo">
                  {`Shipping: ${billingsData?.currency} ${parseFloat(billingsData?.shippingCost, 10).toFixed(2)}`}
                </Spam>
                <Spam type="BillingNumInfo" style={{ fontWeight: 'bolder' }}>
                  {`Total (TVA included): ${billingsData?.currency} ${(parseFloat(billingsData?.products.map((val, i) => val.price + (val.price * billingsData.TVA)).reduce((a, b) => a + b), 10) + parseFloat(billingsData?.shippingCost, 10)).toFixed(2)}`}
                </Spam>
              </Div>
            </Div>
          </GridItem>
        </GridContainer>

      </Div>

      <Div height="30px" />

      <Div width="100%">

        <Div style={{ borderTop: '1px solid grey' }} height="40px" width="100%" />

        <GridContainer spacing={0}>

          <GridItem num={[6, 4, 4, 4, 4]}>
            <Div width="100%" horizontal="left">
              <Spam type="BillingNum">Shipping</Spam>
            </Div>
          </GridItem>

          <GridItem num={[6, 4, 4, 4, 4]}>
            <Div width="100%" horizontal="right">
              <Div horizontal="left" width="100%">
                <Spam type="BillingNum">
                  Shipping Details:
                  {' '}

                </Spam>
                <Spam type="BillingNumInfo">
                  Address:
                  {' '}
                  {billingsData && billingsData.address && billingsData.address}
                </Spam>
                <Spam type="BillingNumInfo">
                  ZipCode:
                  {' '}
                  {billingsData && billingsData.zipCode && billingsData.zipCode}
                </Spam>
              </Div>
            </Div>
          </GridItem>

        </GridContainer>

      </Div>

      <GridContainer spacing={0}>

        <GridItem num={[6, 4, 4, 4, 4]}>
          <Div width="100%" horizontal="left" />
        </GridItem>

        <GridItem num={[6, 4, 4, 4, 4]}>
          <Div width="100%" horizontal="right">
            <Div horizontal="left" width="100%">
              <Spam type="BillingNum">
                Billing Details:
                {' '}

              </Spam>
              <Spam type="BillingNumInfo">
                Address:
                {' '}
                {billingsData && billingsData.billingAddress && billingsData.billingAddress}

              </Spam>
              <Spam type="BillingNumInfo">
                ZipCode:
                {' '}
                {billingsData && billingsData.billingZipCode && billingsData.billingZipCode}

              </Spam>
            </Div>
          </Div>
        </GridItem>

      </GridContainer>

    </Div>

  );
}

const MyOrders = (props) => {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
};

MyOrders.propTypes = {};

export default MyOrders;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};

/*
<OrderSectionCards product={product} />
 */
