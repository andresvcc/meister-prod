import React, { useState, useMemo, useEffect } from 'react';
import { Div, hookDeviceInfo } from 'component';
import { useRouter } from 'next/router';
import PilotMap2 from '@/elementsClient/Sections/PilotSection/PilotSectionCards2';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';

const sortProduct = (code, list) => {
  if (code === 1) return [...list].sort((a, b) => ((b?.price - a?.price) > 1 ? 1 : -1) - ((a.id - b.id) > 1 ? 1 : -1));
  if (code === 2) {
    return [...list].sort((a, b) => {
      if (a.popularity && b.popularity) return a.popularity - b.popularity;
      return false;
    });
  }
  if (code === 3) return [...list].sort((a, b) => a?.price - b?.price);
  if (code === 4) return [...list].sort((a, b) => b?.price - a?.price);
  if (code === 5) return [...list].sort((a, b) => b.id - a.id);
  if (code === 6) return [...list].sort((a, b) => a.id - b.id);
  return list;
};

export default function MapProduits({ productList, filter = {} }) {
  const [productPilot, setProductPilot] = useState([]);
  const router = useRouter();
  const { width } = hookDeviceInfo();

  useEffect(() => {
    const newProductList = productList.filter((item) => {
      const arr = Object.keys(filter).map((key) => {
        if (key === 'sort') return true;
        if (filter[key] === 'All') return true;
        if (filter[key] === 'none') return true;
        if (key === 'size') {
          if (item.sizesType === undefined || item.sizesType.toLocaleLowerCase().split(',').indexOf(filter[key].toLocaleLowerCase()) === -1) return false;
          return true;
        }
        if (key === 'color') {
          return item.colors.map((a) => a.colorName).indexOf(filter[key]) !== -1;
        }

        if (item[key] === undefined || item[key].toLocaleLowerCase() !== filter[key].toLocaleLowerCase()) return false;
        return true;
      });
      return arr.indexOf(false) === -1;
    });
    const sortList = sortProduct(parseInt(filter.sort, 10), newProductList);
    setProductPilot(sortList);
  }, [filter, productList]);

  return (
    <Div width="100%" style={{ marginTop: '100px' }}>
      <GridContainer spacing={2} style={{ width: '100%', maxWidth: '1500px', minHeight: width >= 1280 ? '80vh' : 'auto' }}>
        <GridItem num={[12, 12, 12, 12, 12]}>
          <PilotMap2 productPilot={productPilot} filter={filter} />
        </GridItem>
      </GridContainer>
    </Div>
  );
}
