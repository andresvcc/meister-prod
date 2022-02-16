import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Search from '@material-ui/icons/Search';
import {
  redux, Div, FlexDiv, hookDeviceInfo,
} from 'components';
import ProductCard from 'elementsClient/Cards/ProductCard';
import productList from '@/assets/JsonDBU/product.json';

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';

export default function SearchDialog(props) {
  const { list } = props;
  const router = useRouter();

  const goToProduct = (id) => {
    router.push({
      pathname: `/product/${id}`,
    }).then(() => window.scrollTo(0, 0));
  };

  return (
    <div className="flexBoxcontainer">
      {list.map((val, i) => (
        <div key={`${i + 1}`} className="flex-itemBx">
          <Div onClick={() => goToProduct(val.product)} width={[200, 210, 207, 207, 'auto']}>
            <ProductCard product={val} />
          </Div>
        </div>
      ))}
    </div>
  );
}
