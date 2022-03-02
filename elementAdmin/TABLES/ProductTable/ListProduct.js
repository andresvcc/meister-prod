/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Div } from 'components';
import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@/components/CustomButtons/Button';
import SubTable from '@/components/MaterialTable/subTable';
import Table from '@/components/MaterialTable/table';

const data1 = {
  action: (event, rowData) => console.log(rowData),
  columns: [
    {
      sorting: false,
      filtering: false,
      grouping: false,
      title: 'Photo',
      field: 'photo',
      render: ({ name_product, photo, ...rest }) => (
        <img
          style={{ width: 80, height: 60 }}
          src="/static/products/16c3971a-12ce-4ef9-8bcd-8446e6a829be.png"
          alt={`${name_product} ${photo}`}
        />
      ),
    },
    {
      title: 'Category',
      field: 'category',
    },
    {
      title: 'SubCategory',
      field: 'subCategory',
    },
    { title: 'Product', field: 'product' },
    { title: 'Brand', field: 'brand' },
    { title: 'Stock', field: 'stock' },
    { title: 'Price', field: 'price' },
    {
      title: 'Type',
      field: 'type',
      lookup: {
        1: 'sportives',
        2: 'customs',
        3: 'Grand Tourisme',
        4: 'roadsters',
        5: 'routières',
        6: 'cross',
        7: 'Néo-Rétro',
        8: 'Retro',
        9: 'trail'
      },
    },
  ],
  data: [
    {
      category: 'Pilot',
      subCategory: 'Helmets',
      product: 'moto freestyle',
      brand: 'BMW',
      model: 'Aeron',
      year: 2019,
      stock: 5,
      type: 2,
      price: 8000,
      photo: 'moto_1.png',
      editable: false,
      setParameters: false,
      family: [1, 2, 3],
      link_product: [1, 2, 3],
      visibility: true,
      description_product: 'Description de product',
      attribute: [{ name: 'name_data', value: 'value', id: 0 }, { name: 'name_data', value: 'value', id: 1 }],
      id: 1
    },
    {
      category: 'Pilot',
      subCategory: 'Helmets',

      product: 'moto FR',
      brand: 'BMW',
      model: 'Lion',
      year: 2018,
      stock: 1,
      type: 3,
      price: 10000,
      photo: 'moto_2.png',
      editable: true,
      setParameters: true,
      family: [1, 2, 3],
      link_product: [1, 2, 3],
      description_product: 'Description de product',
      attribute: [{ name: 'name_data', value: 'value', id: 0 }],
      id: 2
    },
    {
      category: 'Pilot',
      subCategory: 'Helmets',

      brand: 'BMW',
      model: 'caver',
      year: 2017,
      stock: 3,
      type: 4,
      price: 10000,
      photo: 'moto_3.png',
      editable: true,
      setParameters: true,
      family: [1, 2, 3],
      link_product: [1, 2, 3],
      attribute: [{ name: 'name_data', value: 'value', id: 0 }],
      description_product: 'Description de product',
      id: 3
    },
    {
      category: 'Pilot',
      subCategory: 'Helmets',

      product: 'moto Vert',
      brand: 'BMW',
      model: 'Kiwi',
      year: 2017,
      stock: 1,
      type: 5,
      price: 10000,
      photo: 'moto_4.png',
      editable: true,
      setParameters: true,
      family: [1, 2, 3],
      link_product: [1, 2, 3],
      attribute: [{ name: 'name_data', value: 'value', id: 0 }],
      description_product: 'Description de product',
      id: 4
    },
    {
      category: 'Pilot',
      subCategory: 'Helmets',

      product: 'moto Vert',
      brand: 'BMW',
      model: 'Kiwi',
      year: 2017,
      stock: 1,
      type: 5,
      price: 10000,
      photo: 'moto_4.png',
      editable: true,
      setParameters: true,
      family: [1, 2, 3],
      link_product: [1, 2, 3],
      attribute: [{ name: 'name_data', value: 'value', id: 0 }],
      description_product: 'Description de product',
      id: 5
    },
    {
      category: 'Pilot',
      subCategory: 'Helmets',

      product: 'moto Vert',
      brand: 'BMW',
      model: 'Kiwi',
      year: 2017,
      stock: 1,
      type: 5,
      price: 10000,
      photo: 'moto_4.png',
      editable: true,
      setParameters: true,
      family: [1, 2, 3],
      link_product: [1, 2, 3],
      attribute: [{ name: 'name_data', value: 'value', id: 0 }],
      description_product: 'Description de product',
      id: 6
    },
  ],
  detailPanel: [
    {
      icon: 'arrow_drop_down',
      render: ({ product, ...rest }) => (
        <SubTable key={product} rowData={{ product, ...rest }} />
      )
    },
  ]
};

function OrdersTables(props) {
  const addRow = (data) => {

  };

  const editRow = (data) => {

  };

  const delRow = (data) => {

  };

  const visivilityRow = (data) => {

  };

  return (
    <Div width="calc(100% - 20px)" vertical="top">
      <Table
        data={data1}
        onAddRow={addRow}
        onEditRow={editRow}
        onDelRow={delRow}
        onVisibility={visivilityRow}
      />
    </Div>
  );
}

export default OrdersTables;
