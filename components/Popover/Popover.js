import React, { Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { redux, Div, Button } from 'components';

import classNames from 'classnames';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';

// @material-ui/icons

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/headerLinksStyle';
import currency from '@/assets/JsonDBU/currencies';

const useStyles = makeStyles(styles);

export default function SimplePopover({ options = [], title, select = (val) => console.log(val) }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(null);

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

  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);

  return (
    <Div onHover={(a) => { if (a === false) handleCloseNotification(); }}>
      <Button
        color="primary"
        onClick={handleClick}
        style={{ width: '160px' }}
        // onMouseEnter={overAction}
      >
        {title}
      </Button>
      <Popper
        style={{
          position: 'relative', top: '-50px', width: '160px', background: 'white'
        }}
        open={Boolean(open) || open === true}
        anchorEl={open}
        transition
        disablePortal
        placement="left-start"
      >
        {({ TransitionProps }) => (
          <div style={{ border: '1px solid #ababab20', boxShadow: '4px 2px 8px rgba(0, 0, 0, 0.2)' }}>
            <ClickAwayListener onClickAway={handleCloseNotificationListener}>
              <MenuList role="menu">
                {
                    options.map((val) => (
                      <MenuItem
                        onClick={() => select(val)}
                        className={dropdownItem}
                        key={val}
                      >
                        <Div width="100%" pointer>
                          {val}
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
