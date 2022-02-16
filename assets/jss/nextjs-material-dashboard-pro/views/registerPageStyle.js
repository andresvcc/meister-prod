import {
  container,
  cardTitle,
  blackColor,
  hexToRgb,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

import customCheckboxRadioSwitch from '@/assets/jss/nextjs-material-dashboard-pro/customCheckboxRadioSwitch';

const registerPageStyle = (theme) => ({
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: 'center',
  },
  container: {
    ...container,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '5px',
    },
    [theme.breakpoints.down('md')]: {
      paddingBottom: '5px',
    },
    [theme.breakpoints.down('lg')]: {
      paddingBottom: '5px',
    },
    [theme.breakpoints.down('xl')]: {
      paddingBottom: '5px',
    },
    position: 'relative',
    zIndex: '3',
  },
  cardSignup: {
    borderRadius: '6px',
    boxShadow:
      `0 16px 24px 2px rgba(${
      hexToRgb(blackColor)
       }, 0.14), 0 6px 30px 5px rgba(${
       hexToRgb(blackColor)
       }, 0.12), 0 8px 10px -5px rgba(${
       hexToRgb(blackColor)
       }, 0.2)`,
    marginBottom: '20px',
    padding: '0px 0px',
    height: '520px',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  form: {
    // padding: '0 -0px',
    position: 'relative',
    left: '-10px'
  },
  socialTitle: {
    fontSize: '18px',
  },
  inputAdornment: {
    marginRight: '18px',
    position: 'relative',
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  customFormControlClasses: {
    margin: '0 12px',
  },
  checkboxLabelControl: {
    margin: '0',
  },
  checkboxLabel: {
    fontSize: '0.875rem',
    marginLeft: '6px',
    color: `rgba(${ hexToRgb(blackColor) }, 0.26)`,
  },
});

export default registerPageStyle;
