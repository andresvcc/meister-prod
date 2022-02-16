import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Hidden from '@material-ui/core/Hidden';
import Popper from '@material-ui/core/Popper';

// @material-ui/icons
import Search from '@material-ui/icons/Search';
// core components
import { redux, Div } from 'component';
import CustomAutocomplete from '@/components/CustomInput/CustomAutoComplete';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';
import Notifications from '@/components/iconsButtons/Notifications';
import SearchMenu from '@/components/iconsButtons/Search';
import Cart from '@/components/iconsButtons/Cart';
import MenuMobile from '@/components/iconsButtons/MenuMobile';
import SearchMobile from '@/components/iconsButtons/SearchMobile';
import Profile from '@/components/iconsButtons/Profile';
import Currency from '@/components/iconsButtons/Currency';
import Langues from '@/components/iconsButtons/langues';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  // const [{ notifications }, dispatch] = redux();
  const classes = useStyles();
  const [openMobileSearch, setOpenMobileSearch] = useState(false);

  const {
    color, searchOptions = [], showNotifications, children, order, horizontal, useSocketHook, openSearch, setOpenSearch, notChange
  } = props;

  const elements = {
    searchBar: (
      <div style={{ width: '100%' }} key="searchBar">
        {
          searchOptions.length > 0 ? (
            <SearchMenu openSearch={openSearch} setOpenSearch={setOpenSearch} notChange={notChange} />
          ) : null
        }
      </div>
    ),
    notifications: (
      <div key="notifications">
        {
          showNotifications ? (
            <Notifications />
          ) : null
        }
      </div>
    ),
    iconsButtons: (
      <Div row horizontal="right" key="iconsButtons" width="180px">
        <Currency />
        <Profile useSocketHook={useSocketHook} />
        <Cart />
      </Div>
    ),
    iconsButtons2: (
      <Div row horizontal="right" key="iconsButtons2" width="90px" dev>
        <Currency />
        <Profile useSocketHook={useSocketHook} />
        <Cart />
      </Div>
    ),
    searchAndMenu: (
      <Div row horizontal="left" key="searchAndMenu" width="60px">
        <MenuMobile />
        <Div width="10px" />
        <SearchMobile setOpenMobileSearch={setOpenMobileSearch} />
      </Div>
    ),
  };

  return (
    <Div width="100%" vertical="bottom">
      <Div width="calc(100% - 5px)" height={openSearch ? 80 : 40} row horizontal="at" style={{ maxWidth: '1250px' }}>
        <Div width="100%" height={openSearch ? 80 : 40} row horizontal="at" style={{ paddingTop: '20px' }}>
          {order.map((val, i) => {
            if (!elements[val]) return undefined;
            return elements[val];
          })}
        </Div>
      </Div>
      {
        !openSearch ? (
          <Div width="100%" height={40} style={{ marginTop: '-10px' }} row>
            <Div width="950px">
              {children}
            </Div>
          </Div>
        ) : null
      }
    </Div>
  );
}

HeaderLinks.propTypes = {
  color: PropTypes.string,
  searchOptions: PropTypes.array,
  showNotifications: PropTypes.bool,
  order: PropTypes.array,
  horizontal: PropTypes.string,
};

/*

            <CustomAutocomplete
              // id="searchAdminNavBarLink"
              label="Search"
              color={color}
              options={searchOptions}
              onChange={(value) => console.log(value)}
              formControlProps={{ className: `${classes.top } ${ classes.search}` }}
              icon={(<Search className={`${classes.headerLinksSvg } ${ classes.searchIcon}`} />)}
              onFocus={setOpenSearch}
            />

*/
