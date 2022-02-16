import React from 'react';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// Material ui Icon
import CloseIcon from '@material-ui/icons/Close';

function OrdersMap() {
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

      <Div width="100%" scroll={2.5} style={{ backgroundColor: 'white' }} dev>
        {
        bagListKey.map((val, i) => {
        const productInBag = cartItems[val];
        const productData = products[productInBag.id];
        const { color } = productData.colors[productInBag.color];
        const size = productInBag.size ? productData.sizes[productInBag.size] : undefined;
        return (
          <Div key={`${i + 1}`}>


            <Div key={`${i + 1}`} width="100%" horizontal="at" row>

              <GridContainer spacing={2} justify="flex-end" alignItems="center">

                <GridItem num={[4, 4, 4, 4, 4]}>

                  <img
                    src={`${productInBag.photo}`}
                    alt="product motorcycle"
                    style={{
                      width: '100%', objectFit: 'contain', paddingTop: '5px', minHeight: '170px', height: '100%'
                    }}
                  />

                </GridItem>


                <GridItem num={[6, 5, 5, 5, 5]}>
                  <Div
                    width={['95%', '100%', '100%', '100%', '100%']}
                    height="140px"
                    vertical="at"
                    horizontal="left"
                    style={{ paddingTop: '30px' }}
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

                <GridItem num={[2, 3, 3, 3, 3]}>

                  <Div
                    width="90%"
                    height="130px"
                    horizontal="right"
                    vertical="at"
                    style={{ paddingTop: '20px' }}
                  >

                    <Div height="35px" onClick={() => delToBag(val)}>
                      <CloseIcon style={{ fontSize: '20px' }} />
                    </Div>


                    <Div height="70px" vertical="bottom">
                      <Spam type="serifDescription">
                        {` ${productData?.currency} ${productData.prix * cartItems[val].qty}`}
                      </Spam>
                    </Div>

                  </Div>

                </GridItem>


                <GridItem num={[12, 12, 12, 12, 12]}>
                  <Div horizontal="left" height="35px" width="95%">
                    <Spam type="produitUniqueFournisseur">
                      Delivery:  31 mar - 03 avr
                    </Spam>
                  </Div>
                </GridItem>

              </GridContainer>

            </Div>
          </Div>

      );
    })
  }
      </Div>
    </Div>

  );
}
export default OrdersMap;

