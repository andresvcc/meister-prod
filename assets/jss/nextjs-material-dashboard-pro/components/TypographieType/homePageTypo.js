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
    fontSize: '15px',
    lineHeight: '1.3em'
  },
  [theme.breakpoints.only('sm')]: {
    fontSize: '18px',
    lineHeight: '25px'
  },

  [theme.breakpoints.only('xl')]: {
    fontSize: '18px',
    lineHeight: '30px'
  },
});

const typographieHome = (theme) => ({
  defaultFontStyle: {
    // ...defaultFont,
    fontSize: '14px',
  },

});

export default typographieHome;
