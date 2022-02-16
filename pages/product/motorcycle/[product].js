import React, { memo, useState, useEffect } from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { useRouter } from 'next/router';
// components
import { Div } from 'components';
import { redux } from 'component';
import dynamic from 'next/dynamic';
import Spam from '@/components/Typography/Spam';
// layout
import Layout from '@/layouts/Default2';
// element
import Scroll from '@/elementsClient/Scroll/Scroll';

const SectionProduitPhoto = dynamic(() => import('@/elementsClient/Sections/ProductUnique/productUniqueMotorcycleVideo'), { loading: () => <Div style={{ width: '100%', height: '400px' }}> Loading ...</Div>, ssr: false });

const Page = memo(({ product, productList, useSocketHook }) => {
  const router = useRouter();
  const id = parseInt(router.query.product, 10);

  const [productPilot, setProductPilot] = useState([]);
  useEffect(() => {
    setProductPilot(productList);
  }, [productList]);

  return (
    <Div width="100%" style={{ minHeight: '700px' }} vertical="top">
      <Div width="100%" height={['80px', '120px', '120px', '120px', '120px']} />
      <SectionProduitPhoto id={id} product={product} useSocketHook={useSocketHook} />
      <Div width="100%" height="50px" />
      <Div width={['91%', '91%', '96%', '96%', '96%']} height="40px" horizontal="left">
        <Spam type="suggestionFont">You may also like</Spam>
      </Div>
      <Scroll products={productPilot} />
      <Div width="100%" height="50px" />
    </Div>
  );
});

function Product(props) {
  const {
    user, selectProduct, ...rest
  } = props;

  const useSocketHook = useSocket(user);
  const [{ productList, localCurrency, currencyRates }] = redux();
  const productsPilot = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Pilot').splice(0, 7), [productList]);
  const selectProductWithCurrentPrix = React.useMemo(() => ({ ...selectProduct, price: (Math.round(((selectProduct?.price / currencyRates[selectProduct?.currency]) * currencyRates[localCurrency]) * 100) / 100) }), [selectProduct, localCurrency]);

  return (
    <Layout useSocketHook={useSocketHook}>
      <Page productList={Object.values(productsPilot).filter((val) => val.visibility === true && val.hidden === false)} product={selectProductWithCurrentPrix} user={user} useSocketHook={useSocketHook} {...rest} />
    </Layout>
  );
}

export default Product;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  const { product } = context.query;
  const Json = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/product.json`);
  const selectProduct = Json.get(product);
  if (!user) return { props: { selectProduct } };
  return { props: { user, selectProduct } };
};
