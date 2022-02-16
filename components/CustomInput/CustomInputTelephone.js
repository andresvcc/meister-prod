import { forwardRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const TexFiledCustom = (props, ref) => (
  <TextField
    {...props}
    inputRef={ref}
  />
);

const CustomPhoneNumber = forwardRef(TexFiledCustom);

export default function Input(props) {
  const {
    label, id, type, variant = 'outlined', required, state, defaultCountry, onChange, initialValue
  } = props;

  const [phone, setPhone] = useState(typeof initialValue === 'string' ? initialValue : '');

  const useStyles = makeStyles((theme) => ({
    countryList: {
      // ...theme.typography.body1,
    },
    container: {
      width: '100%',
    },
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
        '&.MuiInputBase-fullWidth': {
          width: '-webkit-fill-available',
          '@supports ( MozAppearance:none )': {
            width: '-moz-available',
          }
        },
      },
      width: '-webkit-fill-available',
      '@supports ( MozAppearance:none )': {
        width: '-moz-available',
      }
    }
  }));

  const classes = useStyles();

  const handleChange = (phone) => {
    setPhone(phone);
    // onChange(phone);
  };

  return (
    <PhoneInput
      international
      value={phone}
      // initialValueFormat="international"
      placeholder="Enter phone number"
      defaultCountry={defaultCountry}
      onChange={handleChange}
      onBlur={() => onChange({ id, value: phone })}
      className={classes.textField}
      fullWidth
      // id={id}
      type="tel"
      label={label}
      variant={variant}
      name="phone"
      InputLabelProps={{
        style: { fontSize: '16px' },
      }}
      required={required}
      inputComponent={CustomPhoneNumber}
    />
  );
}
