import {
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const proportion1 = (theme) => ({
  [theme.breakpoints.only('xs')]: {
    fontSize: '35px',
    lineHeight: '1.3em'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '35px',
    lineHeight: '25px'
  },

  [theme.breakpoints.only('xl')]: {
    fontSize: '35px',
    lineHeight: '30px'
  },
});

const defaultTypo = (theme) => ({

  // footer
  heading1: {
    fontFamily: 'NovaLight, sans-serif',
    fontSize: '17px',
  },
  heading2: {
    fontFamily: 'NovaLight, sans serif',
    fontSize: '15px',
    color: 'grey'
  },
  configuratorTitle: {
    fontFamily: 'Georgia',
    ...proportion1(theme)
  },
});

export default defaultTypo;
