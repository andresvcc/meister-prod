import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Div, hookDeviceInfo } from 'component';
import Image from 'next/image';
import Link from 'next/link';
import Hidden from '@material-ui/core/Hidden';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import Table from '@/components/Table/Table';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

const OrderTableProvider = memo(({ orders }) => {
  const ordersList = useMemo(() => orders.map((order) => ([
    order.user,
    order.billing.idBilling,
    order.billing.date,
    <Div width="100%" horizontal="left">
      {
        order.product?.map(({ originalCurrency }) => originalCurrency).length <= 1 ? (
          <Div width="100%" horizontal="left" row>
            <p>Original: </p>
          &nbsp;
            <p>{order.product.map(({ originalPrice }) => originalPrice).reduce((a, b) => a + b)}</p>
          &nbsp;
            <p>{order.product.map(({ originalCurrency }) => originalCurrency).reduce((a, b) => `${a}, ${b}`)}</p>
          </Div>
        ) : null
      }
      <Div width="100%" horizontal="left" row>
        <p>Sales: </p>
        &nbsp;&nbsp;
        <p>{order?.product?.map(({ price }) => price).reduce((a, b) => a + b)}</p>
        &nbsp;
        <p>{order?.billing?.currency}</p>
      </Div>
    </Div>,
    <Div width="100%" style={{ background: '#fdfbf6', borderTop: 'solid 1px #cacaca' }}>
      <GridItem num={[12, 12, 12, 12, 12]}>
        <GridContainer spacing={1} alignItems="flex-start">
          <GridItem num={[2, 2, 2, 2, 2]} />
        </GridContainer>
      </GridItem>
      {order?.product?.map((product, i) => (
        <GridContainer key={`${i + 1}`} spacing={1} alignItems="flex-start">
          <Hidden mdDown>
            <GridItem num={[true, true, true, 2, 2]} zeroMinWidth>
              <Div width="100%" height="100px" style={{ position: 'relative' }}>
                <Image quality={5} priority src={product.photo ?? '/static/images/notPhoto.png'} layout="fill" objectFit="cover" />
              </Div>
            </GridItem>
          </Hidden>
          <GridItem num={[4, 4, 4, 4, 4]}>
            <Div horizontal="left" height="100px" style={{ fontSize: '16px' }}>
              <Link href={`${product.pathname}`} passHref>
                <a href={`${product.url}`}>{`${product.name}`}</a>
              </Link>
              <p>{`Color: ${product.colorName}`}</p>
              <p>{`Size: ${product.sizeValue}`}</p>
            </Div>
          </GridItem>
          <GridItem num={[4, 4, 4, 3, 3]}>
            <Div width="100%" horizontal="left" height="100px" style={{ color: 'white', fontSize: '15px' }}>
              <Div width="100%" height="38px" row style={{ borderRadius: '5px', background: '#314f6d', marginBottom: '5px' }}>
                <DataUsageIcon />
                &nbsp;&nbsp;
                <p>{`${product.originalPrice}  ${product.originalCurrency}`}</p>
              </Div>
              <Div width="100%" height="38px" row style={{ borderRadius: '5px', background: '#2f5c47' }}>
                <CreditCardIcon />
                &nbsp;&nbsp;
                <p>{`${product.price} ${product.currency}`}</p>
              </Div>
            </Div>
          </GridItem>
          <Hidden xsDown>
            <GridItem num={[4, 4, 4, 3, 2]}>
              <Div width="100%" height="100px" vertical="top" style={{ padding: '10px 0px', color: 'white', fontSize: '16px' }}>
                {
                  product.opt1Key1 !== '' ? (
                    <Div style={{
                      borderRadius: '5px', background: '#3a7f7b', padding: '3px 15px', width: '100%', marginBottom: '3px'
                    }}
                    >
                      {product.opt1Key1}
                    </Div>
                  ) : null
              }
                {
                  product.opt1Key2 !== '' ? (
                    <Div style={{
                      borderRadius: '5px', background: '#78437f', padding: '3px 15px', width: '100%', marginBottom: '3px'
                    }}
                    >
                      {product.opt1Key2}
                    </Div>
                  ) : null
              }
                {
                  product.opt1Key3 !== '' ? (
                    <Div style={{
                      borderRadius: '5px', background: '#a08454', padding: '3px 15px', width: '100%'
                    }}
                    >
                      {product.opt1Key3}
                    </Div>
                  ) : null
              }
              </Div>
            </GridItem>
          </Hidden>

        </GridContainer>
      ))}
    </Div>,
  ])), [orders]);

  return (
    <Div width="100%" horizontal="left" style={{ padding: '5px' }}>
      <Table
        tableHead={['User', 'idBilling', 'Date', 'Amount']}
        notPagination
        notbody
      />
      <Table
        // stickyHeader
        stickyHeader
        // minimal
        hover
        striped
        collapse
        tableHeaderColor="primary"
        // tableHead={['User', 'idBilling', 'Date', 'Amount']}
        tableData={ordersList}
        startRowsPerPage={ordersList.length}
        customRowPerPageList={[]}
        maxHeight={300}
        notPagination
        // notPagination
      />
    </Div>
  );
});

OrderTableProvider.propTypes = {};

export default OrderTableProvider;

/*
    <Div>
      Actions
    </Div>,
    <Div width="100%" horizontal="left" row>
      <GridContainer spacing={1} alignItems="flex-start">
        <GridItem num={[12, 12, 12, 12, 12]}>
          data
        </GridItem>
      </GridContainer>
    </Div>
*/
