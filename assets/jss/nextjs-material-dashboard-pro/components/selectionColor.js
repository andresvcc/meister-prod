import {
  primaryColor,
  defaultBoxShadow,
  infoColor,
  whiteColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const selectionColor = {
  appBar: {
    position: 'fixed',
    width: '100%',
    // transition: 'all ease-in .6s',
    borderRadius: '0px',
    zIndex: 0,
  },
  transparent: {
    backgroundColor: 'transparent',
    color: whiteColor,
    boxShadow: 'none'
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  secondary: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    // ...defaultBoxShadow,
  },
  white: {
    backgroundColor: 'white',
    color: grayColor[6],
    // ...defaultBoxShadow,
  },
  dark: {
    backgroundColor: grayColor[6],
    color: 'white',
    // ...defaultBoxShadow,
  },
};

export default selectionColor;
