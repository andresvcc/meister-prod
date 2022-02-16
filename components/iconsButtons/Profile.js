// code à supprimer - pas utilisé
import React, { useEffect } from 'react';
import nextCookies from 'next-cookies';
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
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person';

// core components
import { redux, Div } from 'component';
import Button from '@/components/CustomButtons/Button';
import Spam from '@/components/Typography/Spam';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';

const useStyles = makeStyles(styles);

export default function CartBt(props) {
  const { useSocketHook } = props;
  const [emit, socket] = useSocketHook;
  const [{ sessions, profilInfo, style }, dispatch] = redux();
  const [open, setOpen] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    if (open && open.contains(event.target)) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const overAction = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setOpen(null);
  };

  const logoutRes = async (data) => {
    await Cookies.remove('admin');
    await Cookies.remove('user');
  };

  useEffect(() => {
    if (socket) {
      socket.on('logoutRes', logoutRes);
    }
  }, [socket]);

  const goingTo = (params) => {
    if (params === 'logout') {
      emit('logout');
      handleCloseNotification();
    } else if (params === 'profile') {
      router.push({
        pathname: '/userProfil',

      });
    } else {
      router.push({
        pathname: '/login',
        query: { option: params },
      });
    }
  };

  const classes = useStyles();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  const notificationsKeys = profilInfo.registered ? ['logout', 'profile'] : ['register', 'login'];

  return (
    <Div width="100%" onHover={(a) => { if (a === false) handleCloseNotification(); }}>
      <Button
        color="transparent"
        justIcon
        aria-label="Notifications"
        aria-owns="notification-menu-list"
        aria-haspopup="true"
        className={classes.buttonLink}
        onClick={handleClick}
        onMouseEnter={overAction}
        style={{
          padding: 0, margin: 0, position: 'absolute', top: 0
        }}
      >
        <PersonIcon
          className={`${classes.headerLinksSvg} ${classes.links}`}
          style={style}
        />
      </Button>
      <Popper
        open={Boolean(open)}
        anchorEl={open}
        transition
        disablePortal
        placement="bottom"
        className={classNames({
          [classes.popperClose]: !open,
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
                        onClick={() => goingTo(val)}
                        className={dropdownItem}
                        key={val}
                      >
                        <div style={{ textTransform: 'capitalize' }}>
                          {val}

                        </div>
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Div>
  );
}

CartBt.propTypes = {
  color: PropTypes.string,
  searchOptions: PropTypes.array,
  showNotifications: PropTypes.bool,
  order: PropTypes.array,
  horizontal: PropTypes.string,
};
