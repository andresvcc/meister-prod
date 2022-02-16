import React, { useMemo } from 'react';
import classNames from 'classnames';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Image from 'next/image';

// @material-ui/icons

// core components
import { redux, Div } from 'component';
import Button from '@/components/CustomButtons/Button';
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

export default function CartBt({ country }) {
  const [open, setOpen] = React.useState(null);
  const [{ profilInfo, tva }, dispatch] = redux();

  const { countryTVA, language: curentLanguage, currency } = profilInfo;

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

  const select = (params, value, currency) => {
    setOpen(null);

    dispatch({ state: 'profilInfo', value: { countryTVA: params, tva: value, currency } });
  };

  const chflag = require('assets/img/flags/CH.png');
  const frflag = require('assets/img/flags/FR.png');
  const deflag = require('assets/img/flags/DE.png');
  const itflag = require('assets/img/flags/IT.png');
  const atflag = require('assets/img/flags/AT.png');
  const esflag = require('assets/img/flags/ES.png');
  const ptflag = require('assets/img/flags/PT.png');
  const gbflag = require('assets/img/flags/GB.png');
  const ieflag = require('assets/img/flags/IE.png');

  const options = [
    {
      code: 'CH', flag: chflag, value: 0.077, currency: 'CHF'
    },
    {
      code: 'FR', flag: frflag, value: 0.20, currency: 'EUR'
    },
    {
      code: 'DE', flag: deflag, value: 0.19, currency: 'EUR'
    },
    {
      code: 'IT', flag: itflag, value: 0.22, currency: 'EUR'
    },
    {
      code: 'AT', flag: atflag, value: 0.20, currency: 'EUR'
    },
    {
      code: 'ES', flag: esflag, value: 0.21, currency: 'EUR'
    },
    {
      code: 'PT', flag: ptflag, value: 0.23, currency: 'EUR'
    },
    {
      code: 'GB', flag: gbflag, value: 0.20, currency: 'GBP'
    },
    {
      code: 'IE', flag: ieflag, value: 0.23, currency: 'EUR'
    }
  ];

  React.useEffect(() => {
    if (country.country !== countryTVA || country.currency !== currency || tva !== profilInfo.tva) {
      const arrayTemp = options.filter((a) => a.code === country.country);
      select(country.country, arrayTemp.length > 0 ? arrayTemp[0].value : undefined, country.currency);
    }
  }, [country]);

  const classes = useStyles();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  const currentFlag = useMemo(() => {
    const select = options.filter((a) => a.code === countryTVA);
    if (select.length > 0) return select[0].flag;
    return chflag;
  }, [countryTVA]);

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
        <Image src={currentFlag} alt={`${countryTVA} flag`} key="flag" />
      </Button>
      <Popper
        style={{ position: 'relative', top: '-50px', width: '120px' }}
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
                        onClick={() => select(val.code, val.value, val.currency)}
                        className={dropdownItem}
                        key={val.code}
                      >
                        <Div row horizontal="at" style={{ padding: '0px' }} width="60px">
                          <Image src={val.flag} alt="usFlag" key="flag" />
                          {val.code}
                        </Div>
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
