import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Div, Button } from 'component';
import HeightIcon from '@material-ui/icons/Height';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const options = {
  '1/3': 4,
  '1/2': 6,
  Full: 12
};

export default function DialogSelect({ onAcept, size }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (val) => {
    onAcept(val);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} justIcon color="transparent">
        {size}
        <HeightIcon style={{ width: '25px', height: '25px', transform: 'rotate(0.25turn)' }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} onClick={() => handleSelect(value)} value={4}>{key}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
