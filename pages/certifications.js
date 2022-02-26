import React, {
  useEffect, useState, memo, useMemo, useRef
} from 'react';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { Div, redux, hookDeviceInfo } from 'components';
import { useRouter } from 'next/router';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/layouts/Default2';
import PilotMap2 from '@/elementsClient/Sections/PilotSection/PilotSectionCards2';
import { categories } from '@/assets/dataBase/BDCategories';
import PilotCategoriesList from '@/elementsClient/Sections/PilotSection/PilotFilters';
import FilterOptions from '@/elementsClient/Forms/filterPilot';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import PilotScroll from '@/elementsClient/Sections/PilotSection/PilotScroll';
import ImageGenerator from '@/elementsClient/ImageGenerator/ImageGenerator';
import FlexForm from '@/components/FlexForm/FlexForm';
import DialogFilter from '@/elementsClient/Sections/PilotSection/DialogFIlter';
import Button from '@/components/CustomButtons/Button';
// parts
import SliderImages from '@/elementsClient/Sections/partMaps/SliderImages';
import MapProduits from '@/elementsClient/Sections/partMaps/MapProduits';

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

const types = {
  sorting: {
    size: [12, 12, 12, 12, 12],
    type: 'option',
    required: true,
    options: {
      EN: ['Recommended', 'Popularity', 'Price low to High', 'Price High to Low', 'New In', 'Veteran Products'].map((val, i) => ({ value: i + 1, title: val })),
      FR: ['Recommended', 'Popularity', 'Price low to High', 'Price High to Low', 'New In', 'Veteran Products'].map((val, i) => ({ value: i + 1, title: val }))
    },
    justify: 'center',
    pathData: { 0: 'sorting' },
    languages: {
      EN: {
        label: 'Sorting',
      },
      FR: {
        label: 'Sorting',
      }
    },
  },
};

const config1 = {
  style: {
    width: '45%',
    border: 'solid 2px black'
  }
};

const config2 = {
  style: {
    width: '45%',
    background: 'black',
    color: 'white',
  }
};

// Parts brands
const defaultParts = { categories: { Parts: {} }, brand: [] };
const brand = ['Universal', 'BMW', 'Triumph', 'Kawasaki', 'Suzuki', 'Ducati', 'Yamaha', 'Honda', 'Moto Guzzi', 'Harley davidson'];

const Page = ({ productList, categories }) => {
  const ref = useRef();
  const [productPilot, setProductPilot] = useState([]);
  const router = useRouter();
  const { width } = hookDeviceInfo();
  const [open, setOpen] = useState(false);
  const setFilter = (data) => {
    router.push({
      // pathname: router.pathname,
      query: { ...router.query, ...data },
    }, undefined, { scroll: false });
  };

  // filters
  const filter = useMemo(() => {
    const { query } = router;
    const {
      subcategorie = 'none', color = 'none', size = 'none', sort = 0, categorie = 'Certification', brand = 'none', priceMin = 'none', priceMax = 'none', genre = 'none',
    } = query;

    return {
      sort, brand, categorie, subcategorie, genre, color, priceMin, priceMax, size
    };
  }, [router]);

  // parts
  const setSelect = (data) => {
    router.push({
      // pathname: router.pathname,
      query: { ...router.query, ...data },
    }, undefined, { scroll: false });
  };

  useEffect(() => {
    const newProductList = productList.filter((item) => {
      const arr = Object.keys(filter).map((key) => {
        if (key === 'sort') return true;
        if (filter[key] === 'none') return true;
        if (key === 'size') {
          if (item.sizesType === undefined || item.sizesType.toLocaleLowerCase().split(',').indexOf(filter[key].toLocaleLowerCase()) === -1) return false;
          return true;
        }
        if (key === 'color') {
          return item.colors.map((a) => a.colorName).indexOf(filter[key]) !== -1;
        }
        if (key === 'priceMin' && filter[key] !== 'none') {
          if (parseInt(`${item?.price}`, 10) <= parseInt(`${filter[key]}`, 10)) return false;
          return true;
        }
        if (key === 'priceMax' && filter[key] !== 'none') {
          if (parseInt(`${item?.price}`, 10) >= parseInt(`${filter[key]}`, 10)) return false;
          return true;
        }
        if (item[key] === undefined || item[key].toLocaleLowerCase() !== filter[key].toLocaleLowerCase()) return false;
        return true;
      });

      return arr.indexOf(false) === -1;
    });

    const sortList = sortProduct(parseInt(filter.sort, 10), newProductList);
    setProductPilot(sortList);
  }, [filter, productList]);

  function logit() {

  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });

  const useSort = useState({ sorting: parseInt(filter.sort, 10) });
  const [sort, setSort] = useSort;

  const hanldeSort = (option) => {
    setFilter({
      ...filter, sort: option
    });
  };

  const hanldeClose = (key) => {
    setFilter({
      ...filter, [key]: 'none'
    });
  };

  return (
    <Div width="100%" style={{ minHeight: '90vh' }} vertical="top">
      <Div height="150px" />

      <SliderImages
        arr={brand}
        images={{ g: 0 }}
        onChange={(val) => setSelect({ ...filter, brand: val })}
        slidesToShow={[1, 3, 3, 5, 5]}
      />
      <MapProduits productList={productList} filter={filter} />
    </Div>
  );
};

const MemoComponent = memo(({ productList, categories }) => (
  <Page productList={productList} categories={categories} />
));

function Certification(props) {
  const { user, seo, ...rest } = props;
  const useSocketHook = useSocket(user);
  const [{
    productList = {}, localCurrency, currencyRates, tva
  }] = redux();

  const calcPrice = (val) => {
    const price = (Math.round(((val?.price / currencyRates[val?.currency]) * currencyRates[localCurrency]) * 100) / 100);
    return price + price * tva;
  };
  const productsPilot = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Certification').map((val) => ({ ...val, price: calcPrice(val) })), [productList, localCurrency]);
  const productDemultiplexed = React.useMemo(() => [...productsPilot.map((productRoot) => productRoot.colors.map((color, i) => ({ ...productRoot, colors: [color], id: `${productRoot.id}_${i}` }))), [], []].reduce((a, b) => ([...a, ...b])).filter((a) => a.id !== undefined), [productsPilot]);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <div style={{ display: 'none' }}>
        <h1 style={{ visibility: 'hidden' }}>{seo.firstTitle}</h1>
        {
          seo.links.map((link) => (
            <Link key={link} href={link} passHref>
              {link}
            </Link>
          ))
        }
      </div>
      <Layout
        useSocketHook={useSocketHook}
      >
        <MemoComponent productList={productDemultiplexed} categories={categories.Pilot} />
      </Layout>
    </>
  );
}

export default Certification;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.certifications');
  const verifiedSeo = {
    title: seo?.title ?? 'Certifications',
    description: seo?.description ?? 'The page of Certifications for parts - Meister-Engineering',
    firstTitle: seo?.firstTitle ?? 'Certifications of Meister-Engineering',
    links: seo?.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
