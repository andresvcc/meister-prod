import React from 'react';
import { Div } from 'components';
import SubTable from '@/components/MaterialTable/subTable';
import TableVisuel from '@/components/MaterialTable/tableVisuel';

const data1 = {
  action: (event, rowData) => console.log(rowData),
  columns: [

    { title: 'Email', field: 'email' },
    { title: 'FirstName', field: 'firstName' },
    { title: 'LastName', field: 'lastName' },
    { title: 'Age', field: 'age' },
    { title: 'NumOrders', field: 'numOrders' },
    { title: 'Facture', field: 'facture' },
  ],
  data: [
    {
      id: 1,
      email: 'Antoine@Meister-Engineering.com',
      firstName: 'Antoine',
      lastName: 'Meister',
      age: 36,
      numOrders: 10,
      facture: 'PDF'

    },
    {
      id: 2,
      email: 'Antoine@Meister-Engineering.com',
      firstName: 'Alexis',
      lastName: 'Erne',
      age: 36,
      numOrders: 10,
      facture: 'PDF'

    },
    {
      id: 3,
      email: 'Antoine@Meister-Engineering.com',
      firstName: 'Antoine',
      lastName: 'Meister',
      age: 36,
      numOrders: 10,
      facture: 'PDF'

    },
    {
      id: 4,
      email: 'Antoine@Meister-Engineering.com',
      firstName: 'Antoine',
      lastName: 'Meister',
      age: 36,
      numOrders: 10,
      facture: 'PDF'

    },
    {
      id: 5,
      email: 'Antoine@Meister-Engineering.com',
      firstName: 'Antoine',
      lastName: 'Meister',
      age: 36,
      numOrders: 10,
      facture: 'PDF'
    },
  ],
  detailPanel: [
    {
      icon: 'arrow_drop_down',
      render: (rowData) => (
        <SubTable key={rowData.product} rowData={rowData} />
      )
    },
  ]
};

function ListUsers(props) {
  return (
    <Div width="calc(100% - 20px)" vertical="top">
      <h6>Liste des utilisateurs</h6>
      <TableVisuel
        data={data1}
      />
    </Div>
  );
}

export default ListUsers;
