import React, {
  useEffect, useState, memo, useRef
} from 'react';

import { useRouter } from 'next/router';
// components
import { Div, redux, hookDeviceInfo } from 'components';
// elements
import Carousel from './CarouselTest1';

const Scroll = memo(({
  products, setFilter, filter, categorie
}) => {
  const router = useRouter();
  const [{ globalSettings = { categorieFilter: {} } }] = redux();
  const { categorieFilter } = globalSettings;

  const hanldeClick = (option) => {
    setFilter({
      ...filter, subcategorie: option, color: 'none', size: 'none', sort: 0, categorie, brand: 'none', priceMin: 'none', priceMax: 'none', genre: 'none',
    });
  };

  const currentSubCategories = React.useMemo(() => (categorieFilter[filter.categorie] ? (Object.values(categorieFilter[filter.categorie])) : []), [categorieFilter, filter.categorie]);

  if (currentSubCategories.length <= 0) {
    return (
      <Div width="100%" height="240px">
        Loading...
      </Div>
    );
  }

  return (
    <Div width="100%" >
      <Carousel currentSubCategories={currentSubCategories} filter={filter} hanldeClick={hanldeClick} />
    </Div>
  );
});

export default Scroll;
