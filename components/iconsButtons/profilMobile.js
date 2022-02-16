// Header - Profil - Mobile
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
// import { Manager, Target, Popper } from "react-popper";
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person';
// core components
import { redux, Div } from 'component';
// material ui assets
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';

const useStyles = makeStyles(styles);

function getCurrencySymbol(locale, currency) {
  return (0).toLocaleString(
    locale,
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  ).replace(/\d/g, '').trim();
}

export default function MenuMobileIcon(props) {
  const [open, setOpen] = React.useState(false);
  const { useSocketHook } = props;
  const [emit, socket] = useSocketHook;
  const [{ sessions, profilInfo, style }, dispatch] = redux();
  const router = useRouter();

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleCloseNotification = () => {
    setOpen(false);
  };

  const logoutRes = (data) => {

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

  const notificationsKeys = profilInfo.registered ? ['profile', 'logout'] : ['register', 'login'];

  return (
    <Div
      style={{
        padding: 0, margin: 0, fontSize: '18px', position: 'absolute', top: 12, right: 45
      }}
    >
      <Div
        onClick={handleClick}
      >
        <PersonIcon
          style={{ width: '25px', height: '25px' }}
        />
      </Div>
      {
          open ? (
            <Div
              style={{
                padding: 0, margin: 0, fontSize: '18px', position: 'fixed', top: 50, right: 0
              }}
            >
              <Div>
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
                            <Div
                              horizontal="left"
                              style={{ fontFamily: 'NovaLight, sans serif', fontSize: '15px', textTransform: 'capitalize' }}
                            >
                              {val}
                            </Div>

                          </MenuItem>
                        ))
                      }
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Div>
            </Div>
          ) : null
      }
    </Div>
  );
}
