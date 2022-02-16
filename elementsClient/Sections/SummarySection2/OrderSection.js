import React, {
  useState,
} from 'react';
import Image from 'next/image';
import {
  redux, Div
} from 'components';
import CartTable from 'elementsClient/Table/SummaryProducts/CartTable';

const PaymentsCards = [
  { id: 1, img: '/static/images/Payment2.png' },
  { id: 1, img: '/static/images/Payment3.png' },
  { id: 1, img: '/static/images/Payment4.png' },
  { id: 1, img: '/static/images/Payment5.png' },
  { id: 1, img: '/static/images/Payment6.png' },
];

const style = {
  root: {
    backgroundColor: 'white',
  },
  payementOptionImg: {
    width: '100%',
    height: '159px',
    position: 'relative',
    left: '-150px'
    // objectFit: 'contain'
  }
};

export default function BagCardDialog({ marginInside }) {
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
    <Div width="100%" style={{ ...marginInside }}>
      <Div width="100%" style={style.root}>
        <CartTable cartItems={cartItems} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />
      </Div>
      <div style={{ height: 17 }} />
      <Div width="100%" height="110px" style={style.root}>
        <Div width="calc(100% - 40px)" style={style.root} horizontal="left" vertical="top">
          <h5 style={{
            marginTop: '10px',
            fontFamily: 'GorgiaBold',
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#0c0c0c',
            textTransform: 'uppercase'
          }}
          >
            We accept
          </h5>
          <Div height="50px" width={['80%', '50%', '50%', '40%', '40%']} row>
            {PaymentsCards.map((val, i) => (
              <Div width="95%" key={`${i + 1}`} horizontal="left" style={{ paddingLeft: '5px' }}>
                <Image src={val.img ?? '/static/images/notPhoto.png'} alt="" height="30px" width="50px" />
              </Div>
            ))}
          </Div>

        </Div>
      </Div>
      <div style={{ height: 12 }} />
    </Div>
  );
}
