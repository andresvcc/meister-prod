// Search mobile
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
// components
import {
  Div, hookDeviceInfo, redux
} from 'components';
// Material ui
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
// elements
import ProductCardMobile from 'elementsClient/Cards/ProductCardMobile';

const ScrollContainer = dynamic(() => import('react-indiana-drag-scroll'), {
  ssr: false
});

// Hook
function useLockBodyScroll(openMobileSearch) {
  useEffect(
    () => {
      // get original value of body
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // prevent scrolling on mount
      document.body.style.overflow = 'hidden';
      // re-enable scrolling when component unmounts
    },
    [] // empty array to ensures effect is only run when mount and unmount
  );
}

const DialogSearch = () => {
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const [searchInput, setSearch] = useState('');
  const [{ productList }, dispatch] = redux();
  const { width } = hookDeviceInfo();

  const open = () => {
    setOpenMobileSearch(true);
    setSearch('');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setOpenMobileSearch(false);
    setSearch('');
    document.body.style.overflow = 'initial';
  };

  const submit = (e) => {
    if (e) e.preventDefault();
    const el = document.querySelector(':focus');
    if (el) el.blur();
  };

  const list = React.useMemo(() => Object.values(productList).map((val) => ({
    ...val,
    name: val.product,
    categorie: val.categorie,
    subcategorie: val.subcategorie,
    brand: val.brand,
    genre: val.genre,
  })).filter((val) => {
    if (searchInput.length < 3) return false;
    return (
      `${val.name}`.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1
      || `${val.categorie}`.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1
      || `${val.subcategorie}`.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1
      || `${val.brand}`.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1
      || `${val.genre}`.toUpperCase().indexOf(searchInput.toUpperCase()) !== -1
    );
  }).sort((a, b) => (b.name.indexOf(searchInput) !== -1 ? -1 : 1)), [searchInput]);

  // useLockBodyScroll(openMobileSearch);

  const router = useRouter();

  const goToProduct = (id) => {
    router.push({
      pathname: `/product/${id}`,
    });
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <div>
      <Search onClick={open} />
      {
        openMobileSearch ? (
          <Div
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh'
            }}
          >
            <div
              style={{
                width: '100%', height: '100%', background: '#00000080', touchAction: 'none'
              }}
            >
              <Div
                width="100%"
                vertical="top"
                style={{ background: 'white' }}
              >
                <Div
                  width="90%"
                  height="60px"
                  horizontal="at"
                  vertical="bottom"
                  row
                  style={{ borderBottom: 'solid 1px black' }}
                >
                  <Search style={{ margin: 4 }} />
                  <form onSubmit={submit} style={{ width: '100%', }}>
                    <input
                      placeholder="Search"
                      className="inputSearch2"
                      type="text"
                      name="firstname"
                      id="firstname"
                      autoComplete="off"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                    // onFocus={() => setOpenSearch(true)}
                      value={searchInput}
                      onChange={(e) => setSearch(e.currentTarget.value)}
                      style={{
                        border: 'none',
                        width: '90%',
                        fontSize: '.9em',
                        background: 'transparent',
                        // color: colorTextInput,
                      }}
                    />
                  </form>
                  <CloseIcon style={{ margin: 4 }} onClick={close} />
                </Div>
                {
                  width < 420 ? (
                    <div
                      className={list.length > 0 ? 'searchContainer' : 'searchContainerVoid'}
                    >
                      {
                      searchInput.length > 2 && list.length > 0 ? (
                        list.map((val, i) => (
                          <div
                            onClick={close}
                            key={`${i + 1}`}
                            role="button"
                            aria-hidden="true"
                            style={{
                              height: '300px', width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center'
                            }}
                          >
                            <ProductCardMobile product={val} onClick={() => goToProduct(val.product)} />

                          </div>
                        ))
                      ) : (searchInput !== '' ? <p>Here are some suggested products...</p> : null)
                    }
                    </div>
                  ) : (
                    <Div height="100vh" width="100vw" vertical="top">
                      <div style={{ height: '50px' }} />
                      <ScrollContainer
                        style={{ background: 'transparent', width: '100%' }}
                        vertical
                        horizontal={false}
                        hideScrollbars={false}
                        nativeMobileScroll
                      >
                        <Div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'auto',
                            alignContent: 'start',
                          }}
                        >
                          {list.map((val, i) => (
                            <Div
                              key={`${i + 1}`}
                              dev
                              onClick={() => goToProduct(val.product)}
                              style={{
                                width: width > 750 ? width / 4 : width > 600 ? width / 3 : width * 0.495,
                                flex: '0 0 auto',
                              }}
                            >
                              <ProductCardMobile product={val} />
                            </Div>
                          ))}
                        </Div>
                        <Div height={10} />
                      </ScrollContainer>
                    </Div>
                  )
                }
              </Div>
              <Div width="100%" height="100%" onClick={close} />
            </div>
          </Div>
        ) : null
       }
    </div>
  );
};

export default DialogSearch;
