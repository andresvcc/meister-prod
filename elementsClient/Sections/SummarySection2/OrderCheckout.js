import React, {
  useState,
} from 'react';
import {
  redux, Div, FlexDiv, hookDeviceInfo
} from 'components';
import CartTable from 'elementsClient/Table/SummaryProducts/CartTable';
import imagine1 from '@/assets/img/PAYEMENTS OPTIONS.svg';

const style = {
  root: {
    backgroundColor: 'white'
  },
  payementOptionImg: {
    width: '100%',
    height: '115%',
    position: 'relative',
    left: '-15%',
    top: '-40%'
    // objectFit: 'contain'
  }
};

export default function BagCardDialog() {
  const [{
    profilInfo,
  }, dispatch] = redux();

  const { cartItems = {} } = profilInfo;

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
    <Div width="100%">
      <Div width="calc(100% - 50px)" style={style.root}>
        <CartTable cartItems={cartItems} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />
      </Div>
      <div style={{ height: 25 }} />
      <Div width="calc(100% - 50px)" height="150px" style={style.root} dev>
        <Div width="calc(100% - 50px)" style={style.root} horizontal="left" vertical="top" dev>
          <h5>We accept</h5>
          <Div width="100%">
            <img src={imagine1} alt="..." style={style.payementOptionImg} />
          </Div>
        </Div>
      </Div>
      <div style={{ height: 25 }} />
    </Div>
  );
}
