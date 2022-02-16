import React from 'react';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';

function PriceSection2(props) {
  const [{ profilInfo, products }, dispatch] = redux();
  const { cartItems = {} } = profilInfo;
  const bagListKey = Object.keys(cartItems);
  const subTotal = bagListKey.map((val) => products[cartItems[val].id].prix * cartItems[val].qty).reduce((a, b) => a + b, 0);
  const { step } = props;

  return (
    <Div width="95%" height="100%" style={{ background: 'white' }}>
      {
            bagListKey.length > 0 ? (
              <Div
                height="250px"
                width="100%"
              >

                <Div width="90%" height="50px" row horizontal="at">
                  <Div horizontal="right">
                    <Spam type="aboutDescription2">
                      Subtotal:
                    </Spam>
                  </Div>
                  <Div horizontal="left">
                    <Spam type="aboutDescription2">
                      {`${subTotal} CHF`}
                    </Spam>
                  </Div>
                </Div>

                <Div width="90%" height="50px" row horizontal="at">
                  <Div horizontal="right">
                    <Spam type="aboutDescription2">
                      Shipping:
                    </Spam>
                  </Div>
                  <Div horizontal="left">
                    <Spam type="aboutDescription2">
                      {`${subTotal} CHF`}
                    </Spam>
                  </Div>
                </Div>

                <Div width="90%" height="20px" style={{ borderBottom: '1px solid grey' }} />

                <Div width="90%" height="50px" row horizontal="at">
                  <Div horizontal="right">
                    <Spam type="aboutDescription2">
                      Total:
                    </Spam>
                  </Div>
                  <Div horizontal="left">
                    <Spam type="aboutDescription2">
                      {`${subTotal} CHF`}
                    </Spam>
                  </Div>
                </Div>

              </Div>
            ) : null
          }
    </Div>

  );
}
export default PriceSection2;
