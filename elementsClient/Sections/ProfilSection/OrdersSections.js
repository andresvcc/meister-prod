import React, { useState, useEffect } from 'react';
// components
import { Div, redux } from 'components';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';
import AddressMap from '@/elementsClient/Sections/ProfilSection/AddressMap';
import OrderSectionCards from '@/elementsClient/Sections/ProfilSection/OrdersSectionCards';
import Button from '@/components/CustomButtons/Button';

const image1 = 'static/products/00b41da2-06ba-4c36-93ce-e55e814b7a75.png';

const OrdersSection = React.memo(() => {
  const [open, setOpen] = useState(false);
  const [openState, setOpenState] = useState({});
  const [{ profilInfo }, dispatch] = redux();
  const { billings = {} } = profilInfo;
  const billingListKeys = React.useMemo(() => Object.keys(billings), [billings]);

  const router = useRouter();

  const goToBilling = (id) => {
    router.push({
      pathname: `/Billing/${id}`,
    }).then(() => window.scrollTo(0, 0));
  };

  return (
    <Div width="100%" vertical="around">
      <Div style={{ paddingBottom: '30px' }} />

      {billingListKeys.length === 0 ? (
        <Div height="50px" width="100%" />
      ) : (
        <Div width="97%" height="100px" horizontal="left">
          <Spam type="titleOrders">
            Latest orders
          </Spam>
        </Div>
      )}

      {billingListKeys.length === 0 ? (
        <Div height="50px" width="100%" style={{ fontFamily: 'GeorgiaLight', fontSize: '18px', }} horizontal="center">
          Find your orders history here
        </Div>
      ) : (
        <Div width="100%">

          {billingListKeys.map((val, i) => {
            const billingInfo = billings[val];
            const productListKey = Object.keys(billingInfo.products);

            return (
              <Div width="97%" key={`${i + 1}`} style={{ backgroundColor: 'white' }}>

                <GridContainer spacing={0}>
                  <GridItem num={[8, 6, 6, 6, 6]}>
                    <Div width="100%" height="100px" horizontal="left">
                      <Div height="100px">
                        <Spam type="BillingNum">
                          Order Number:
                          {' '}
                          {billingInfo.idBilling}
                        </Spam>
                      </Div>
                      <Div height="100px">
                        <Spam type="BillingNumInfo">
                          Date of order
                          {' '}
                          {billingInfo.date}
                        </Spam>
                      </Div>

                      <Div height="100px">
                        <Spam type="BillingNumInfo">
                          Total: CHF
                          {' '}
                          {billingInfo.payment.pay}
                        </Spam>
                      </Div>
                    </Div>
                  </GridItem>

                  <GridItem num={[4, 6, 6, 6, 6]}>
                    <Div width="95%" height="100px" vertical="top" horizontal="right">

                      <Div height="80px" vertical="top" width={['105px', '140px', '140px', '140px', '140px']}>
                        <Button color="primary">
                          <Div width="100%" onClick={() => goToBilling(billingInfo.idBilling)}>
                            <Spam type="seeOrder">
                              See Order
                            </Spam>
                          </Div>
                        </Button>
                      </Div>
                    </Div>
                  </GridItem>
                  <Div width="100%" horizontal="left">
                    <div
                      style={{
                        maxWidth: '1350px', overflowX: 'hidden', whiteSpace: 'nowrap', scrollDirection: 'horizontal', marginBottom: '40px',
                      }}
                    >
                      {
                          productListKey.map((value, i) => {
                            const product = billingInfo.products[value];
                            return (
                              <div key={`${i + 1}`} style={{ display: 'inline-block', }}>
                                <OrderSectionCards product={product} />
                              </div>
                            );
                          })
                        }
                    </div>
                  </Div>

                </GridContainer>
              </Div>

            );
          })}

        </Div>
      )}

    </Div>

  );
});

export default OrdersSection;
