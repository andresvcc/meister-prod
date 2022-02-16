import React, { useEffect } from 'react';
// import { Manager, Target, Popper } from "react-popper";
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import {
  redux, Div, hookDeviceInfo
} from 'components';
// elements
import CartTable from 'elementsClient/Table/CartTable/CartTableMobile';
// Material ui icon
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@/components/CustomButtons/Button';
import Spam from '@/components/Typography/Spam';
import { grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const useStyles = makeStyles({
  number: {
    color: grayColor[0],
    fontSize: '1.1em',
    marginTop: '10px',
    fontFamily: 'GeorgiaLight'
  },
  total: {
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: '300',
    color: grayColor[2]
  },
  btCheckoutMobile: {
    width: '90%',
    height: '45px',
    fontSize: '1.1em',
    fontFamily: 'GeorgiaLight',
  }
});

const price = (localCurrency, productList, currencyRates, val) => {
  const a = (Math.round((((productList[val.name]?.price * val.qty) / currencyRates[productList[val.name]?.currency]) * currencyRates[localCurrency]) * 100) / 100);
  return a;
};

const covertToCurrency = (curentLanguage, localCurrency, val) => {
  const a = new Intl.NumberFormat(`${curentLanguage}`, { style: 'currency', currency: localCurrency }).format(val);
  return a;
};

export default function MenuMobileIcon(props) {
  const classes = useStyles();
  const [{
    profilInfo, currencyRates, productList, localCurrency, curentLanguage, dialogBag = 'false'
  }, dispatch] = redux();

  const { cartItems = {} } = profilInfo;
  const router = useRouter();

  const handleClose = async () => {
    document.body.style.overflow = 'initial';
    await dispatch({
      state: 'dialogBag',
      value: 'false',
    });
  };

  const handleClickOpen = () => {
    document.body.style.overflow = 'hidden visible';
    dispatch({
      state: 'dialogBag',
      value: 'true',
    });
  };

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

  const total = Object.values(cartItems || {}).map((val) => {
    const priceProduct = price(localCurrency, productList, currencyRates, val);
    return priceProduct;
  });

  const totalValue = total.length > 0 ? total.reduce((a, b) => a + b) : 0;

  const totalwhitCurrency = covertToCurrency(curentLanguage, localCurrency, totalValue);

  const checkout = async () => {
    document.body.style.overflow = 'initial';
    await dispatch({ state: 'dialogBag', value: 'false' });
    await router.push('/summary');
  };

  const { width } = hookDeviceInfo();

  useEffect(() => {
    if (dialogBag === 'true') document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'initial';
  }, [dialogBag]);

  return (
    <Div
      style={{
        padding: 0, margin: 0, fontSize: '18px', position: 'absolute', top: 12, right: 10,
      }}
    >
      <Div
        onClick={handleClickOpen}
      >
        <ShoppingCartIcon
          style={{ width: '25px', height: '25px' }}
        />
      </Div>

      {
        dialogBag === 'true' ? (
          <div className="mobileCart">
            <Div width="100%">
              <Div width="calc(100% - 20px)">
                <Div height={10} />
                <Div width="100%" horizontal="at" row>
                  <Spam type="serifTitle">
                    {total.length > 0 ? `Shopping Cart (${total.length})` : ''}
                  </Spam>
                  <Div onClick={handleClose}>
                    <Div
                      onClick={handleClose}
                      style={{
                        fontSize: '18px', color: 'grey', fontFamily: 'NovaLight, sans serif', paddingRight: '20px'
                      }}
                    >
                      CLOSE
                    </Div>
                  </Div>
                </Div>
              </Div>
            </Div>
            <Div width="calc(100% - 5px)" style={{ marginLeft: '10px', marginRight: '10px' }}>
              <CartTable cartItems={cartItems} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />

            </Div>
            <Div style={{
              position: 'fixed', width: '100%', bottom: 0, background: '#FaFaFa', paddingBottom: '10px'
            }}
            >
              <Div horizontal="right" width="calc(90% - 15px)">
                <p className={classes.number}>
                  Subtotal:
                  &nbsp;&nbsp;
                  <span className={classes.total}>
                    {totalwhitCurrency}
                  </span>
                </p>
              </Div>
              <Button
                color="primary"
                disabled={total.length <= 0}
                className={classes.btCheckoutMobile}
                onClick={checkout}
              >
                Checkout
              </Button>
            </Div>
          </div>
        ) : null
      }

    </Div>
  );
}
