import React, { useEffect, useState, useMemo } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Link from 'next/link';
import Popover from '@material-ui/core/Popover';
import Image from 'next/image';
import SweetAlert from 'react-bootstrap-sweetalert';
import FastForward from '@material-ui/icons/FastForward';
import CircularProgress from '@material-ui/core/CircularProgress';
import Span from '@/components/Typography/Spam';

// react component used to create sweet alerts
import Table from '@/components/Table/Table';
import Button from '@/components/CustomButtons/Button';
import TextEditor from './TextEditor';
// material-ui components

import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';

const useStyles2 = makeStyles(styles2);

const MailBoxEditor = ({
  provider, order = {}, products, handleSetTreatment, setMailBox
}) => {
  const classes = useStyles2();
  const [message, setMessage] = useState('');
  const { name, manager } = provider;

  return (
    <SweetAlert
      custom
      closeOnClickOutside={false}
      style={{
        display: 'block', marginTop: '-100px', width: '100%', maxWidth: '650px',
      }}
      title={`${name}`}
      onConfirm={() => handleSetTreatment({ message, provider, products })}
      onCancel={() => setMailBox()}
      confirmBtnCssClass={`${classes.button} ${message.length <= 10 ? classes.disabled : classes.primary}`}
      cancelBtnCssClass={`${classes.button} ${classes.link}`}
      confirmBtnText="SEND"
      cancelBtnText="Cancel"
      showCancel
    >
      <Div width="calc(100% - 20px)">
        <Div width="100%" horizontal="left">
          <Span type="serifTitle3">
            From: Meiter
          </Span>
          <Span type="serifTitle3">
            {`To ${manager}`}
          </Span>
          <Span type="serifTitle3">
            {`Object: Comande ${order.fname} ${order.lname} ${order.idBilling}`}
          </Span>
        </Div>
        <TextEditor contain={{ provider, order, products }} setEditingContain={(data) => setMessage(data)} />
      </Div>
    </SweetAlert>
  );
};

const SweetCheckOrder = (props) => {
  const classes = useStyles2();

  const [{
    orders
  }, dispatch] = redux();

  const order = useMemo(() => (orders.list || {}), [orders]);

  const {
    product, successAlert, hideAlert, useSocketHook
  } = props;

  const productsByProviders = useMemo(() => order[product.idBilling].productsByProvider, [order]);
  const providers = useMemo(() => Object.entries(productsByProviders).map(([provider, { products, arrivated }]) => ({ provider, products, arrivated })), [productsByProviders]);

  const [check, setCheck] = useState(providers.map(({ arrivated, provider }) => ({ [provider]: !!arrivated })).reduce((a, b) => ({ ...a, ...b })));

  const disable = useMemo(() => !Object.values(check).reduce((a, b) => a && b), [check]);

  const [emit, socket] = useSocketHook;

  const Photo = (props) => {
    const {
      photo, idp
    } = props;
    return (
      <Div width="100%" height="80px" style={{ position: 'relative', minWidth: '100px' }}>
        <Image src={photo} alt="product" className={classes.photoOrder} layout="fill" />
        <span style={{
          position: 'absolute', top: 0, fontSize: '12px', color: 'black'
        }}
        >
          {`IDP: ${idp}`}
        </span>
      </Div>
    );
  };

  const SizeColor = ({
    sizeValue, opt1Key1, opt1Key2, opt1Key3, colorName, colorCode
  }) => (
    <Div width="100%" height="80px" style={{ maxWidth: '110px' }}>
      {
        sizeValue && sizeValue !== '' ? <span style={{ fontWeight: 'bold' }}>{`size: ${sizeValue}`}</span> : null
      }
      {
        colorName && colorName !== '' ? (
          <Div row>
            <span style={{ fontWeight: 'bold' }}>Color:&nbsp;</span>
            <div style={{
              fontWeight: 'bold', width: '15px', height: '15px', background: colorCode, borderRadius: '50%'
            }}
            />
          </Div>
        ) : null
      }
    </Div>
  );

  const Options = ({
    sizeValue, opt1Key1, opt1Key2, opt1Key3, colorName, colorCode
  }) => (
    <Div width="100%" height="80px" style={{ maxWidth: '110px' }}>
      {
        opt1Key1 && opt1Key1 !== '' ? <span style={{ fontWeight: 'bold' }}>{opt1Key1}</span> : null
      }
      {
        opt1Key2 && opt1Key2 !== '' ? <span style={{ fontWeight: 'bold' }}>{opt1Key2}</span> : null
      }
      {
        opt1Key3 && opt1Key3 !== '' ? <span style={{ fontWeight: 'bold' }}>{opt1Key3}</span> : null
      }
    </Div>
  );

  const Name = ({
    name, pathname
  }) => (
    <Div width="100%" height="80px" style={{ maxWidth: '150px' }}>
      <Link href={pathname}>
        <a href={pathname} target="_blank" rel="noopener noreferrer">
          <span style={{ color: '#390052', fontWeight: 'bold' }}>{name}</span>
        </a>
      </Link>
    </Div>
  );

  const handleArrived = async (provider) => {
    setCheck({ ...check, [provider]: true });
    await emit('arrivatedOrder', {
      idBilling: product.idBilling,
      provider
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on('arrivatedOrder', (data) => console.log(data));
    }
  }, [socket]);

  return (
    <SweetAlert
      custom
      style={{
        display: 'block', marginTop: '-100px', width: '100%', maxWidth: '950px',
      }}
      title={`ID Order: ${product.idOrder}`}
      onConfirm={() => successAlert(product.idBilling)}
      onCancel={() => hideAlert()}
      confirmBtnCssClass={`${classes.button} ${disable ? classes.disabled : classes.primary}`}
      cancelBtnCssClass={`${classes.button} ${classes.link}`}
      confirmBtnText="Yes, all good"
      cancelBtnText="Cancel"
      showCancel
    >
      <Div width="100%">
        <Div width={['100%', '100%', '450px', '450px', '450px']} horizontal="left">
          <p>please verify all information before submitting!</p>
        </Div>
      </Div>
      <br />
      <Div width="100%" row vertical="top" horizontal="at" style={{ fontSize: '16px' }}>
        <Div width="100%" horizontal="left">
          <Div width={['100%', '90%', '200px', '200px', '200px']} horizontal="left">
            <p>{product.name}</p>
            <p>{product.address}</p>
            <p>{`${product.zipCode} ${product.zipArea}`}</p>
            <p>{product.country}</p>
          </Div>
        </Div>
        <Div width="100%" horizontal="right">
          <Div width={['100%', '90%', '200px', '200px', '200px']} horizontal="right">
            <p>{`${product.shippingService}`}</p>
            <p>{`${product.packageSize}`}</p>
            <p>{`Shipping cost: ${product.shippingCost} ${product?.currency}`}</p>
          </Div>
        </Div>
      </Div>
      <Div height="30px" />
      <Div width="100%" style={{ padding: '0px 20px 0px 20px' }}>
        {
          providers.map(({ provider, products }, i) => (
            <Div width="100%" key={provider}>
              <Div width="100%" horizontal="at" row>
                <p>{provider}</p>
                <Button color={check[provider] ? 'success' : 'tumblr'} style={{ height: '25px', width: '160px' }} onClick={() => handleArrived(provider)}>
                  {check[provider] ? 'Arrived' : 'I have arrived'}
                </Button>
              </Div>
              <Table
                tableHead={['', 'Product', 'Size / Color', 'Options', 'QTY', 'Price/u', 'total', '']}
                tableData={products.map((val) => (
                  [
                    <Photo photo={val.photo} idp={`${val.color}${val.size}${val.id}`} />,
                    <Name {...val} />,
                    <SizeColor {...val} />,
                    <Options {...val} />,
                    val.qty,
                    (val.price + (val.price * product.TVA)).toFixed(2), ((val.price * val.qty) + ((val.price * val.qty) * product.TVA)).toFixed(2)
                  ]
                ))}
                customCellClasses={[classes.photoCell, ...[1, 2, 3, 4, 5, 6, 7].map(() => classes.littleCenter)]}
                customClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                customHeadCellClasses={[classes.littleCenter, classes.left, ...[2, 3, 4, 5, 6, 7].map(() => classes.littleCenter)]}
                customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                startRowsPerPage={5}
                customRowPerPageList={[5]}
                tableShopping
                notEmptyRows
              />
            </Div>
          ))
        }
      </Div>
      <Div height="30px" />
    </SweetAlert>
  );
};

export default SweetCheckOrder;

/*

      <Div width="100%" horizontal="left">
        <pre style={{ width: '100%', textAlign: 'left' }}>{JSON.stringify(senderMails, null, 2)}</pre>
      </Div>

*/
