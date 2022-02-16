import React, { useEffect, useState } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
import { Div, redux, axios } from 'components';
import dynamic from 'next/dynamic';
import Logo from 'elementsClient/Sections/ProcessAchatSection/Logo';
import Spam from '@/components/Typography/Spam';
// components
import Layout from '@/layouts/DefaultCheckout';
// elements
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

// import ViewPDFMaster from '@/elementAdmin/TABLES/BillingTable2/SweetViewerMaster';

const ViewPDFMaster = dynamic(() => import('@/elementAdmin/TABLES/BillingTable2/SweetViewerMaster'), { loading: () => <p>Loading...</p>, ssr: false });

function Page(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  const router = useRouter();
  const [{ profilInfo }] = redux();
  const { idBilling, userMail } = router.query;
  const [billing, setBilling] = useState();

  const productsCost = billing ? Object.values(billing.products || {}).map((val) => val?.price * val.qty).reduce((a, b) => a + b) : 0; // .reduce((a, b) => a + b);
  const total = billing ? billing.TVA + productsCost + billing.shippingCost : 0;
  const billingAmount = billing && billing.payment ? billing.payment.pay : 0;
  const delivery = new Date(`${(billing && billing.payment.payDate) || ''}`);

  const getBilling = async () => {
    // const { publicKey, privateKey } = await generateKey();
    const billingData = await axios.post({
      url: '/api/billing',
      billingID: idBilling,
      userMail,
    });
    setBilling(billingData?.billing);
  };

  useEffect(() => {
    getBilling();
  }, []);

  if (!billing || !delivery) {
    return (
      <Layout useSocketHook={useSocketHook}>
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
      </Layout>
    );
  }

  if (!billing?.products || billing?.err) {
    return (
      <Layout useSocketHook={useSocketHook}>
        <Div width="100%">
          <Div width="100%" vertical="top" style={{ paddingTop: '30px', background: '#F1EFEA' }}>

            <GridContainer>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div width="95%" height="810px">
                  <Spam type="serifTitle">
                    Facture ID not Found
                  </Spam>
                </Div>
              </GridItem>
            </GridContainer>

          </Div>
        </Div>
      </Layout>
    );
  }

  return (
    <Div width="100%">
      <ViewPDFMaster
        color="primary"
        product={{
          ...billing, formDate: billing.date, total: billingAmount, TVA: billing.TVA
        }}
        user={{ lname: billing.lname, fname: billing.fname, email: billing.email }}
        deliveryDate={delivery}
      >
        <Spam type="buttonShopNow2">Print</Spam>
      </ViewPDFMaster>
    </Div>
  );
}

export default Page;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
