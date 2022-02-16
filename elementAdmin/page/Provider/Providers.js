import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Div, redux, Button } from 'component';
import Hidden from '@material-ui/core/Hidden';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Span from '@/components/Typography/Spam';
import OrderTableProvider from './OrderTableProvider';
import DialogAddProvider from './DialogAddProvider';
import ActionsButtons from './ActionsButtons';

// core
import Table from '@/components/Table/Table';

// components
import DataProvider from './DataProvider';

const Providers = ({ addNew, editProvider, deleteProvider }) => {
  const [{ providers, users, productList }] = redux();
  const { list = {} } = providers;

  // const list = {
  //   Hedon: {
  //     nif: '123456',
  //     name: 'Hedon',
  //     manager: 'Andres Caballero',
  //     country: 'Switzerland',
  //     city: 'Genève',
  //     address: 'Avenu du la rue, 0',
  //     zip: '1200',
  //     telephone: '+41782160212',
  //     email: 'myadress@mail.com',
  //     iban: '4242 - 4242 - 4242 - 4242',
  //     bic: 'SADREW',
  //     orders: [
  //       {
  //         idBilling: '682021_0',
  //         user: 'andresvcc88@gmailcom',
  //         products: [0],
  //       }
  //     ],
  //     date: '2021-08-18T14:20:47.385Z',
  //     visible: 'true',
  //   }
  // };

  const parseOrder = (orders) => orders.map(({ user, idBilling, products }) => {
    const currentBilling = users[user]?.billings[idBilling];
    return {
      user,
      billing: {
        idBilling,
        email: currentBilling?.email,
        fname: currentBilling?.fname,
        lname: currentBilling?.lname,
        address: currentBilling?.address,
        zipCode: currentBilling?.zipCode,
        zipArea: currentBilling?.zipArea,
        country: currentBilling?.country,
        shippingService: currentBilling?.shippingService,
        packageSize: currentBilling?.packageSize,
        estimatedShippingDelay: currentBilling?.estimatedShippingDelay,
        payment: currentBilling?.payment.payCode,
        date: currentBilling?.date,
        payDate: currentBilling?.payment.date,
        currency: currentBilling?.currency,
      },
      product: currentBilling?.products.filter((product, i) => products.indexOf(i) !== -1).map((billingProduct) => ({
        ...billingProduct,
        originalPrice: productList[billingProduct.name].price,
        originalCurrency: productList[billingProduct.name].currency,
      }))
    };
  });

  const providersList = useMemo(() => Object.values(list).filter(({ visible }) => visible !== 'false').map((provider) => ([
    provider.name,
    provider.country,
    provider.city,
    provider.email,
    JSON.stringify(provider.orders.length),
    <Div width="100%" horizontal="left" row>
      <GridContainer spacing={0}>

        <GridItem num={[1, 1, 3, 3, 3]}>
          <Hidden mdDown>
            <Div horizontal="left">
              <ActionsButtons provider={provider} editProvider={editProvider} deleteProvider={deleteProvider} />
              <DataProvider provider={provider} />
            </Div>
          </Hidden>
        </GridItem>
        <GridItem num={[12, 12, 12, 9, 8]}>
          <OrderTableProvider orders={parseOrder(provider.orders)} />
        </GridItem>

      </GridContainer>
    </Div>
  ])), [list]);

  return (
    <Div width="100%">
      <Div width="100%" vertical="top">
        <Table
          stickyHeader
          tableShopping
          hover
          collapse
          tableHeaderColor="primary"
          tableHead={['Name', 'Country', 'City', 'Mail', 'Orders']}
          tableData={providersList}
        />
      </Div>
      <Div width="100%" horizontal="left" style={{ padding: '15px' }}>
        <DialogAddProvider addNew={addNew} />
      </Div>
    </Div>
  );
};

Providers.propTypes = {};

export default Providers;
