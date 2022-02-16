import React from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

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

const withTVA = (tva, val) => val + (val * tva);

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
  <Div
    width="88%"
    height="155px"
    horizontal="left"
    vertical="at"
  >

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
    <small className={classes.tdNameSmall2} style={{ width: '100%', maxWidth: '180px', display: 'inherit' }} />

    <small className={classes.tdNameSmall2}>
      <span href="#jacket" className={classes.tdNameAnchor} style={{ size: '22px' }}>
        {new Intl.NumberFormat(`${curentLanguage}`, { currencyDisplay: 'symbol', style: 'currency', currency: localCurrency }).format(withTVA(tva, Math.round((((productList[val.name]?.price * val.qty) / currencyRates[productList[val.name]?.currency]) * currencyRates[localCurrency]) * 100) / 100)) }
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
      // notPagination
      minimal
      tableData={[...cartItemArr.map((val, i) => rowGenerator(val, productList, currencyRates, tva, localCurrency, curentLanguage, delToBag, addQTY, restQTY, classes))]}
      tableShopping
      maxHeight="100%"
      notEmptyRows
      startRowsPerPage={10}
      customRowPerPageList={[10, 15, 25]}
    />
  );
}
