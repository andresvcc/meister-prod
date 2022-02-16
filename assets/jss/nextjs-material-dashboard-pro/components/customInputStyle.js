import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont,
  whiteColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const customInputStyle = {
  disabled: {
    '&:before': {
      borderColor: 'transparent !important',
    },
  },
  datePiker: {

  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: `${grayColor[4]}!important`,
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: primaryColor[0],
    },
    '& + p': {
      fontWeight: '300',
    },
  },
  underlineError: {
    '&:after': {
      borderColor: dangerColor[0],
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: successColor[0],
    },
  },
  labelRoot: {
    ...defaultFont,
    color: `${grayColor} !important`,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.42857',
    top: '0px',
    letterSpacing: 'unset',
    '& + $underline': {
      marginTop: '0px',
    },
  },
  labelRootError: {
    // color: `${dangerColor[0] } !important`,
  },
  labelRootSuccess: {
    // color: `${successColor[0] } !important`,
  },
  formControl: {
    width: '97%',
    margin: '0 0 17px 0',
    paddingTop: '27px',
    position: 'relative',
    verticalAlign: 'unset',
    '& svg,& .fab,& .far,& .fal,& .fas,& .material-icons': {
      color: grayColor[14],
    },
  },
  formControlAutoComplete: {
    width: '70% !important',
    minWidth: '180px',
    margin: '0 0 17px 0 !important',
    position: 'relative',
    verticalAlign: 'unset',
    '& svg,& .fab,& .far,& .fal,& .fas,& .material-icons': {
      color: grayColor[14],
    },
  },
  autoComplete: {
    // position: 'relative',
    // top: '-25px',
  },
  top: {

  },
  searchButton: {
    position: 'relative',
    right: '15px',
  },
  labelAutocomplete: {
    // color: `${whiteColor} !important`,
  },
  textFieldAutocomplete: {
    '& .MuiInputBase-input': {
      // color: `${grayColor[3] } !important`, // Text color
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: `${grayColor[4]}!important`, // unSelect color line
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: primaryColor[0], // onFocus color line
    },
  },
  whiteUnderline: {
    '&:hover:not($disabled):before,&:before': {
      backgroundColor: whiteColor,
    },
    '&:after': {
      backgroundColor: whiteColor,
    },
  },
  input: {
    // color: grayColor[14],
    height: 'unset',
    '&,&::placeholder': {
      fontSize: '14px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: '400',
      lineHeight: '1.42857',
      opacity: '1',
    },
    '&::placeholder': {
      color: grayColor[3],
    },
  },
  whiteInput: {
    '&,&::placeholder': {
      color: whiteColor,
      opacity: '1',
    },
  },
};

export default customInputStyle;
