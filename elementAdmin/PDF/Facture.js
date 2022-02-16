// ancien pas utilisé - à supprimer
import React from 'react';
import { Div } from 'components';
import dynamic from 'next/dynamic';

const Table = dynamic(
  () => import('@/components/Table/Table'),
  { ssr: false }
);

const Facture = ({ product }) => {
  const total = [...product.products].map((val) => val.prix).reduce((a, b) => a + b);
  return (
    <div>
      <br />
      <Div width="660px" height="912px" vertical="at">
        <Div width="640px" horizontal="left">
          <Div width="640px" horizontal="at" row>
            <h3>Facture Meister</h3>
            <h6>{product.date}</h6>
          </Div>
          <br />
          <h4>{`N°:${product.idOrder}-${product.id}`}</h4>
          <br />
          <h5>Il faut encore definir le desing visuel de la facture</h5>
          <br />
          <br />
          <p>{`Estimated Shipping Delay: ${product.estimatedShippingDelay}`}</p>
          <br />
          <p>{product.name}</p>
          <p style={{ margin: 0 }}>{product.address}</p>
          <p style={{ margin: 0 }}>{`${product.zipCode} ${product.zipArea}`}</p>
          <p style={{ margin: 0 }}>{product.country}</p>
          <br />
          <h5>Product List</h5>
          <br />
          <Table
            tableShopping
            tableHeaderColor="primary"
            tableHead={['#', 'IDP', 'Name', 'Qty', 'subTotal', 'total']}
            tableData={[...product.products.map((val, index) => [index, `${val.id}${val.color}${val.size}`, val.name, val.qty, val.prix, (val.qty * val.prix)])]}
          />
          <br />
          <p>{product.mapStr}</p>
          <br />
          <Div row>
            <Div horizontal="right">
              <p style={{ margin: 0 }}>Shipping Cost :&nbsp;&nbsp;</p>
              <p style={{ margin: 0 }}>Product Cost :&nbsp;&nbsp;</p>
              <p style={{ margin: 0 }}>Total :&nbsp;&nbsp;</p>
            </Div>
            <Div horizontal="left">
              <p style={{ margin: 0 }}>{`${product.shippingCost} ${product?.currency}`}</p>
              <p style={{ margin: 0 }}>{`${total} ${product?.currency}`}</p>
              <p style={{ margin: 0 }}>{` ${product.shippingCost + total} ${product?.currency}`}</p>
            </Div>
          </Div>
          <br />
        </Div>
        <Div width="660px">
          <Div width="640px" horizontal="left">
            partie legal
          </Div>
        </Div>
      </Div>
    </div>
  );
};

export default Facture;
