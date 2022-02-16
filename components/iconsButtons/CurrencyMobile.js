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
import { useRouter } from 'next/router';

// @material-ui/icons
import PersonIcon from '@material-ui/icons/Person';

// core components
import { redux, Div } from 'component';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EuroIcon from '@material-ui/icons/Euro';
import dynamic from 'next/dynamic';
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

export default function MenuMobileIcon(props) {
  const [open, setOpen] = React.useState(false);
  const [{ localCurrency, curentLanguage }, dispatch] = redux();

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleCloseNotification = () => {
    setOpen(false);
  };

  const select = (params) => {
    setOpen(false);
    dispatch({ state: 'localCurrency', value: params });
  };

  React.useEffect(() => {
    const lg = `${navigator.language.split('-')[0].toUpperCase()}`;
    const current = currency[lg];
    dispatch({ state: 'curentLanguage', value: lg });
    dispatch({ state: 'localCurrency', value: current });

    const optionss = ['USD', 'CHF', 'EUR', 'GBP'];
  }, []);

  const classes = useStyles();

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  const options = ['USD', 'CHF', 'EUR', 'GBP'];

  return (
    <Div
      style={{
        padding: 0, margin: 0, fontSize: '16px', position: 'absolute', top: 12, right: 80
      }}
    >
      <Div
        onClick={handleClick}
      >
        {localCurrency}
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
                        options.map((val) => (
                          <MenuItem
                            onClick={() => select(val)}
                            className={dropdownItem}
                            key={val}
                          >
                            <Div horizontal="left" style={{ fontFamily: 'NovaLight, sans serif', fontSize: '14 px' }}>
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
