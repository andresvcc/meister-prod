import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Div, redux } from 'component';
import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const Input = (props) => {
  const {
    label, id, type, variant = 'outlined', required, state = '', onChange, onBlur, onFocus, multiline, rows, initialValue,
  } = props;

  const useStyles = makeStyles((theme) => ({
    textField: {
      background: 'white',
      '& label.Mui-focused': {
        color: blackColor,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor[0],
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : grayColor[0],
        borderWidth: state === 'error' ? 2 : 1,
        color: blackColor,
      },
      '& .MuiInput-underline:hover': {
        borderBottomColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : grayColor[0],
        borderWidth: state === 'error' ? 2 : 1,
        color: blackColor,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : grayColor[0],
          borderWidth: state === 'error' ? 2 : 1,
          borderLeftWidth: state === 'error' ? 5 : 1,
        },
        '&:hover fieldset': {
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : primaryColor[2],
          borderWidth: state === 'error' ? 3 : 1,
          borderLeftWidth: state === 'error' ? 5 : 1,
        },
        '&.Mui-focused fieldset': {
          borderWidth: 2,
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : primaryColor[2],
          borderLeftWidth: 5,
        },
      },
    },
  }));

  const classes = useStyles();

  const handleChange = (evt) => {
    onChange({ id, value: evt.currentTarget.value });
  };

  const handleBlur = (evt) => {
    if (onBlur !== undefined) onBlur({ id, value: evt.currentTarget.value });
  };

  const handleFocus = () => {
    if (onFocus !== undefined) onFocus(true);
  };

  return (
    <TextField
      multiline={multiline}
      rows={rows}
      className={classes.textField}
      // value={initialValue}
      defaultValue={typeof initialValue === 'string' ? initialValue : ''}
      label={label}
      type={type}
      variant={variant}
      required={required}
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      InputLabelProps={{
        style: { fontSize: '16px' },
      }}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  required: PropTypes.bool,
  state: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default Input;
