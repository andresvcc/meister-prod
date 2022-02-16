import React, {
  useEffect, useState, memo, useMemo, useRef
} from 'react';
import Head from 'next/head';
import nextCookies from 'next-cookies';
import useSocket from 'useSocket';
import { Div, redux, hookDeviceInfo } from 'components';
import { useRouter } from 'next/router';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import Link from 'next/link';
import Layout from '@/layouts/Default2';
import { categories } from '@/assets/dataBase/BDCategories';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import FlexForm from '@/components/FlexForm/FlexForm';

// Pilot Section
import MotorcycleScroll from '@/elementsClient/Sections/MotorcycleSection/MotorcycleScroll';
import PilotCategoriesList from '@/elementsClient/Sections/PilotSection/PilotFilters';
import PilotMap2 from '@/elementsClient/Sections/PilotSection/PilotSectionCards2';
import MotorcycleSectionCard from '@/elementsClient/Sections/MotorcycleSection/MotorcycleSectionCards';

import DialogFilter from '@/elementsClient/Sections/PilotSection/DialogFIlter';

const sortProduct = (code, list) => {
  if (code === 1) return [...list].sort((a, b) => ((b?.price - a?.price) > 1 ? 1 : -1) - ((a.id - b.id) > 1 ? 1 : -1));
  if (code === 2) {
    return [...list].sort((a, b) => {
      if (a.popularity && b.popularity) return a.popularity - b.popularity;
      return false;
    });
  }
  if (code === 3) return [...list].reverse((a, b) => b.id - a.id);
  if (code === 4) return [...list].sort((a, b) => a.id - b.id);
  if (code === 5) return [...list].sort((a, b) => b?.price - a?.price);
  if (code === 6) return [...list].sort((a, b) => a?.price - b?.price);

  return list;
};

const types = {
  sorting: {
    size: [12, 12, 12, 12, 12],
    type: 'option',
    required: true,
    options: {
      EN: ['Recommended', 'Most Popular', 'Arrivals New to Old', 'Arrivals Old to New', 'Price High to Low', 'Price Low to High'].map((val, i) => ({ value: i + 1, title: val })),
      FR: ['Recommended', 'Most Popular', 'Arrivals New to Old', 'Arrivals Old to New', 'Price High to Low', 'Price Low to High'].map((val, i) => ({ value: i + 1, title: val }))
    },
    justify: 'center',
    pathData: { 0: 'sorting' },
    languages: {
      EN: {
        label: 'Sort by',
      },
      FR: {
        label: 'Sort by',
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

const Page = memo(({ productList, categories }) => {
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
      subcategorie = 'Meister Motorcycles', color = 'none', size = 'none', sort = 0, categorie = 'Motorcycle', brand = 'none', priceMin = 'none', priceMax = 'none', genre = 'none',
    } = query;

    return {
      sort, brand, categorie, subcategorie, genre, color, priceMin, priceMax, size
    };
  }, [router]);

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

  /*
    function logit() {
      const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );

      if (window.pageYOffset <= 355 && (ref.current.className === 'filterBLockFixed')) {
        ref.current.className = 'filterBLockUnFixed';
        return;
      }
      if (window.pageYOffset >= 355 && window.pageYOffset < scrollHeight - window.innerHeight - (ref.current.clientHeight / 2) + 180 && (ref.current.className === 'filterBLockUnFixed' || ref.current.className === 'filterBLockFixedBottom')) {
        ref.current.className = 'filterBLockFixed';
        return;
      }
      if (window.innerHeight - 528 - ref.current.clientHeight < 150 && window.pageYOffset - (scrollHeight - window.innerHeight) >= 0 && ref.current.className === 'filterBLockFixed') {
        ref.current.className = 'filterBLockFixedBottom';
        ref.current.style.bottom = `${443}px`;
      }
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
  */
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
      <Div height={['100px', '150px', '150px', '150px', '150px']} />

      <MotorcycleScroll products={productList} categories={categories} setFilter={setFilter} filter={filter} categorie="Motorcycle" />

      <GridContainer spacing={2} style={{ width: '100%', maxWidth: '1500px', minHeight: width >= 1280 ? '80vh' : 'auto' }}>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <MotorcycleSectionCard productPilot={productPilot} filter={filter} />
        </GridItem>

      </GridContainer>
      <Div width="100%" height="80px">
        <GridContainer spacing={2} style={{ width: '100%', maxWidth: '1500px' }}>
          <GridItem num={[true, true, true, 3, 3]} />
          <GridItem num={[12, 12, 12, 9, 9]}>
            <Div width="100%" height="75px" />
          </GridItem>
        </GridContainer>
      </Div>
    </Div>
  );
}, (prev, next) => JSON.stringify(prev.categories) !== JSON.stringify(next.categories));

const MemoComponent = memo(({ productList, categories }) => {
  const a = 0;
  return (
    <Page productList={productList} categories={categories} />
  );
}, (prev, next) => JSON.stringify(prev.categories) !== JSON.stringify(next.categories));

function Pilot(props) {
  const { user, seo, ...rest } = props;
  const useSocketHook = useSocket(user);
  const [{ productList = {}, localCurrency, currencyRates }] = redux();

  const calcPrice = (val) => {
    const price = (Math.round(((val?.price / currencyRates[val?.currency]) * currencyRates[localCurrency]) * 100) / 100);
    const tva = price * 0.16;
    return price + tva;
  };

  const productsPilot = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Motorcycle').map((val) => ({ ...val, price: calcPrice(val) })), [productList, localCurrency]);
  const productDemultiplexed = React.useMemo(() => [...productsPilot.map((productRoot) => productRoot.colors.map((color, i) => ({
    ...productRoot,
    colors: [color],
    id: `${productRoot.id}_${i}`
  }))), [], []].reduce((a, b) => ([...a, ...b])).filter((a) => a.id !== undefined), [productsPilot]);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>
      <div style={{ visibility: 'hidden' }}>
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
        <MemoComponent productList={productDemultiplexed} categories={categories.Motorcycle} />
      </Layout>
    </>
  );
}

export default Pilot;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.motorcycles');
  const verifiedSeo = {
    title: seo.title ?? 'Motorcycles',
    description: seo.description ?? 'Meister-Engineering Motorcycles',
    firstTitle: seo.firstTitle ?? 'Motorcycles',
    links: seo.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
