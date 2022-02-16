import React from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';

// core components
import CloseIcon from '@material-ui/icons/Close';
import { Div, redux } from 'component';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import Button from '@/components/CustomButtons/Button';
import Table from '@/components/Table/Table';
import { grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const useStyles = makeStyles(styles);

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

const rowGenerator = (val, productList, currencyRates, tva, localCurrency, curentLanguage, delToBag, addQTY, restQTY, classes) => [
  <Div width="80%">
    <div style={{ height: '10px' }} />

    <a href={val.pathname} style={{ background: '#F7F6F4' }}>
      <div className={classes.imgContainer}>
        <img src={val.photo} alt="..." className={classes.img} />
      </div>
    </a>
    <div style={{ height: '3px' }} />

    <small className={classes.tdNameSmall}>
      {`Delivery: ${(new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })} - ${(new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}`}
    </small>
    <div style={{ height: '10px' }} />

  </Div>,
  <Div width="88%" height="155px" horizontal="left" vertical="at">
    <Button color="transparent" justIcon onClick={() => delToBag(val.key)} style={{ position: 'absolute', right: 0, top: 5 }}>
      <CloseIcon style={{ color: 'grey' }} />
    </Button>
    <a href={val.pathname} className={classes.tdNameAnchor}>
      {val.name.split('_')[0]}
    </a>
    <div style={{ display: 'flex' }}>
      <small className={classes.tdNameSmall2}>
        <span style={{ color: 'black', fontWeight: '400' }}>
          {`${val.sizeName === 'custom' ? '' : val.sizeName}`}
        </span>
      </small>

      <small className={classes.tdNameSmall2} style={{ display: 'flex' }}>
        {val.colorName === '-' ? '' : ''}
        <span style={{ color: 'black', fontWeight: '400', display: 'flex' }}>
          &nbsp;&nbsp;
        </span>
        <div style={{
          backgroundColor: val.colorCode, borderRadius: '10px', height: '18px', width: '18px'
        }}
        />
      </small>
    </div>
    <small className={classes.tdNameSmall2} style={{ width: '100%', maxWidth: '180px', display: 'inherit' }}>
      <span>Qty:</span>
        &nbsp;&nbsp;
      <span style={{
        color: 'black',
        fontSize: '1em',
        fontFamily: 'GorgiaLight',
        fontWeight: '400',
        width: '50%',
        display: 'flex',
        justifyContent: 'space-around'
      }}
      >
        <Div onClick={() => (val.qty <= 1 ? delToBag(val.key) : restQTY(val.key))}>
          {val.qty <= 1 ? <RemoveCircleIcon style={{ color: grayColor[4], fontSize: '18px' }} /> : <RemoveCircleIcon style={{ fontSize: '18px' }} />}
        </Div>
        <span className={classes.tdNameSmall2}>{val.qty}</span>
        <Div onClick={() => addQTY(val.key)}>
          <AddCircleIcon style={{ fontSize: '18px' }} />
        </Div>
      </span>
    </small>

    <small className={classes.tdNameSmall2}>
      <span href="#jacket" className={classes.tdNameAnchor} style={{ size: '22px' }}>
        {new Intl.NumberFormat(`${curentLanguage}`, { currencyDisplay: 'symbol', style: 'currency', currency: localCurrency }).format(price(localCurrency, productList, currencyRates, tva, val)) }
      </span>
    </small>
  </Div>
];

// eslint-disable-next-line object-curly-newline
export default function DemoTables({ cartItemArr, delToBag, addQTY, restQTY }) {
  const classes = useStyles();

  const [{
    currencyRates, productList, localCurrency, curentLanguage, tva
  }, dispatch] = redux();

  return (
    <Table
      notPagination
      minimal
      tableData={[...cartItemArr.map((val, i) => rowGenerator(val, productList, currencyRates, tva, localCurrency, curentLanguage, delToBag, addQTY, restQTY, classes))]}
      tableShopping
      maxHeight="calc(70vh - 200px)"
      notEmptyRows
    />
  );
}
