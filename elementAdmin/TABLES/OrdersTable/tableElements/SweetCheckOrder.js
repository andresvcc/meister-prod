import React, { useEffect, useState, useMemo } from 'react';
import { redux, Div, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Link from 'next/link';
import Popover from '@material-ui/core/Popover';
import Image from 'next/image';
import SweetAlert from 'react-bootstrap-sweetalert';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
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
  const {
    providers, product, successAlert, hideAlert, useSocketHook
  } = props;
  const [disable, setDisable] = useState(true);
  const [awaitRes, setAwaitRes] = useState('');

  const [check, setCheck] = useState(product.products.map(() => false));
  const [selectedProviders, setSelectedProviders] = useState({});

  const [emit, socket] = useSocketHook;

  const [mailBox, setMailBox] = useState();
  const [senderMails, setSenderMails] = useState({});

  useEffect(() => {
    if (check.indexOf(false) === -1 && Object.keys(senderMails).length >= Object.keys(selectedProviders).length) setDisable(false);
    else if (disable === false) setDisable(true);
  }, [senderMails]);

  const handleCheck = (i, product, provider) => {
    const temp = [...check];
    temp[i] = !check[i];
    setCheck(temp);
    setSelectedProviders({
      ...selectedProviders,
      [provider]: [...(selectedProviders[provider] || []), product]
    });
  };

  const ButtonsCheck = (props) => {
    const { i, product } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleSelectProvider = (provider) => {
      setAnchorEl(null);
      handleCheck(i, product, provider);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button color="github" className={classes.actionButton} onClick={handleClick}>
          <p>
            Provider
            &nbsp;
            <GroupWorkIcon />
          </p>
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          style={{ zIndex: 9999 }}
        >

          <Div width="100%" style={{ padding: '20px' }}>
            <Span type="subtitle2">
              Select Provider DropShipping
            </Span>
            {['Meister', ...product.providers].map((val, i) => (
              <Button key={`${i + 1}`} color="github" style={{ width: '100%' }} onClick={() => handleSelectProvider(val)}>
                <p>{val}</p>
              </Button>
            ))}
          </Div>
        </Popover>
      </>
    );
  };

  const Photo = (props) => {
    const {
      photo, idp
    } = props;
    return (
      <Div width="100%" height="80px" style={{ position: 'relative', width: '100px' }}>
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

  const contentBodyTable = useMemo(() => product.products.map((val, i) => ([
    <Photo photo={val.photo} idp={`${val.color}${val.size}${val.id}`} />,
    <Name {...val} />,
    <SizeColor {...val} />,
    <Options {...val} />,
    val.qty,
    (val.price + (val.price * 0.16)).toFixed(2), ((val.price * val.qty) + ((val.price * val.qty) * 0.16)).toFixed(2),
    <ButtonsCheck i={i} product={val} />])),
  [product.products, check]);

  const contentBodyTableFiltred = useMemo(() => contentBodyTable.filter((val, i) => check[i] === false), [contentBodyTable]);

  const handleSetTreatment = async ({
    message, provider, products
  }) => {
    await emit('sendMail', {
      to: provider.email,
      objet: `Comande ${product.fname} ${product.lname} ${product.idBilling}`,
      message,
      res: 'checkOrderResMail',
      provider,
      products
    });

    setAwaitRes(`${provider.name}`);

    //  setSenderMails({
    //    ...senderMails,
    //    [provider.name]: {
    //      provider,
    //      message,
    //      products
    //    }
    //  });

    setMailBox();
  };

  const checkOrderResMail = ({
    ok, message, provider, products, senderMails, mailCheck
  }) => {
    setSenderMails({
      ...senderMails,
      [provider.name]: {
        provider,
        message,
        products,
        mailCheck: mailCheck.response,
      }
    });

    setAwaitRes('');
  };

  useEffect(() => {
    if (socket) {
      socket.on('checkOrderResMail', (data) => checkOrderResMail({ ...data, senderMails }));
    }
  }, [socket, senderMails]);

  const handleAcceptComande = ({
    message, provider, products
  }) => {
    setSenderMails({
      ...senderMails,
      [provider]: {
        provider: { name: 'Meister' },
        message: `Accept order ${(new Date()).toLocaleString()}`,
        products
      }
    });

    setMailBox();
  };

  const openMailBox = ({ provider, products }) => {
    setMailBox(
      <MailBoxEditor handleSetTreatment={handleSetTreatment} setMailBox={setMailBox} order={product} products={products} provider={providers[provider]} />
    );
  };

  return (
    <SweetAlert
      custom
      style={{
        display: 'block', marginTop: '-100px', width: '100%', maxWidth: '950px',
      }}
      title={`ID Order: ${product.idOrder}`}
      onConfirm={() => successAlert(senderMails, product)}
      onCancel={() => hideAlert()}
      confirmBtnCssClass={`${classes.button} ${disable ? classes.disabled : classes.primary}`}
      cancelBtnCssClass={`${classes.button} ${classes.link}`}
      confirmBtnText="Yes, all good"
      cancelBtnText="Cancel"
      showCancel
    >
      {mailBox}
      <Div width="100%">
        <Div width={['100%', '100%', '450px', '450px', '450px']} horizontal="left">
          <p>please check all information before submitting!</p>
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
          [...check].reduce((a, b) => a && b) ? (
            Object.entries(selectedProviders).map(([provider, products], i) => (
              <Div width="100%" key={`${i + 1}`} horizontal="left" style={{ borderBottom: '2px solid #eaeaea', marginBottom: '20px' }}>
                <Div width="100%" row horizontal={senderMails[provider] === undefined || (provider === 'Meister' && senderMails[provider] === undefined) ? 'at' : 'left'}>
                  <Span type="h2">{provider}</Span>
                  {

                      `${provider}` === 'Meister' && senderMails[provider] === undefined ? (
                        <Button color="github" style={{ height: '25px' }} onClick={() => handleAcceptComande({ provider, products })}>
                          Accept Commande
                        </Button>
                      )
                        : `${provider}` === 'Meister' && senderMails[provider] !== undefined ? (
                          <CheckBoxIcon />
                        ) : senderMails[provider] === undefined ? (
                          awaitRes === provider ? (
                            <div>
                              <CircularProgress disableShrink style={{ width: '20px', height: '20px', color: 'black' }} />
                              &nbsp;&nbsp;
                              <span>Loading...</span>
                            </div>
                          ) : (
                            <Button color={awaitRes === provider ? 'transparent' : 'github'} style={{ height: '25px' }} onClick={() => openMailBox({ provider, products })}>
                              Set treatment
                            </Button>
                          )
                        ) : (
                          <CheckBoxIcon />
                        )
                  }
                </Div>

                {
                    awaitRes === provider && senderMails[provider] === undefined ? (
                      <Div width="100%" height="300px">
                        <CircularProgress disableShrink style={{ width: '40px', height: '40px', color: 'black' }} />
                      </Div>
                    ) : (
                      <Table
                        tableHead={['', 'Product', 'Size / Color', 'Options', 'QTY', 'Price/u', 'total']}
                        tableData={products.map((val) => ([
                          <Photo photo={val.photo} idp={`${val.color}${val.size}${val.id}`} />,
                          <Name {...val} />,
                          <SizeColor {...val} />,
                          <Options {...val} />,
                          val.qty,
                          `${(val.price + (val.price * 0.16)).toFixed(2)} ${val.currency}`,
                          `${((val.price * val.qty) + ((val.price * val.qty) * 0.16)).toFixed(2)} ${val.currency}`,
                        ]))}
                        customCellClasses={[classes.photoCell, ...[1, 2, 3, 4, 5, 6, 7].map(() => classes.littleCenter)]}
                        customClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                        customHeadCellClasses={[classes.littleCenter, classes.left, ...[2, 3, 4, 5, 6, 7].map(() => classes.littleCenter)]}
                        customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
                        startRowsPerPage={5}
                        customRowPerPageList={[5]}
                        tableShopping
                        notEmptyRows
                      />
                    )
                  }

              </Div>
            ))
          ) : (
            <Table
              tableHead={['', 'Product', 'Size / Color', 'Options', 'QTY', 'Price/u', 'total', '']}
              tableData={contentBodyTableFiltred}
              customCellClasses={[classes.photoCell, ...[1, 2, 3, 4, 5, 6, 7].map(() => classes.littleCenter)]}
              customClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
              customHeadCellClasses={[classes.littleCenter, classes.left, ...[2, 3, 4, 5, 6, 7].map(() => classes.littleCenter)]}
              customHeadClassesForCells={[0, 1, 2, 3, 4, 5, 6, 7]}
              startRowsPerPage={5}
              customRowPerPageList={[5]}
            />
          )
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
