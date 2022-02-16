import React from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
// components
import { redux, Div, hookDeviceInfo } from 'components';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
// layout
import Layout from '@/layouts/Default2';

const mapArray = [
  { title: '1. General information', description1: '1.1 Meister Engineering SA is a Swiss company registered at the Geneva Trade Registry under the reference n° CHE-460.815.918 and has its address at route d’Hermance 150A, 1245 Collonge-Bellerive, Geneva, Switzerland.', description2: '1.2 Meister Engineering SA sells goods and offers services in relation to motorcycles and related products.' },
  {
    title: '2. Agreement to the Terms & Conditions', description1: '2.1 These Terms & Conditions apply to the activities mentioned under section 1.2 above provided by Meister Engineering SA and set out the terms and conditions on which you may make use of the Meister-engineering.com website (the "Website").', description2: '2.2 By continuing to use the Website, you accept these Terms & Conditions. Please read these Terms & Conditions carefully before using the Website and/or purchasing goods or services with Meister Engineering SA.'
  },
  { title: '3. Accessing the Website', description1: '3.1 Accessing to the Website is permitted on a temporary basis, and we reserve the right to withdraw or amend the content of the Website without notice.', description2: '3.2 We will not be liable if for any reason the Website is unavailable at any time or for any period.' },
  {
    title: '4. Intellectual property rights', description1: '4.1 Meister Engineering SA is the owner or the licensee of all intellectual property rights contained in the Website and in the material published on it. This includes but is not limited to Website design, content, images, photographs, articles, as well as our motorcycles designs. All such rights are reserved.', description2: '4.2 You must not use any part of the materials on the Website for commercial purposes without obtaining a licence to do so from us.', description3: '4.3 If you breach the terms of this clause, your right to use the Website will cease immediately and you must return or destroy any copies of the materials you have made. Our right to act before the competent courts is reserved.'
  },
  {
    title: '5. Contract', description1: '5.1 When ordering goods and/or services on our Website, you are placing a binding order for the items in your shopping basket. You shall receive an e-mail confirmation shortly after we have sent your order. The contract is deemed concluded when we confirm the shipment.', description2: '5.2 Please note that we are exceptionally not obliged to deliver the ordered goods if we have duly ordered them from our suppliers but have not received the delivery correctly or on time. We are not obliged to deliver the goods if there is a lack of availability of the goods and we have informed you immediately. In the event of unavailability of the ordered goods, we will immediately refund any payments already made. ', description3: '5.3 We may refuse to process an order for any reason or refuse service to anyone at any time at our sole discretion. We will not be liable to you or any third party because of such refusal or by reason of unwinding or suspending any order after processing has begun.'
  },

  {
    title: '6. Shipping and returns', description1: '6.1 We deliver your orders worldwide. If the delivery time is expressed in business days, we mean every day from Monday to Friday, with the exception of public holidays in Switzerland.', description2: '6.2 For all purchases of goods under the Website, we grant a right of return for a total of 30 days from receipt of the goods. According to this right, you can withdraw from the contract by returning the goods within 30 days of receipt (the period starts on the day after receipt of the goods). Dispatch within the period is sufficient to comply with the deadline.', description3: '6.3 The condition for exercising the right of return is, however, that you have only worn the goods for fitting (if applicable) and that you return them complete and undamaged. In addition, you shall return the goods in their original packaging, together with any instructions. If these conditions are not met, the return of the goods may be refused.'
  },
  { title: 'Please send the goods to:', description1: 'Meister Engineering SA, 24 route de Compois, 1252 Meinier Geneva, Switzerland' },
];

function Page(props) {
  const { user, useSocketHook, ...rest } = props;
  const [emit, socket] = useSocketHook;
  const { width } = hookDeviceInfo();
  const [{ profilInfo }, dispatch] = redux();

  return (
    <Div width="100%" style={{ minHeight: '600px', backgroundColor: '#fbf9f4' }} vertical="top">
      <Div height="50px" />
      <Div width="100%" style={{ fontSize: '35px', fontFamily: 'Taviraj, serif', fontWeight: 'bold' }}>
        Shipping and Return
      </Div>

      <Div width="95%" style={{ fontSize: '20px', fontFamily: 'Taviraj, serif', fontWeight: 'bold' }}>
        <Div width="95%" horizontal="left">
          {`${"Meister Engineering's Terms and Conditions"}`}
        </Div>
      </Div>
      {
        mapArray.map((val, i) => (
          <Div width="95%" key={`${i + 1}`}>

            <GridContainer spacing={3}>
              {
                val.title
                  ? (
                    <Div width="95%" style={{ paddingLeft: '15px' }}>
                      <Div width="95%" horizontal="left" height="50px" vertical="bottom">
                        <Spam type="termsTitle">
                          {val.title}
                        </Spam>
                      </Div>
                    </Div>

                  ) : <Div />
              }
              {
                val.description1
                  ? (
                    <GridItem num={[12, 12, 12, 12, 12]}>
                      <Div horizontal="left" width="95%" style={{ textAlign: 'justify' }}>
                        <Spam type="termsDescription">
                          {val.description1}
                        </Spam>
                      </Div>
                    </GridItem>
                  ) : <Div />
              }
              {
                val.description2
                  ? (
                    <GridItem num={[12, 12, 12, 12, 12]}>
                      <Div horizontal="left" width="95%" style={{ textAlign: 'justify' }}>
                        <Spam type="termsDescription">
                          {val.description1}
                        </Spam>
                      </Div>
                    </GridItem>
                  ) : <Div />
              }
              {
                val.description3
                  ? (
                    <GridItem num={[12, 12, 12, 12, 12]}>
                      <Div horizontal="left" width="95%" style={{ textAlign: 'justify' }}>
                        <Spam type="termsDescription">
                          {val.description1}
                        </Spam>
                      </Div>
                    </GridItem>
                  ) : <Div />
              }
            </GridContainer>
          </Div>
        ))
      }
      <Div height="50px" />
    </Div>
  );
}

function TermsConditions(props) {
  const { user, ...rest } = props;
  const useSocketHook = useSocket(user);
  return (
    <Layout useSocketHook={useSocketHook}>
      <Div height="200px" />
      <Page user={user} useSocketHook={useSocketHook} {...rest} />
      <Div height="100px" />
    </Layout>
  );
}

export default TermsConditions;

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: {} };
  return { props: { user } };
};
