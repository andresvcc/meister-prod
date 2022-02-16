import React, { useEffect, useState } from 'react';
import { Div } from 'components';
import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@/components/CustomButtons/Button';
import SubTable from './subTable';
// import Table from '@/components/MaterialTable/table';

const Table = dynamic(
  () => import('@/components/MaterialTable/table'),
  { ssr: false }
);

function OrdersTables(props) {
  const { billing = {}, users = {} } = props;

  const addRow = (data) => {

  };

  const editRow = (data) => {

  };

  const delRow = (data) => {

  };

  const data1 = {
    action: (event, rowData) => console.log(rowData),
    columns: [
      { title: '#', field: 'i', width: '10%' },
      { title: 'Customer', field: 'customer' },
      { title: 'Email', field: 'email' },
      { title: 'qty', field: 'noBillings', width: '10%' },
    ],
    data: [...Object.keys(billing).map((val, i) => {
      const { fname = '-', lname = '-', email = '-' } = users[val] || {};
      const billings = billing[val];

      return {
        i,
        customer: `${fname} ${lname}`,
        email,
        noBillings: billings.length,
        billings,
        user: {
          fname, lname, email
        }
      };
    })],
    detailPanel: [
      {
        icon: 'arrow_drop_down',
        render: ({ product, ...rest }) => (
          <SubTable key={product} rowData={{ product, ...rest }} />
        )
      },
    ]
  };

  return (
    <Table
      data={data1}
      noActions
      // onAddRow={addRow}
      // onEditRow={editRow}
      // onDelRow={delRow}
    />
  );
}

export default OrdersTables;
