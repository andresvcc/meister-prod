import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const headerStyle = (theme) => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '2px',
    zIndex: 9,
    color: grayColor[6],
    border: '0',
    borderRadius: '0px',
    padding: '10px 0',
    display: 'block',
  },
  container: {
    ...containerFluid,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '80%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '1520px'
    },
  },
  fixed: {
    position: 'fixed',
    zIndex: 9,
  },
  transparent: {
    transition: 'backgroundColor ease 500ms',
    backgroundColor: 'transparent',
    color: whiteColor,
    boxShadow: 'none'
  },
  transparentBar: {
    color: whiteColor,
  },
  primary: {
    transition: 'backgroundColor ease 500ms',
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
    borderRadius: '0px',
  },
  primaryBar: {
    color: whiteColor,
  },
  secondary: {
    transition: 'backgroundColor ease 500ms',
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  secondaryBar: {
    color: whiteColor,
  },
  white: {
    transition: 'backgroundColor ease 500ms',
    backgroundColor: 'white',
    color: grayColor[6],
    // ...defaultBoxShadow,
    borderRadius: '0px',
  },
  whiteBar: {
    color: grayColor[6],
  },
  dark: {
    transition: 'backgroundColor ease 500ms',
    backgroundColor: grayColor[6],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  darkBar: {
    color: whiteColor,
  },
  sidebarMinimize: {
    float: 'left',
    padding: '0 0 0 5px',
    display: 'block',
    color: grayColor[6],
  },
  sidebarMinimizeRTL: {
    padding: '0 15px 0 0 !important',
  },
  sidebarMiniIcon: {
    width: '20px',
    // height: '17px',
  },
});

export default headerStyle;
