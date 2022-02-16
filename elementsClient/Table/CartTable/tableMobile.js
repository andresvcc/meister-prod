import React from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// core components
import { Div, redux, hookDeviceInfo } from 'component';
// Material ui
import CloseIcon from '@material-ui/icons/Close';
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

const rowGenerator = (val, productList, currencyRates, tva, localCurrency, curentLanguage, delToBag, addQTY, restQTY, width, classes) => [
  <Div height="230px" style={{ paddingTop: '20px' }}>

    <Div
      height="170px"
      width="100%"
      style={{
        backgroundImage: `url('${val.photo}')`,
        minWidth: '100px',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#e6e6e6',
        backgroundPosition: 'center'
      }}
    />
    <div style={{ height: '10px' }} />
    <small className={classes.tdNameSmall}>
      {`Delivery: ${(new Date(Date.now() + 12 * 24 * 60 * 60 * 1000)).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })} - ${(new Date(Date.now() + 16 * 24 * 60 * 60 * 1000)).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}`}
    </small>
  </Div>,
  <Div height="220px" width="50vw" horizontal="left" vertical="at" style={{ paddingTop: '20px' }}>
    <a
      href={val.pathname}
      className={classes.tdNameAnchor}
    >
      {val.name.split('_')[0]}
    </a>
    <Div>
      <small className={classes.tdNameSmall2} style={{ marginTop: '5px' }}>
        {val.sizeName === 'custom' || val.sizeName === ' ' ? '' : 'Size:'}
      &nbsp;&nbsp;
        <span style={{ color: 'black', fontWeight: '400' }}>
          {val.sizeName === 'custom' ? '' : val.sizeName}
        </span>
      </small>
      <small className={classes.tdNameSmall2} style={{ display: 'flex' }}>
        &nbsp;&nbsp;
        <small className={classes.tdNameSmall2} style={{ display: 'flex', paddingRight: '50px' }}>
          <span
            className="dot"
            style={{
              color: 'black', fontWeight: '400', display: 'flex', backgroundColor: val.colorCode, marginTop: '5px'
            }}
          />
        </small>
      </small>
    </Div>
    <small
      className={classes.tdNameSmall2}
      style={{
        width: '100%', display: 'inherit', position: 'relative', left: '-10%'
      }}
    >
      &nbsp;&nbsp;
      <span style={{
        color: 'black', fontSize: '1.1em', fontWeight: '400', width: '55%', display: 'flex', justifyContent: 'space-around',
      }}
      >
        <Div onClick={() => (val.qty <= 1 ? delToBag(val.key) : restQTY(val.key))}>
          {val.qty <= 1 ? <RemoveCircleIcon style={{ color: grayColor[4], fontSize: '20px' }} /> : <RemoveCircleIcon style={{ fontSize: '20px' }} />}
        </Div>
        <span className={classes.tdNameSmall2}>{val.qty}</span>
        <Div onClick={() => addQTY(val.key)}>
          <AddCircleIcon style={{ fontSize: '20px' }} />
        </Div>
      </span>
    </small>
    <div>
      <span href="#jacket" className={classes.tdNameAnchor}>
        {new Intl.NumberFormat(`${curentLanguage}`, { currencyDisplay: 'symbol', style: 'currency', currency: localCurrency }).format(price(localCurrency, productList, currencyRates, tva, val)) }
      </span>
    </div>
    <Div width="110px" height="140px" horizontal="right" vertical="at" style={{ position: 'absolute', top: -10, right: 0 }}>
      <Button color="transparent" justIcon onClick={() => delToBag(val.key)}>
        <CloseIcon style={{ color: 'grey' }} />
      </Button>
    </Div>
  </Div>
];

// eslint-disable-next-line object-curly-newline
export default function DemoTables({ cartItemArr, delToBag, addQTY, restQTY }) {
  const classes = useStyles();

  const [{
    currencyRates, productList, localCurrency, curentLanguage, tva
  }, dispatch] = redux();

  const { width } = hookDeviceInfo();

  return (
    <Table
      minimal
      tableData={[...cartItemArr.map((val, i) => rowGenerator(val, productList, currencyRates, tva, localCurrency, curentLanguage, delToBag, addQTY, restQTY, width, classes))]}
      tableShopping
      maxHeight="100%"
      notEmptyRows
      startRowsPerPage={10}
      customRowPerPageList={[10, 15, 25]}

    />
  );
}
