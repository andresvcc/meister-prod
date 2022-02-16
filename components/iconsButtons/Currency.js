import React from 'react';
import classNames from 'classnames';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';

// @material-ui/icons

// core components
import { redux, Div } from 'component';
import Button from '@/components/CustomButtons/Button';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';
import currency from '@/assets/JsonDBU/currencies';

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

export default function CartBt(props) {
  const [open, setOpen] = React.useState(null);
  const [{ profilInfo }, dispatch] = redux();

  const { currency: localCurrency, language: curentLanguage } = profilInfo;

  const handleClick = (event) => {
    if (open === null) {
      setOpen(event.currentTarget);
    }
  };

  const overAction = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setOpen(null);
  };

  const handleCloseNotificationListener = () => {
    // setOpen(null);
  };

  const select = (params) => {
    setOpen(null);
    dispatch({ state: 'profilInfo', value: { currency: params } });
  };

  React.useEffect(() => {
    const lg = profilInfo.language || `${navigator.language.split('-')[0].toUpperCase()}`;
    const current = profilInfo.currency || currency[lg];
    dispatch({ state: 'curentLanguage', value: lg });
    dispatch({ state: 'localCurrency', value: current });
    dispatch({ state: 'navigationInit', value: 'true' });
  }, [profilInfo.currency]);

  const classes = useStyles();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  const options = ['USD', 'CHF', 'EUR', 'GBP'];

  return (
    <Div width="100%" onHover={(a) => { if (a === false) handleCloseNotification(); }}>
      <Button
        color="transparent"
        justIcon
        aria-label="Notifications"
        aria-owns="notification-menu-list"
        aria-haspopup="true"
        className={classes.buttonLink}
        style={{
          padding: 0, margin: 0, marginTop: '2px', fontSize: '14px', position: 'absolute', top: 0
        }}
        onClick={handleClick}
        onMouseEnter={overAction}
      >
        {localCurrency}
      </Button>
      <Popper
        style={{ position: 'relative', top: '-50px' }}
        open={Boolean(open) || open === true}
        anchorEl={open}
        transition
        disablePortal
        placement="bottom"
        className={`${classNames({
          [classes.popperClose]: !open,
        })} dialogContaineCurrency`}
      >
        {({ TransitionProps }) => (
          <div>
            <ClickAwayListener onClickAway={handleCloseNotificationListener}>
              <MenuList role="menu">
                {
                    options.map((val) => (
                      <MenuItem
                        onClick={() => select(val)}
                        className={dropdownItem}
                        key={val}
                      >
                        {val}
                      </MenuItem>
                    ))
                  }
              </MenuList>
            </ClickAwayListener>
          </div>
        )}
      </Popper>
    </Div>
  );
}
