import React, { useState, useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';

// material-ui icons
import Menu from '@material-ui/icons/Menu';

// core components
import { redux, Div, hookDeviceInfo } from 'component';
import Button from '@/components/CustomButtons/Button';
import style from '@/assets/jss/nextjs-material-dashboard-pro/components/headerStyle';
import selectionColor from '@/assets/jss/nextjs-material-dashboard-pro/components/selectionColor';
import HeaderLinks from '@/components/Header/HeaderLinks';

import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const useStyles = makeStyles(style);

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

export default function AdminNavbar(props) {
  const [stateRedux, dispatch] = redux();
  const { width } = hookDeviceInfo();

  const responsive = React.useMemo(() => {
    if (width < 600) return 0;
    if (width < 960) return 1;
    if (width < 1280) return 2;
    if (width < 1920) return 3;
    if (width >= 1920) return 4;
  }, [width]);

  const classes = useStyles();
  const {
    useSocketHook,
    color,
    changeColor,
    transition,
    fixed,
    searchOptions,
    showNotifications,
    order,
    children,
    horizontal,
    scrollChange = [1, 1, 1, 1, 1],
    openSearch,
    setOpenSearch,
    notChange
  } = props;

  const scrollY = useHideOnScrolled();

  const scrollChangePosition = scrollChange[responsive];

  const appBarStyle = {
    ...selectionColor[changeColor],
    ...selectionColor.appBar,
    top: 0,
    ...defaultBoxShadow,
    height: '85px',
  };

  const appBarClasses = cx({
    [`${classes.appBar}`]: true,
    [`${classes[color]}`]: color && scrollY < scrollChangePosition,
    [classes.fixed]: fixed
  });

  return (
    <AppBar className={appBarClasses} style={{ transition: 'none', padding: 0, zIndex: 9 }}>
      <Div
        width="100%"
        style={appBarStyle}
      />
      <Toolbar className={classes.container} style={{ padding: 0 }}>
        <Div width="100%">
          <HeaderLinks
            useSocketHook={useSocketHook}
            searchOptions={searchOptions}
            showNotifications={showNotifications}
            color={scrollY > scrollChangePosition && changeColor && !notChange ? selectionColor[changeColor].color : selectionColor[color].color}
            order={order}
            horizontal={horizontal}
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
            notChange={notChange}
          >
            {children}
          </HeaderLinks>
        </Div>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'transparent', 'white', 'dark']),
  changeColor: PropTypes.oneOf(['primary', 'secondary', 'transparent', 'white', 'dark']),
  transition: PropTypes.oneOf(['drawer', 'none', 'opacity']),
  fixed: PropTypes.bool,
  showNotifications: PropTypes.bool,
  children: PropTypes.any,
  order: PropTypes.array,
  horizontal: PropTypes.string,
  notChange: PropTypes.bool,
};
