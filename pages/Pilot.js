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
import PilotScroll from '@/elementsClient/Sections/PilotSection/PilotScroll';
import PilotCategoriesList from '@/elementsClient/Sections/PilotSection/PilotFilters';
import PilotMap2 from '@/elementsClient/Sections/PilotSection/PilotSectionCards2';

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
      subcategorie = 'none', color = 'none', size = 'none', sort = 0, categorie = 'Pilot', brand = 'none', priceMin = 'none', priceMax = 'none', genre = 'none',

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
          if (item.sizesType.toLocaleLowerCase().replaceAll(' ', '').split(',').filter((val) => `${filter[key]}`.toLocaleLowerCase().replaceAll(' ', '').split('¦').indexOf(val) !== -1).length > 0) return true;
          return false;
        }
        if (key === 'color') {
          return item.colors.map((a) => a.colorName).filter((color) => `${filter[key]}`.split('¦').indexOf(color) !== -1).length > 0;
        }
        if (key === 'subcategorie') {
          if (`${filter[key]}`.toLocaleLowerCase().replaceAll(' ', '').split('¦').indexOf(`${item.subcategorie}`.toLocaleLowerCase()) !== -1) return true;
          return false;
        }
        if (key === 'brand') {
          if (`${filter[key]}`.toLocaleLowerCase().replaceAll(' ', '').split('¦').indexOf(`${item.brand}`.toLocaleLowerCase()) !== -1) return true;
          return false;
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
      console.log('block bottom');
      ref.current.className = 'filterBLockFixedBottom';
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

      <PilotScroll products={productList} categories={categories} setFilter={setFilter} filter={filter} categorie="Pilot" />

      <GridContainer spacing={2} style={{ width: '100%', maxWidth: '1500px', height: '150px' }}>

        <GridItem num={[true, true, true, 3, 3]} />

        <GridItem num={[12, 12, 12, 9, 9]}>
          <Div width="calc(100% - 20px)" height="130px" row horizontal="at">
            <DialogFilter
              open={open}
              setOpen={setOpen}
              full={width <= 1280 ? '#00000070' : 'transparent'}
              style={{
                margin: '0px',
                position: 'fixed',
                zIndex: 9991,
                background: 'white',
                backgroundColor: 'white',
                boxShadow: 'none',
                height: width <= 600 ? '100vh' : '700px',
                minHeight: width <= 600 ? '100vh' : '700px',
                top: width <= 600 ? '0px' : 'auto'
              }}
            >
              <Div width={[`${width}px`, '400px', '450px', '450px', '450px']}>
                <PilotCategoriesList categories={categories} setFilter={setFilter} filter={filter} productPilot={productPilot} products={productList} mobile={width <= 600} />
              </Div>
            </DialogFilter>
            {width < 1280 ? (
              <Div horizontal="left" row onClick={() => setOpen(!open)}>
                <Div style={{
                  color: 'white', background: 'black', borderRadius: '50%', width: '20px', height: '20px', padding: '5px', marginRight: '10px'
                }}
                >
                  <FilterListIcon style={{
                    width: '14px', height: '14px'
                  }}
                  />
                </Div>
                <p>
                  <span style={{ fontWeight: '400', font: '14px/18px Georgia', color: 'black' }}>Filter</span>
                  &nbsp;
                  <span style={{ fontWeight: '400', font: '14px/18px Georgia', color: '#656565' }}>{`${productPilot.length} Results`}</span>
                </p>
              </Div>
            ) : (
              <Div row horizontal="left" height="130px" vertical="bottom">
                {
                  Object.entries(filter).map(([key, value], i) => {
                    if (key === 'price') return null;
                    if (key === 'categorie') return null;
                    if (value === 'none') return null;
                    if (key === 'sort') return null;
                    if (['color', 'size', 'brand', 'subcategorie'].indexOf(key) !== -1) {
                      return (
                        <Div key={`${i + 1}`} style={{ marginRight: '10px', border: 'solid 1px #d2cbcb' }} horizontal="left">
                          <p style={{
                            position: 'absolute', transform: 'translate(8px, -20px)', fontSize: '11px', background: 'white', paddingLeft: '4px', paddingRight: '4px'
                          }}
                          >
                            {key.toUpperCase()}
                          </p>
                          <Div row key={`${i + 1}`} style={{ margin: '7px 15px', fontSize: '15px' }}>
                            <p>{`${value}`.replaceAll('¦', ', ')}</p>
                            <Div onClick={() => hanldeClose(key)}>
                              <CloseIcon style={{ widht: '20px', height: '20px' }} />
                            </Div>
                          </Div>
                        </Div>
                      );
                    }
                    return (
                      <Div key={`${i + 1}`} style={{ marginRight: '10px', border: 'solid 1px #d2cbcb' }} horizontal="left">
                        <p style={{
                          position: 'absolute', transform: 'translate(8px, -20px)', fontSize: '11px', background: 'white', paddingLeft: '4px', paddingRight: '4px'
                        }}
                        >
                          {key.toUpperCase()}
                        </p>
                        <Div row key={`${i + 1}`} style={{ margin: '7px 15px', fontSize: '15px' }}>
                          <p>{value}</p>
                          <Div onClick={() => hanldeClose(key)}>
                            <CloseIcon style={{ widht: '20px', height: '20px' }} />
                          </Div>
                        </Div>
                      </Div>
                    );
                  })
                }
              </Div>
            )}

            <Div
              width={['calc(100% - 150px)', '350px', '350px', '350px', '350px']}
              vertical="top"
              height={['auto', '130px', '130px', '130px', '130px']}
              style={{
                position: 'relative',
                right: '-17px',
                paddingTop: width > 600 ? '30px' : '5px',
                maxWidth: width > 600 ? '340px' : '160px',
                paddingRight: width > 600 ? '2px' : '10px'
              }}
            >
              <FlexForm
                width="100%"
                title=""
                language="EN"
                variant="outlined"
                submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
                types={types}
                elements={['sorting']}
                formDataMaster={useSort}
                masterChange={(a) => hanldeSort(a.value)}
                buttonChild={<div />}
              />

            </Div>
          </Div>
        </GridItem>

      </GridContainer>

      <GridContainer spacing={2} style={{ width: '100%', maxWidth: '1500px', minHeight: width >= 1280 ? '80vh' : 'auto' }}>

        <GridItem num={[true, true, true, 3, 3]}>
          <div ref={ref} className="filterBLockUnFixed">
            {
              width >= 1280
                ? <PilotCategoriesList categories={categories} setFilter={setFilter} filter={filter} productPilot={productPilot} products={productList} />
                : null
            }
          </div>
        </GridItem>

        <GridItem num={[12, 12, 12, 9, 9]}>
          <PilotMap2 productPilot={productPilot} filter={filter} />
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
  const [{
    productList = {}, localCurrency, currencyRates, tva
  }] = redux();

  const calcPrice = (val) => {
    const price = (Math.round(((val?.price / currencyRates[val?.currency]) * currencyRates[localCurrency]) * 100) / 100);
    return price + price * tva;
  };

  const productsPilot = React.useMemo(() => Object.values(productList).filter((val) => val.visibility === true && val.hidden === false && val.categorie === 'Pilot').map((val) => ({ ...val, price: calcPrice(val) })), [productList, localCurrency, tva]);
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
        <Div height="550px" />
      </Layout>
    </>
  );
}

export default Pilot;

const editJsonFile = require('edit-json-file');

export const getServerSideProps = async (context) => {
  const { user } = nextCookies(context);
  const globalSettings = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/globalSettings.json`, { autosave: true });
  const seo = await globalSettings.get('seo.pilot');
  const verifiedSeo = {
    title: seo.title ?? 'Pilot',
    description: seo.description ?? 'Meister-Engineering pilot products',
    firstTitle: seo.firstTitle ?? 'Pilot products',
    links: seo.links ?? []
  };
  if (!user) { return { props: { seo: verifiedSeo } }; }
  return { props: { user, seo: verifiedSeo } };
};
