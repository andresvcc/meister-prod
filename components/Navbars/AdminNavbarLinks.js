import React from 'react';
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
import Divider from '@material-ui/core/Divider';

// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import Search from '@material-ui/icons/Search';

// core components
import { redux, Div } from 'component';
import { useRouter } from 'next/router';
import CustomInput from '@/components/CustomInput/CustomInput';
import CustomAutocomplete from '@/components/CustomInput/CustomAutoComplete';
import Button from '@/components/CustomButtons/Button';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/adminNavbarLinksStyle';

const useStyles = makeStyles(styles);

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption2', year: 1994 },
  { title: 'The Godfather2', year: 1972 },
  { title: 'The Godfather2: Part II', year: 1974 },
  { title: 'The Dark Knight2', year: 2008 },
];

export default function HeaderLinks(props) {
  const router = useRouter();
  const [{ notifications }, dispatch] = redux();
  const [openNotification, setOpenNotification] = React.useState(null);

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const classes = useStyles();
  const { rtlActive } = props;

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive,
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true,
  });

  const notificationsKeys = Object.keys(notifications);

  return (
    <div className={classes.wrapper}>
      <Div height={60}>
        <CustomAutocomplete
          // id="searchAdminNavBar"
          label="Search"
          options={top100Films}
          onChange={(value) => console.log(value)}
          formControlProps={{
            className: `${classes.top} ${classes.search}`,
          }}
          icon={(
            <Search className={`${classes.headerLinksSvg} ${classes.searchIcon}`} />
          )}
        />
      </Div>

      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openNotification ? 'notification-menu-list' : null}
          aria-haspopup="true"
          className={classes.buttonLink}
          onClick={handleClickNotification}
        >
          <Notifications
            className={`${classes.headerLinksSvg} ${classes.links}`}
          />
          {notificationsKeys.length > 0 ? <span className={classes.notifications}>{notificationsKeys.length}</span> : null }
          <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              Notification
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true,
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list"
              style={{ transformOrigin: '0 0 0' }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {
                      notificationsKeys.map((val) => (
                        <MenuItem
                          onClick={handleCloseNotification}
                          className={dropdownItem}
                          key={val}
                        >
                          {notifications[val].label}
                        </MenuItem>
                      ))
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool,
};
