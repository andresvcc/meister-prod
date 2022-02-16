import React, { useState } from 'react';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
import { Div, redux } from 'components';
import dynamic from 'next/dynamic';
import Logo from 'elementsClient/Sections/ProcessAchatSection/Logo';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Spam from '@/components/Typography/Spam';
// components
import Layout from '@/layouts/DefaultCheckout';
// elements
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Button from '@/components/CustomButtons/Button';

// import PrintButton from '@/elementAdmin/TABLES/BillingTable2/SweetPrintMaster';

const PrintButton = dynamic(() => import('@/elementAdmin/TABLES/BillingTable2/SweetPrintMaster'), { ssr: false });

const covertToCurrency = (curentLanguage, localCurrency, val) => {
  const a = new Intl.NumberFormat(`${curentLanguage}`, { style: 'currency', currency: localCurrency }).format(val);
  return a;
};

const LinkTo = (props) => {
  const { link, children } = props;
  const [hover, setHover] = useState(false);
  return (
    <span
      type="link2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: 'pointer', color: hover ? 'black' : null, textDecoration: hover ? 'underline' : null,
      }}
    >
      <Link href={link} passHref>
        <span>{children}</span>
      </Link>
    </span>
  );
};

function Page() {
  const router = useRouter();
  const [{ profilInfo, curentLanguage, tva }] = redux();
  const { idBilling } = router.query;

  const billing = React.useMemo(() => profilInfo?.billings && profilInfo?.billings[idBilling], [idBilling, profilInfo]);
  const productsCost = billing ? Object.values(billing.products || {}).map((val) => val?.price * val.qty).reduce((a, b) => a + b) : 0; // .reduce((a, b) => a + b);
  const total = billing ? (productsCost + (productsCost * tva)) + billing.shippingCost : 0;
  const totalLocalCurrency = billing ? covertToCurrency(curentLanguage, billing?.currency, total) : '0';
  const pending = billing ? Math.round(total - billing.payment.pay) : 1; // aqui 110
  const billingAmount = billing && billing.payment ? billing.payment.pay : 0;
  const delivery = billing && billing.payment.payDate;

  const goToHome = () => {
    router.push({
      pathname: '/',
    });
  };

  const backToShopping = () => {
    router.push({
      pathname: '/checkout/step3'
    });
  };

  const data = billing ? {
    status: pending <= 0 ? billing.payment.status : 'pending',
    currency: billing?.currency,
    TVA: billing?.TVA,
    shippingCost: billing.shippingCost,
    productsCost,
    total,
    totalLocalCurrency,
    pending,
    estimatedShipping: billing.estimatedShippingDelay,
    delivery,
  } : {};

  if (!profilInfo.email) {
    return (
      <Div width="100%">
        <Div width="100%" vertical="top" style={{ paddingTop: '30px', background: '#F1EFEA' }}>

          <GridContainer>
            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div width="95%" height="810px">
                <Spam type="serifTitle">
                  Loading...
                </Spam>
              </Div>
            </GridItem>
          </GridContainer>

        </Div>
      </Div>
    );
  }

  if (!billing) {
    return (
      <Div width="100%">
        <Div width="100%" vertical="top" style={{ paddingTop: '30px', background: '#F1EFEA' }}>

          <GridContainer>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div width="95%" height="810px">
                <Spam type="serifTitle">
                  Facture ID not Found
                </Spam>
                <pre>{JSON.stringify(billing, null, 2)}</pre>
              </Div>
            </GridItem>
          </GridContainer>

        </Div>
      </Div>
    );
  }

  if (data.status === 'pending') {
    return (
      <Div width="100%">
        <Div width="100%" vertical="top" style={{ paddingTop: '30px', background: '#F1EFEA' }}>

          <Div height="115px" />
          <Div width="100%" height="500px" style={{ backgroundColor: 'white' }}>

            <GridContainer>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <ErrorIcon style={{ color: 'red', fontSize: '40px' }} />
              </GridItem>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div width="95%" height="100px">
                  <Spam type="serifDescriptionBoldBold">
                    We encountered problems in the transaction
                  </Spam>
                  <Spam type="serifDescriptionBold">
                    One of our agents will contact you in order to solve any unforeseen eventuality
                  </Spam>
                </Div>
              </GridItem>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div width="95%" height="100px">
                  <Spam type="serifDescriptionBoldBold">
                    For some reason the payment appears incomplete
                  </Spam>
                  <Spam type="serifDescriptionBold">
                    {`The payment should be ${billing.currency} ${total}, but your bank will process ${billing.currency} ${billing.payment.pay}`}
                  </Spam>
                  <Spam type="serifDescriptionBold">
                    {`An outstanding amount of ${pending}`}
                  </Spam>
                </Div>
              </GridItem>

            </GridContainer>

          </Div>
          <Div height="175px" />
        </Div>

      </Div>
    );
  }

  if (data.status !== 'succeeded') {
    return (
      <Div width="100%">
        <Div width="100%" vertical="top" style={{ paddingTop: '30px', background: '#F1EFEA' }}>

          <Div height="115px" />
          <Div width="100%" height="500px" style={{ backgroundColor: 'white' }}>

            <GridContainer>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <ErrorIcon style={{ color: 'red', fontSize: '40px' }} />
              </GridItem>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div width="95%" height="100px">
                  <Spam type="serifDescriptionBoldBold">
                    Payment failed
                  </Spam>
                  <Spam type="serifDescriptionBold">
                    If you continue to experience issues please contact the
                    <LinkTo link="mailto: moto@meister-engineering.com"> Help Team.</LinkTo>
                  </Spam>
                </Div>

              </GridItem>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Button
                  color="danger"
                  onClick={() => backToShopping()}
                >
                  Try again
                </Button>
                <Button
                  color="transparent"
                  style={{ width: '45%', height: '45px', border: 'solid 2px red' }}
                  onClick={() => goToHome()}
                >
                  Back to Homepage

                </Button>

              </GridItem>

            </GridContainer>

          </Div>
          <Div height="175px" />
        </Div>

      </Div>
    );
  }

  return (
    <Div width="100%">
      <Div width="100%" vertical="top" style={{ paddingTop: '30px' }}>

        <GridContainer>
          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div width="100%" style={{ paddingTop: '10px' }}>
              <Div width="200px">
                <Logo />
              </Div>
            </Div>
          </GridItem>
          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div width="100%" vertical="top">

              <Div width="100%" height="100px">
                <Div height="50px" />
                <CheckCircleOutlineIcon style={{ color: '#008f39', fontSize: '40px' }} />
                <Div height="10px" />
                <Spam type="successPayment">Payment successful</Spam>
              </Div>
              <Div height="40px" />
              <Div width="95%">
                <Spam type="successPayment3">
                  Thank you for ordering with Meister Engineering !
                </Spam>
                <Spam type="successPayment3">
                  {` Your invoice has been sent to ${profilInfo.email}`}
                </Spam>
              </Div>

              <Div height="40px" />

              <GridContainer>

                <GridItem num={[5, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="right" style={{ paddingRight: '20px' }}>
                    {' '}
                    <Spam type="successPayment3">
                      Date:
                    </Spam>
                  </Div>
                </GridItem>
                <GridItem num={[7, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="left">
                    <Spam type="successPayment3">
                      {` ${billing.date}`}
                    </Spam>
                  </Div>
                </GridItem>

                <GridItem num={[5, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="right" style={{ paddingRight: '20px' }}>
                    {' '}
                    <Spam type="successPayment3">
                      Status:
                    </Spam>
                  </Div>
                </GridItem>
                <GridItem num={[7, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="left">
                    <Spam type="successPayment3">
                      {` ${billing.payment.status}`}
                    </Spam>
                  </Div>
                </GridItem>

                <GridItem num={[5, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="right" style={{ paddingRight: '20px' }}>
                    {' '}
                    <Spam type="successPayment3">
                      Email:
                    </Spam>
                  </Div>
                </GridItem>
                <GridItem num={[7, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="left">
                    <Spam type="successPayment3">
                      {` ${profilInfo.email}`}
                    </Spam>
                  </Div>
                </GridItem>

                <GridItem num={[5, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="right" style={{ paddingRight: '20px' }}>
                    {' '}
                    <Spam type="successPayment3">
                      Amount Paid:
                    </Spam>
                  </Div>
                </GridItem>
                <GridItem num={[7, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="left">
                    <Spam type="successPayment3">
                      {`${billing.currency}`}
                      {' '}
                      {` ${billing.payment.pay}`}

                    </Spam>
                  </Div>
                </GridItem>

                <GridItem num={[5, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="right" style={{ paddingRight: '20px' }}>
                    {' '}
                    <Spam type="successPayment3">
                      Transaction ID:
                    </Spam>
                  </Div>
                </GridItem>
                <GridItem num={[7, 6, 6, 6, 6]}>
                  <Div width="100%" horizontal="left">
                    <Spam type="successPayment3">
                      {` ${billing.payment.payCode}`}
                    </Spam>
                  </Div>
                </GridItem>

              </GridContainer>

              <Div height="40px" />

            </Div>
          </GridItem>
          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div width="100%" vertical="top" row>

              <Div width="50%">
                <PrintButton
                  color="primary"
                  product={{
                    ...billing, formDate: billing.date, total: billingAmount, TVA: billing.TVA
                  }}
                  user={{ lname: billing.lname, fname: billing.fname, email: billing.email }}
                  deliveryDate={delivery}
                >
                  <Spam type="buttonShopNow2">Print</Spam>
                </PrintButton>
              </Div>
              <Div width="45%">
                <Button style={{ width: '160px' }} color="primary" onClick={() => goToHome()}>
                  <Spam type="buttonShopNow2">Back to shopping</Spam>
                </Button>
              </Div>

            </Div>
            <Div height="200px" />
          </GridItem>
        </GridContainer>
      </Div>
    </Div>
  );
}

function Step4(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default Step4;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};

/*
JSON de paiement
  <pre>{JSON.stringify(data, null, 2)}</pre>
   */

/*
     <Div width="40%" horizontal="at" row dev>
                <Spam type="successPayment3">
                  Date:
                </Spam>
                <Spam type="successPayment3">
                  {` ${billing.date}`}
                </Spam>
              </Div>

              <Div width="40%" horizontal="at" row>
                <Spam type="successPayment3">
                  Status:
                </Spam>
                <Spam type="successPayment3">
                  {` ${billing.payment.status}`}
                </Spam>
              </Div>

              <Div width="40%" horizontal="at" row>
                <Spam type="successPayment3">
                  Email:
                </Spam>
                <Spam type="successPayment3">
                  {` ${profilInfo.email}`}
                </Spam>
              </Div>
              <Div height="40px" />

              <Div width="40%" horizontal="at" row>
                <Spam type="successPayment3">
                  Amount paid:
                </Spam>
                <Spam type="successPayment3">
                  {` ${billing.payment.pay}`}
                </Spam>
              </Div>
              <Div height="20px" />

              <Div width="40%" horizontal="at" row>
                <Spam type="successPayment3">
                  Transaction ID:
                </Spam>
                <Spam type="successPayment3">
                  {` ${billing.payment.payCode}`}
                </Spam>
              </Div>

              <GridContainer spacing={0}>
                <GridItem num={[12, 12, 12, 12, 12]}>
                  <GridItem num={[12, 6, 6, 6, 6]}>
                    <Div>
                      {' '}
                      <Spam type="successPayment3">
                        Transaction ID:
                      </Spam>
                    </Div>
                  </GridItem>
                  <GridItem num={[12, 6, 6, 6, 6]}>
                    <Div>
                      <Spam type="successPayment3">
                        {` ${billing.payment.payCode}`}
                      </Spam>
                    </Div>
                  </GridItem>
                </GridItem>

                <GridItem num={[12, 12, 12, 12, 12]}>
                  <GridItem num={[12, 4, 4, 4, 4]}>
                    <Div>
                      {' '}
                      <Spam type="successPayment3">
                        Transaction ID:
                      </Spam>
                    </Div>
                  </GridItem>
                  <GridItem num={[12, 8, 8, 8, 8]}>
                    <Div>
                      <Spam type="successPayment3">
                        {` ${billing.payment.payCode}`}
                      </Spam>
                    </Div>
                  </GridItem>
                </GridItem>
              </GridContainer>

              */
