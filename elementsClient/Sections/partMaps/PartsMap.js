import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Div, redux, hookDeviceInfo } from 'component';
import Slider from './Slider';
import SliderImages from './SliderImages';
import PartsSVG from './partsSVG';
import MapProduits from './MapProduits';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const defaultParts = { categories: { Parts: {} }, brand: [] };

const Divider = ({ width = '80%' }) => (
  <Div width={width} row>
    <Div width="40%" style={{ borderBottom: '1px solid #dcdcdc' }} />
    <Div width="20%" style={{ borderBottom: '1px solid transparent' }} />
    <Div width="40%" style={{ borderBottom: '1px solid #dcdcdc' }} />
  </Div>
);

export default function PartMap(props) {
  const classes = useStyles();
  const { user, ...rest } = props;
  const [{
    productList, globalSettings = defaultParts, localCurrency, currencyRates, tva
  }, dispatch] = redux();

  const brand = ['Universal', 'BMW', 'Triumph', 'Kawasaki', 'Suzuki', 'Ducati', 'Yamaha', 'Honda', 'Moto Guzzi'];
  // 'Gazzini', 'Meister', 'Atto'

  const router = useRouter();

  const toHome = () => {
    router.push({
      pathname: '/',
      query: { ...(router.query || {}) },
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const filter = useMemo(() => {
    const { query } = router;
    const {
      subcategorie = 'none', sort = 0, color = 'none', categorie = 'Parts', brand = 'none', genre = 'none', size = 'none'
    } = query;

    return {
      sort, brand, categorie, subcategorie, genre, color, size
    };
  }, [router]);

  const setSelect = (data) => {
    router.push({
      // pathname: router.pathname,
      query: { ...router.query, ...data },
    }, undefined, { scroll: false });
  };

  const subcategorie = useMemo(() => Object.keys(globalSettings.categories.Parts), [globalSettings.categories.Parts]);
  const genre = useMemo(() => Object.keys({ ...globalSettings.categories.Parts[filter.subcategorie] }), [globalSettings.categories.Parts, subcategorie, filter]);
  const useSelector = useState(-1);
  const [selector, setSelector] = useSelector;

  const calcPrice = (val) => {
    const price = (Math.round(((val?.price / currencyRates[val?.currency]) * currencyRates[localCurrency]) * 100) / 100);
    return price + price * tva;
  };

  const productsPilotAide = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Parts').map((val) => ({ ...val, price: calcPrice(val) })), [productList, localCurrency, tva]);
  const productsParts = React.useMemo(() => [...productsPilotAide.map((productRoot) => productRoot.colors.map((color, i) => ({
    ...productRoot,
    colors: [color],
    id: `${productRoot.id}_${i}`
  }))), [], []].reduce((a, b) => ([...a, ...b])).filter((a) => a.id !== undefined), [productsPilotAide]);

  return (
    <Div width="100%" style={{ marginBottom: '25px' }}>
      <Div width="100%">
        <Divider />
        <SliderImages
          arr={brand}
          images={{ g: 0 }}
          onChange={(val) => setSelect({ ...filter, brand: val })}
          slidesToShow={[1, 3, 3, 5, 5]}
        />
        <Divider />
      </Div>
      <Div width="100%" height="60vw" style={{ maxHeight: '600px', minHeight: '300px', }}>
        <PartsSVG useSelector={useSelector} onClick={(val) => setSelect({ ...filter, subcategorie: val, genre: 'none' })} />
      </Div>
      <Div width="100%">
        <Divider />
        <Slider
          arr={subcategorie}
          selected={filter.subcategorie}
          onChange={(val) => setSelect({ ...filter, subcategorie: val, genre: Object.keys(globalSettings.categories.Parts[val])[0] || 'none' })}
          slidesToShow={[1, 3, 3, 5, 5]}
        />
        <Divider />
      </Div>
      {
          genre.length > 0 ? (
            <Div width="100%">
              <Slider
                arr={genre}
                onChange={(val) => setSelect({ ...filter, genre: val })}
                little
                slidesToShow={[1, 1, 1, 3, 3]}
              />
              <Divider width="50%" />
            </Div>
          ) : (
            <Div height="6vh" />
          )
      }
      <MapProduits productList={productsParts} filter={filter} />
    </Div>
  );
}
