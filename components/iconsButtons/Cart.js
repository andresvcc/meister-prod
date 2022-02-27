import React, {
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { Dialog } from '@material-ui/core';
import { createTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {
  redux, Div, FlexDiv, hookDeviceInfo
} from 'components';
import Divider from '@material-ui/core/Divider';
import CartTable from 'elementsClient/Table/CartTable/CartTable';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
import Spam from '@/components/Typography/Spam';
import {
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

import Button from '@/components/CustomButtons/Button';
import { boxShadow } from '../../assets/jss/nextjs-material-dashboard-pro';

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    right: -20,
    top: 55,
    zIndex: 9,
    width: '500px',
    background: 'white',

  },
  dialogMobile: {
    position: 'absolute',
    right: 'auto',
    top: 60,
    width: '100%'
  },
  number: {
    fontSize: '1.1em',
    marginTop: '10px',
    fontFamily: 'serif'
  },
  total: {
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: '300',
    color: grayColor[2]
  },
  btCheckout: {
    width: '90%',
    height: '40px',
    marginBottom: '20px',
    fontSize: '1.2em',
    fontFamily: 'GorgiaLight',
    textTransform: 'capitalize'
  }
});

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 28,
    top: 8,
    padding: '0 0px',
    background: '#e1dfdfe0',
    color: 'black',
    width: '18px',
    height: '18px',
    fontSize: '13px'
  },
}))(Badge);

const price = (localCurrency, productList, currencyRates, tva, val) => {
  const product = productList[val?.name];

  const reg = /[(](\d+(\.\d)*)[)]/g;
  const reg2 = /[(]*[)]*(null)*/g;

  const priceOption1 = val.opt1;
  const so1 = [...new Set(product?.selectableOptions1?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
  const so1A = parseInt(so1[priceOption1] || '0', 10) || 0;

  const priceOption2 = val.opt2;
  const so2 = [...new Set(product?.selectableOptions2?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
  const so2A = parseInt(so2[priceOption2] || '0', 10) || 0;

  const priceOption3 = val.opt3;
  const so3 = [...new Set(product?.selectableOptions3?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
  const so3A = parseInt(so3[priceOption3] || '0', 10) || 0;

  const finalPrice = (Math.round(((((parseInt(product?.price, 10) + so1A + so2A + so3A) * val.qty) / currencyRates[product?.currency]) * currencyRates[localCurrency]) * 100) / 100);

  return finalPrice + (finalPrice * tva);
};

const covertToCurrency = (curentLanguage, localCurrency, val) => {
  const a = new Intl.NumberFormat(`${curentLanguage}`, { style: 'currency', currency: localCurrency }).format(val);
  return a;
};

export default function BagCardDialog() {
  const classes = useStyles();
  const [{
    profilInfo, currencyRates, productList, localCurrency, curentLanguage, dialogBag = 'false', tva
  }, dispatch] = redux();

  const [open, setOpen] = useState(false);

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

  const values = Object.values(cartItems || {});

  const total = values.map((val) => {
    const priceProduct = price(localCurrency, productList, currencyRates, tva, val);
    return priceProduct;
  });

  const totalValue = total.length > 0 ? total.reduce((a, b) => a + b) : 0;

  const totalwhitCurrency = covertToCurrency(curentLanguage, localCurrency, totalValue);

  const checkout = async () => {
    document.body.style.overflow = 'initial';
    await dispatch({ state: 'dialogBag', value: 'false' });
    await router.push('/summary');
  };

  return (
    <Div width="100%" onHover={(a) => (a === false && open === false ? handleClose() : null)}>
      <Div onClick={() => setOpen(true)} height="40px">
        <StyledBadge badgeContent={values.length} color="error" style={{ position: 'absolute', top: '8px' }}>
          <ShoppingCartIcon onMouseEnter={() => handleClickOpen()} />
        </StyledBadge>
      </Div>
      {
        dialogBag === 'true' ? (
          <Div
            width={450}
            style={{
              background: 'transparent',
              position: 'absolute',
              top: 35,
              right: 'calc(-50% + 65px)',
              paddingBottom: '5px'
            }}
          >
            <div className="dialogContainer">
              <Div width="100%">
                <Div width="calc(100% - 20px)">
                  <Div width="100%" horizontal="at" row>
                    <Spam type="serifTitle">
                      {total.length > 0 ? `Shopping Cart (${total.length})` : ''}
                    </Spam>
                    <Div onClick={() => { handleClose(); setOpen(false); }} style={{ fontSize: '17px', color: 'grey', fontFamily: 'NovaLight' }}>
                      Close
                    </Div>
                  </Div>
                </Div>
              </Div>
              {
                total.length <= 0
                  ? <Div height="2px" width="98%" style={{ borderBottom: '1px solid #00000060' }} />
                  : <Div />
              }
              <Div height="10px" />
              <Div width="calc(100% - 5px)" style={{ marginLeft: '15px' }}>
                <CartTable cartItems={cartItems} delToBag={delToBag} addQTY={addQTY} restQTY={restQTY} />
              </Div>
              {
                total.length > 0
                  ? <Div height="20px" width="100%" style={{ borderBottom: '1px solid #00000060' }} />
                  : <Div />
              }

              <Div horizontal="right" width="calc(100% - 25px)">

                <p className={classes.number}>
                  Subtotal:
                  &nbsp;&nbsp;
                  <span className={classes.total}>
                    {totalwhitCurrency}
                  </span>
                </p>
              </Div>
              <Div height="10px" />

              <Div width="100%">
                <Button
                  color="primary"
                  disabled={total.length <= 0}
                  className={classes.btCheckout}
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </Div>
            </div>
          </Div>
        ) : null
      }
    </Div>
  );
}
