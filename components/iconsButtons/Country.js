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

    console.log({ countryTVA: params, tva: value, currency });
    dispatch({ state: 'profilInfo', value: { countryTVA: params, tva: value, currency } });
    dispatch({ state: 'tva', value });
  };

  const chflag = require('assets/img/flags/CH.png');
  const frflag = require('assets/img/flags/FR.png');
  const deflag = require('assets/img/flags/DE.png');
  const itflag = require('assets/img/flags/IT.png');
  const atflag = require('assets/img/flags/AT.png');
  const esflag = require('assets/img/flags/ES.png');
  const ptflag = require('assets/img/flags/PT.png');
  const beflag = require('assets/img/flags/BE.png');

  const options = [
    {
      code: 'CH', flag: chflag, value: 0.077, currency: 'CHF', name: 'Switzerland'
    },
    {
      code: 'FR', flag: frflag, value: 0.20, currency: 'EUR', name: 'France'
    },
    {
      code: 'DE', flag: deflag, value: 0.19, currency: 'EUR', name: 'Germany'
    },
    {
      code: 'IT', flag: itflag, value: 0.22, currency: 'EUR', name: 'Italy'
    },
    {
      code: 'BE', flag: beflag, value: 0.21, currency: 'EUR', name: 'Belgium'
    },
    {
      code: 'AT', flag: atflag, value: 0.20, currency: 'EUR', name: 'Austria'
    },
    {
      code: 'ES', flag: esflag, value: 0.21, currency: 'EUR', name: 'Spain'
    },
    {
      code: 'PT', flag: ptflag, value: 0.23, currency: 'EUR', name: 'Portugal'
    },
  ];

  const gbflag = require('assets/img/flags/GB.png');
  const usflag = require('assets/img/flags/US.png');
  const ruflag = require('assets/img/flags/RU.png');
  const caflag = require('assets/img/flags/CA.png');
  const fiflag = require('assets/img/flags/FI.png');
  const seflag = require('assets/img/flags/SE.png');
  const nlflag = require('assets/img/flags/NL.png');
  const huflag = require('assets/img/flags/HU.png');

  const options2 = [
    {
      code: 'GB', flag: gbflag, value: 0.20, currency: 'GBP', name: 'UK'
    },
    {
      code: 'US', flag: usflag, value: 0, currency: 'USD', name: 'USA'
    },
    {
      code: 'RU', flag: ruflag, value: 0.20, currency: 'RUB', name: 'Russia'
    },
    {
      code: 'CA', flag: caflag, value: 0.05, currency: 'RUB', name: 'Canada'
    },
    {
      code: 'FI', flag: fiflag, value: 0.24, currency: 'EUR', name: 'Finland'
    },
    {
      code: 'SE', flag: seflag, value: 0.25, currency: 'SEK', name: 'Sweden'
    },
    {
      code: 'NL', flag: nlflag, value: 0.21, currency: 'EUR', name: 'Netherlands'
    },
    {
      code: 'HU', flag: huflag, value: 0.27, currency: 'HUF', name: 'Hungary'
    },
  ];

  const luflag = require('assets/img/flags/LU.png');
  const mcflag = require('assets/img/flags/MC.png');
  const ieflag = require('assets/img/flags/IE.png');
  const saflag = require('assets/img/flags/SA.png');
  const inflag = require('assets/img/flags/IN.png');
  const czflag = require('assets/img/flags/CZ.png');

  const options3 = [
    {
      code: 'LU', flag: luflag, value: 0.14, currency: 'EUR', name: 'Luxembourg'
    },
    {
      code: 'MC', flag: mcflag, value: 0.20, currency: 'EUR', name: 'Monaco'
    },
    {
      code: 'IE', flag: ieflag, value: 0.23, currency: 'EUR', name: 'Ireland'
    },
    {
      code: 'SA', flag: saflag, value: 0.15, currency: 'SAR', name: 'Saudi Arabia'
    },
    {
      code: 'IN', flag: inflag, value: 0.15, currency: 'INR', name: 'India'
    },
    {
      code: 'CZ', flag: czflag, value: 0.15, currency: 'CZK', name: 'Czechia'
    },
  ];

  React.useEffect(() => {
    if (country.country !== countryTVA || country.currency !== currency || tva !== profilInfo.tva) {
      const arrayTemp = [...options, ...options2, ...options3].filter((a) => a.code === country.country);
      select(country.country, arrayTemp.length > 0 ? arrayTemp[0].value : undefined, country.currency);
    }
  }, [country]);

  const classes = useStyles();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  const currentFlag = useMemo(() => {
    const select = [...options, ...options2, ...options3].filter((a) => a.code === countryTVA);
    console.log('select', select);
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
      {
          open ? (
            <Div
              width="450px"
              style={{
                background: 'transparent',
                position: 'absolute',
                top: 35,
                right: '10px',
                paddingBottom: '5px'
              }}
            >
              <div className="dialogContaineCurrency">
                <ClickAwayListener onClickAway={handleCloseNotificationListener}>
                  <Div
                    width="100%"
                    style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContents: 'center'
                    }}
                  >
                    <MenuList role="menu">
                      {
                      options.map((val) => (
                        <MenuItem
                          onClick={() => select(val.code, val.value, val.currency)}
                          className={dropdownItem}
                          key={val.code}
                        >
                          <Div row horizontal="left" style={{ padding: '0px' }} width="100px">
                            <Image src={val.flag} alt={val.code} key="flag" />
                            <p style={{ marginLeft: '6px' }}>{val.name}</p>
                          </Div>
                        </MenuItem>
                      ))
                  }
                    </MenuList>
                    <MenuList role="menu">
                      {
                      options2.map((val) => (
                        <MenuItem
                          onClick={() => select(val.code, val.value, val.currency)}
                          className={dropdownItem}
                          key={val.code}
                        >
                          <Div row horizontal="left" style={{ padding: '0px' }} width="100px">
                            <Image src={val.flag} alt={val.code} key="flag" />
                            <p style={{ marginLeft: '6px' }}>{val.name}</p>
                          </Div>
                        </MenuItem>
                      ))
                  }
                    </MenuList>
                    <MenuList role="menu">
                      {
                      options3.map((val) => (
                        <MenuItem
                          onClick={() => select(val.code, val.value, val.currency)}
                          className={dropdownItem}
                          key={val.code}
                        >
                          <Div row horizontal="left" style={{ padding: '0px' }} width="100px">
                            <Image src={val.flag} alt={val.code} key="flag" />
                            <p style={{ marginLeft: '6px' }}>{val.name}</p>
                          </Div>
                        </MenuItem>
                      ))
                  }
                    </MenuList>
                  </Div>
                </ClickAwayListener>
              </div>
            </Div>
          ) : null
        }
    </Div>
  );
}
