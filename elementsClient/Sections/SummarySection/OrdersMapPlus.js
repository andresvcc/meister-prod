import React from 'react';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// Material ui Icon

function OrdersMap2() {
  const [{ profilInfo, products }, dispatch] = redux();
  const { cartItems = {} } = profilInfo;
  const bagListKey = Object.keys(cartItems);

  const delToBag = async (val) => {
    const temp = cartItems;
    delete temp[val];
    await dispatch({
      state: 'profilInfo',
      value: {
        cartItems: {
          ...temp,
        }
      }
    });
  };

  const addQTY = async (val) => {
    if (cartItems[val] !== undefined) {
      await dispatch({
        state: 'profilInfo',
        value: {
          cartItems: {
            ...cartItems,
            [val]: {
              ...cartItems[val],
              qty: cartItems[val].qty + 1
            }
          }
        }
      });
    }
  };

  const restQTY = async (val) => {
    const producInBag = cartItems[val];
    if (producInBag !== undefined && producInBag.qty > 1) {
      await dispatch({
        state: 'profilInfo',
        value: {
          cartItems: {
            ...cartItems,
            [val]: {
              ...producInBag,
              qty: producInBag.qty - 1
            }
          }
        }
      });
    }
  };

  return (
    <Div width="95%">

      <Div width="100%" scroll={13.5} style={{ backgroundColor: 'white' }}>
        {
        bagListKey.map((val, i) => {
          const productInBag = cartItems[val];
          const productData = products[productInBag.id];
          const { color } = productData.colors[productInBag.color];
          const size = productInBag.size ? productData.sizes[productInBag.size] : undefined;

          return (
            <Div key={`${i + 1}`} width="100%" horizontal="at" row>

              <GridContainer spacing={2}>

                <GridItem num={[12, 3, 3, 3, 3]}>
                  <Div width="90%" height="100%" vertical="at">
                    <img
                      src={`${productInBag.photo}`}
                      alt="product motorcycle"
                      style={{ width: '100%', objectFit: 'contain' }}
                    />
                  </Div>
                </GridItem>

                <GridItem num={[6, 5, 5, 5, 5]}>
                  <Div
                    width={['95%', '100%', '100%', '100%', '100%']}
                    height="120px"
                    vertical="at"
                    horizontal="left"
                    style={{ paddingTop: '10px' }}
                  >

                    <Spam type="aboutDescription2">
                      {productData.languages.EN.nameProduct}
                    </Spam>

                    <Spam type="aboutSmallDescription2">
                      {size ? `Size: ${size}` : ''}
                      Size: Medium
                    </Spam>

                    <Div
                      style={{
                        backgroundColor: `${color}`,
                        height: '15px',
                        width: '15px',
                        borderRadius: '50%'
                      }}
                    />

                    <Div width="100%" horizontal="left" row>

                      <Spam type="aboutSmallDescription2">
                        Quantity:
                      </Spam>

                      <Div width="40px" onClick={() => addQTY(val)}>
                        <Spam type="aboutSmallDescription2">
                          +
                        </Spam>
                      </Div>

                      <Spam type="aboutSmallDescription2">
                        {productInBag.qty}
                      </Spam>

                      {
                    cartItems[val].qty > 1 ? (
                      <Div width="40px" onClick={() => restQTY(val)}>
                        <Spam type="aboutSmallDescription2"> - </Spam>
                      </Div>
                    ) : null
                }
                    </Div>
                  </Div>

                </GridItem>

                <GridItem num={[6, 3, 4, 4, 4]}>

                  <Div width="90%" height="120px" horizontal="right" vertical="at">

                    <Div height="50px" vertical="bottom">
                      <Spam type="aboutSmallDescription2">
                        {`Prix: ${productData?.currency} ${productData.prix}`}
                      </Spam>
                    </Div>

                    <Div height="30px" vertical="bottom">
                      <Spam type="aboutSmallDescription2">
                        {`Sub-total: ${productData?.currency} ${productData.prix * cartItems[val].qty}`}
                      </Spam>
                    </Div>

                  </Div>

                </GridItem>

                <GridItem num={[12, 12, 12, 12, 12]}>
                  <Div horizontal="left" height="35px" width="95%">
                    <Spam type="produitUniqueFournisseur">
                      Del 31 mar - 03 avr
                    </Spam>
                  </Div>
                </GridItem>
                <Div width="100%" height="15px" style={{ backgroundColor: '#F1EFEA', borderTop: '1px solid #FaFaFa' }} />

              </GridContainer>

            </Div>

          );
        })
  }
      </Div>
    </Div>

  );
}
export default OrdersMap2;
