import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'component';
import Table from '@/components/Table/Table';
import PrintButton from './PrintButton';

const formatRow = (val, i, user) => {
  const objetDate = new Date(val.date);
  const formDate = `${objetDate.getDay()}/${objetDate.getMonth()}/${objetDate.getFullYear()}`;
  const total = val.products.map((val) => val.prix * val.qty).reduce((a, b) => a + b);
  return [i, val.idBilling, formDate, val.zipArea, val.country, `${total + val.shippingCost} ${val?.currency}`, <PrintButton product={{ ...val, formDate, total }} user={user} />];
};

export default function SubTable(props) {
  const {
    rowData = { billings: [], user: {} }
  } = props;

  return (
    <Div width="100%" horizontal="right" style={{ background: '#01070705' }}>
      <Div width="calc(100% - 100px)">
        <Table
          tableHead={['#', 'Billing ID', 'Date', 'Area', 'Country', 'total', '']}
          tableData={[...rowData.billings.map((val, i) => formatRow(val, i, rowData.user))]}
          minimal
        />
        <Div height="40px" />
      </Div>
    </Div>
  );
}

SubTable.propTypes = {
  rowData: PropTypes.any
};
