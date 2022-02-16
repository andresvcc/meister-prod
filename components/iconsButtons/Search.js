/* eslint-disable no-multi-spaces */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useRef, useEffect, useState } from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Search from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

// core components
import { redux, Div, hookDeviceInfo } from 'component';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';
import SearchDialog from './searchDialog/searchDialog';

const useStyles = makeStyles(styles);

const useHideOnScrolled = () => {
  // Store the state
  const [scrollY, setScrollPos] = useState(0);

  // On Scroll
  const onScroll = () => {
    setScrollPos(window.pageYOffset);
  };

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  if (typeof window === 'undefined') return 0;

  return scrollY;
};

function useOutsideAlerter(ref, setOpenSearch, setSearch) {
  useEffect(() => {
    /**
       * Alert if clicked on outside of element
       */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenSearch(false);
        setSearch('');
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

const scrollChange = [1, 300, 300, 300, 300];

export default function NotificationBt(props) {
  const wrapperRef = useRef(null);
  const classes = useStyles();
  const [{ productList }, dispatch] = redux();
  const [searchInput, setSearch] = useState('');

  const {
    openSearch, setOpenSearch, notChange
  } = props;

  useOutsideAlerter(wrapperRef, setOpenSearch, setSearch);

  const {
    width,
    height,
    hookWidth,
    hookHeight
  } = hookDeviceInfo();
  const scrollY = useHideOnScrolled();

  const responsive = React.useMemo(() => {
    if (hookWidth < 600) return 0;
    if (hookWidth < 960) return 1;
    if (hookWidth < 1280) return 2;
    if (hookWidth < 1920) return 3;
    if (hookWidth >= 1920) return 4;
  }, [hookWidth]);

  const scrollChangePosition = scrollChange[responsive];

  const colorTextInput = React.useMemo(() => (!notChange && scrollY < scrollChangePosition ? 'white' : 'black'), [scrollY]);
  const colorbackLine = React.useMemo(() => (!notChange && scrollY < scrollChangePosition ? 'white' : 'grey'), [scrollY]);

  const list = Object.values(productList).map((val) => ({
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
  }).sort((a, b) => (b.name.indexOf(searchInput) !== -1 ? -1 : 1));

  return (
    <Div width="100%" horizontal="left" row>
      <Div row horizontal="left" width={openSearch ? '100%' : '140px'}>
        <Div row width="left"  horizontal="left" height="23px">

          <Div  width="8px" />
          <div
            ref={wrapperRef}
            style={{
              width: '100%', display: 'flex', justifyContent: 'center', alignItems: ''
            }}
          >
            <Search
              onClick={() => setOpenSearch(true)}
              style={{
                width: '20px', height: '20px', marginBottom: '5px', cursor: 'text',
              }}
            />
            <input
              placeholder="Search"
              className={!notChange && scrollY < scrollChangePosition ? 'inputSearch' : 'inputSearch2'}
              type="text"
              name="firstname"
              id="firstname"
              autoComplete="off"
              onFocus={() => setOpenSearch(true)}
              value={searchInput}
              onChange={(e) => setSearch(e.currentTarget.value)}
              style={{
                border: 'none',
                width: '100%',
                fontSize: '0.8em',
                background: 'transparent',
                color: colorTextInput,
              }}
            />

            {
              openSearch && searchInput.length > 0 ? (
                <div
                  style={{
                    position: 'fixed',
                    top: '150px',
                    height: list.length > 0 ? `${(hookHeight * 0.95) - 150}px` : '100px',
                    background: 'white',
                    boxShadow: 'rgb(0 0 0 / 42%) 0px 10px 20px -12px, rgb(0 0 0 / 12%) 0px 3px 20px 0px, rgb(0 0 0 / 20%) 0px 8px 10px -5px',
                    color: 'black',
                    overflowY: list.length > 0 ? 'scroll' : 'hidden',
                    overflowX: 'hidden',
                    width: width < 1000 ? '750px' : width < 1300 ? '950px' : width < 1950 ? '1280px' : '1460px',
                    left: width < 1000 ? `${(width - 750) / 2}px` : width < 1300 ? `${(width - 950) / 2}px` : width < 1950 ? `${(width - 1280) / 2}px` : `${(width - 1460) / 2}px`,
                  }}
                >
                  {
                    list.length > 0 ? (
                      <SearchDialog list={list} />
                    ) : (
                      <Div width="100%" height="100%">
                        <Div horizontal="left" width="calc(100% - 30px)" height="100%">
                          <p>Here are some suggested products...</p>
                        </Div>
                      </Div>
                    )
                  }
                </div>
              ) : null
            }
          </div>
          {openSearch ?  <Div pointer><CloseIcon style={{ width: '20px', height: '20px', marginBottom: '5px' }} /></Div> : null}
        </Div>
      </Div>
    </Div>
  );
}

/*

*/
