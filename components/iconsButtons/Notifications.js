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
import Popper from '@material-ui/core/Popper';

// @material-ui/icons
import Notifications from '@material-ui/icons/Notifications';

// core components
import { redux, Div } from 'component';
import Button from '@/components/CustomButtons/Button';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';

const useStyles = makeStyles(styles);

export default function NotificationBt(props) {
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

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  const notificationsKeys = Object.keys(notifications);

  return (
    <div>
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
  );
}

NotificationBt.propTypes = {
  color: PropTypes.string,
  searchOptions: PropTypes.array,
  showNotifications: PropTypes.bool,
  order: PropTypes.array,
  horizontal: PropTypes.string,
};
