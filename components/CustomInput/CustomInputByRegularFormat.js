import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';
import Div from '@/components/Div/Div';

function TextMaskCustom(props) {
  const { inputRef, regex = [/([0-9,a-z,A-Z])/, /([0-9,a-z,A-Z])/, /([0-9,a-z,A-Z])/, /([0-9,a-z,A-Z])/], ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={regex}
      keepCharPositions
      placeholderChar={'\u0000'}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const Input = (props) => {
  const {
    regex, label, id, type, variant = 'outlined', required, state = '', onChange, onBlur, onFocus, multiline, rows, initialValue
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
    onBlur({ id, value: evt.currentTarget.value });
  };

  const handleFocus = () => {
    onFocus(true);
  };

  return (
    <TextField
      multiline={multiline}
      rows={rows}
      className={classes.textField}
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
      InputProps={{
        inputComponent: TextMaskCustom,
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{
        regex
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
