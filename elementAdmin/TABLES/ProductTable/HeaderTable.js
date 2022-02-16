import React from 'react';
import { Div } from 'components';
import SubTable from '@/components/MaterialTable/subTable';

const config = {
  action: (event, rowData) => console.log(rowData),
  columns: [
    {
      sorting: false,
      filtering: false,
      grouping: false,
      title: '',
      field: 'subcategorie',
      headerStyle: {
        width: 180,
      },
      render: (rowData) => (
        <img
          style={{
            width: 220, height: 120, position: 'relative', top: -10, objectFit: 'contain'
          }}
          src={`${rowData.colors[0] ? rowData.colors[0].photos[0] : []}`}
          alt={`${rowData.product}`}
        />
      ),
    },
    {
      title: 'Product',
      field: 'product',
      render: (rowData) => (
        <div>
          <p>{rowData.languages.EN.nameProduct}</p>
          <p>{rowData.family}</p>
        </div>
      ),
    },
    {
      title: 'Classification',
      field: 'multiCategorie',
      render: (rowData) => (
        <div>
          <p>{`${rowData.categorie}, ${rowData.subcategorie}`}</p>
          <p>{rowData.genre}</p>
        </div>
      ),
    },
    {
      title: 'Brand',
      field: 'brand',
      render: (rowData) => (
        <div>
          <p>{rowData.brand}</p>
        </div>
      ),
    },
    {
      title: 'Price',
      field: 'price',
      render: (rowData) => (
        <div>
          <p style={{ width: '120px' }}>{`${rowData?.price} ${rowData?.currency}`}</p>
        </div>
      )
    },
  ],
  data: [],
  detailPanel: [
    {
      icon: 'arrow_drop_down',
      render: (rowData) => (
        <SubTable key={rowData.product} rowData={rowData} />
      )
    },
  ]
};

export default config;
