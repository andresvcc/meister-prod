import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';

// core components
import Button from '@/components/CustomButtons/Button';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';

const useStyles = makeStyles(styles);

const usFlag = require('@/assets/img/flags/US.png');
const deFlag = require('@/assets/img/flags/DE.png');
const frFlag = require('@/assets/img/flags/FR.png');
const itFlag = require('@/assets/img/flags/IT.png');

const options = ['FR', 'EN', 'DE', 'IT'];

export default function CartBt({ selectLangue = 'EN', setSelectLangue = (a) => false }) {
  const [open, setOpen] = React.useState(null);
  const [selection, setSelection] = React.useState(selectLangue);

  const handleClick = (event) => {
    if (open && open.contains(event.target)) {
      setOpen(null);
    } else {
      setOpen(event.currentTarget);
    }
  };

  const handleCloseNotification = () => {
    setOpen(null);
  };

  const select = (params) => {
    setSelection(params);
    setOpen(null);
    setSelectLangue(params);
  };

  const classes = useStyles();
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  return (
    <div style={{
      width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: '50px'
    }}
    >
      <Button
        color="transparent"
        justIcon
        aria-label="Notifications"
        aria-owns="notification-menu-list"
        aria-haspopup="true"
        className={classes.buttonLink}
        onClick={handleClick}
      >
        {selection === options[0] ? (
          <div>
            <span style={{ fontSize: '12px' }}>FR</span>
            &nbsp;
            <Image src={frFlag} alt="..." key="flag" />
          </div>
        ) : null}

        {selection === options[1] ? (
          <div>
            <span style={{ fontSize: '12px' }}>US</span>
            &nbsp;
            <Image src={usFlag} alt="..." key="flag" />
          </div>
        ) : null}

        {selection === options[2] ? (
          <div>
            <span style={{ fontSize: '12px' }}>DE</span>
            &nbsp;
            <Image src={deFlag} alt="..." key="flag" />
          </div>
        ) : null}

        {selection === options[3] ? (
          <div>
            <span style={{ fontSize: '12px' }}>IT</span>
            &nbsp;
            <Image src={itFlag} alt="..." key="flag" />
          </div>
        ) : null}
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
                    options.map((val) => (
                      <MenuItem
                        onClick={() => select(val)}
                        className={dropdownItem}
                        key={val}
                      >
                        {val === options[0] ? (
                          <div>
                            <span style={{ fontSize: '12px' }}>FR</span>
                            &nbsp;
                            <Image src={frFlag} alt="..." key="flag" />
                          </div>
                        ) : null}

                        {val === options[1] ? (
                          <div>
                            <span style={{ fontSize: '12px' }}>US</span>
                            &nbsp;
                            <Image src={usFlag} alt="..." key="flag" />
                          </div>
                        ) : null}

                        {val === options[2] ? (
                          <div>
                            <span style={{ fontSize: '12px' }}>DE</span>
                            &nbsp;
                            <Image src={deFlag} alt="..." key="flag" />
                          </div>
                        ) : null}

                        {val === options[3] ? (
                          <div>
                            <span style={{ fontSize: '12px' }}>IT</span>
                            &nbsp;
                            <Image src={itFlag} alt="..." key="flag" />
                          </div>
                        ) : null}
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

CartBt.propTypes = {
  color: PropTypes.string,
  searchOptions: PropTypes.array,
  showNotifications: PropTypes.bool,
  order: PropTypes.array,
  horizontal: PropTypes.string,
};
