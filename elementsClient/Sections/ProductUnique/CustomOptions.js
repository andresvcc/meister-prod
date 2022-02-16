import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@/components/CustomButtons/Button';
import Div from '@/components/Div/Div';
import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

export default function Input(props) {
  const {
    label, id, variant = 'outlined', required, state, options, onChange = () => false, onBlur = () => false, onFocus = () => false, value, width = 'calc(100% - 16px)'
  } = props;

  const useStyles = makeStyles((theme) => ({
    countryList: {
      // ...theme.typography.body1,
    },
    formControl: {
      background: 'transparent',
      padding: '0px',
      // height: '25px',
      '& label.Mui-focused': {
        color: blackColor,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor[0],
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: 'transparent',
        borderWidth: state === 'error' ? 2 : 1,
        color: blackColor,
      },
      '& .MuiInput-underline:hover': {
        borderBottomColor: 'transparent',
        borderWidth: state === 'error' ? 2 : 1,
        color: blackColor,
      },
      '& .MuiOutlinedInput-root': {
        background: 'transparent',
        '& fieldset': {
          background: 'transparent',
          borderColor: '#e1e1df',
          borderWidth: state === 'error' ? 2 : 1,
          borderLeftWidth: state === 'error' ? 5 : 1,
        },
        '&:hover fieldset': {
          background: 'transparent',
          borderColor: '#babab8',
          borderWidth: state === 'error' ? 3 : 1,
          borderLeftWidth: state === 'error' ? 5 : 1,
        },
        '&.Mui-focused fieldset': {
          background: 'transparent',
          borderWidth: 2,
          borderColor: '#e1e1df',
          borderLeftWidth: 5,
        },
        '&.MuiInputBase-fullWidth': {
          background: 'transparent',
          width: 'auto',
          '@supports ( MozAppearance:none )': {
            width: 'auto',
          }
        },
      },
      width: '-webkit-fill-available',
      '@supports ( MozAppearance:none )': {
        width: '-moz-available',
      }
    },
  }));

  const classes = useStyles();

  const handleChange = (event) => {
    onBlur({ id, value: event.target.value });
  };

  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function logit() {
    if (open) {
      setOpen(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });

  return (
    <Div width={width} height="75px">
      <FormControl variant={variant} className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label={label}
          onOpen={onOpen}
          onClose={onClose}
          open={open}
          style={{ height: '35px' }}
          MenuProps={{ style: { height: '300px' }, disableScrollLock: true }}
        >
          {options.map((val, i) => (
            <MenuItem key={`${i + 1}`} value={val.value}><span style={{ height: '20px', fontSize: '15px' }}>{val.title}</span></MenuItem>
          ))}
        </Select>
      </FormControl>
    </Div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.string,
  required: PropTypes.bool,
  state: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
};
