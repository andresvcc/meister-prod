import React from 'react';
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
import { redux } from 'component';
import Button from '@/components/CustomButtons/Button';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/adminNavbarStyle';
import AdminNavbarLinks from './AdminNavbarLinks';

const useStyles = makeStyles(styles);

export default function AdminNavbar(props) {
  const [stateRedux, dispatch] = redux();
  const classes = useStyles();
  const {
    color, brandText, handleDrawerToggle
  } = props;

  const appBarClasses = cx({
    [` ${classes[color]}`]: color,
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href="#" className={classes.title} color="transparent">
            {brandText}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <Button
            className={classes.appResponsive}
            color="transparent"
            justIcon
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

AdminNavbar.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  brandText: PropTypes.string,
  handleDrawerToggle: PropTypes.func,
};
