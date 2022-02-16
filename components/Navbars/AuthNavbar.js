import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Menu from '@material-ui/icons/Menu';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Fingerprint from '@material-ui/icons/Fingerprint';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import LockOpen from '@material-ui/icons/LockOpen';
import Spam from '@/components/Typography/Spam';

// core components
import Button from '@/components/CustomButtons/Button';
import Div from '@/components/Div/Div';

import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/authNavbarStyle';
import ItemBar from './AuthFiles/ItemBar';

const useStyles = makeStyles(styles);

const itemsBar = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    Icon: Dashboard,
  }, {
    href: '/auth/pricing-page',
    label: 'Pricing',
    Icon: MonetizationOn,
  }, {
    href: '/auth/login-page',
    label: 'Login',
    Icon: Fingerprint,
  }, {
    href: '/auth/register-page',
    label: 'Register',
    Icon: PersonAdd,
  }, {
    href: '/auth/lock-screen-page',
    label: 'Lock',
    Icon: LockOpen,
  }
];

export default function AuthNavbar(props) {
  const [open, setOpen] = React.useState(false);
  // used for checking current route
  const router = useRouter();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const classes = useStyles();
  const { color, brandText } = props;
  const appBarClasses = cx({
    [` ${classes[color]}`]: color,
  });

  const listRow = (
    <Div row width="70vw" horizontal="right">
      <List className={classes.list}>
        {itemsBar.map((itemBar) => <ItemBar key={itemBar.label} {...itemBar} />)}
      </List>
    </Div>
  );

  const listColon = (
    <List className={classes.list}>
      <Div width="95%" horizontal="left">
        <Div width="95%" height="100px">
          <Spam color="white" type="subtitle1">Menu</Spam>
        </Div>
        {itemsBar.map((itemBar) => <ItemBar key={itemBar.label} {...itemBar} />)}
      </Div>
    </List>
  );

  return (
    <AppBar position="static" className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>

        <Hidden mdUp>
          <Button
            className={classes.sidebarButton}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>

        <Hidden mdUp>
          <Div width="100%">
            <Button href="#" className={classes.title} color="transparent">
              {brandText}
            </Button>
          </Div>
        </Hidden>

        <Hidden smDown>
          <Div>
            <Button href="#" className={classes.title} color="transparent">
              {brandText}
            </Button>
          </Div>
        </Hidden>

        <Hidden smDown>{listRow}</Hidden>

        <Hidden mdUp>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
              BackdropProps={{
                classes: {
                  root: classes.BackdropProps
                }
              }}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {listColon}
            </Drawer>
          </Hidden>
        </Hidden>

      </Toolbar>
    </AppBar>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
};
