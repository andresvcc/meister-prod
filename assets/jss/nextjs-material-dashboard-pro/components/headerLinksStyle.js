import {
  defaultFont,
  dangerColor,
  whiteColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

import customDropdownStyle from '@/assets/jss/nextjs-material-dashboard-pro/components/customDropdownStyle';

const adminNavbarLinksStyle = (theme) => ({
  ...customDropdownStyle(theme),
  search: {
    margin: '0',
    paddingTop: '7px',
    paddingBottom: '7px',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 15px',
      float: 'none !important',
      paddingTop: '1px',
      paddingBottom: '1px',
      padding: '10px 15px',
      width: 'auto',
    },
  },
  buttonLink: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      margin: '5px 15px 0',
      '& svg': {
        width: '30px',
        height: '24px',
      },
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        width: '30px',
        fontSize: '24px',
        lineHeight: '30px',
        marginRight: '19px',
        marginLeft: '3px',
      },
    },
  },
  searchButton: {
    [theme.breakpoints.down('sm')]: {
      marginRight: '38px',
      float: 'right',
    },
  },
  top: {
    zIndex: 999,
  },
  searchIcon: {
    width: '17px',
    zIndex: 999,
  },
  links: {
    width: '20px',
    height: '20px',
    zIndex: 999,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      width: '30px',
      height: '30px',
      color: 'inherit',
      opacity: '0.8',
      marginRight: '16px',
      marginLeft: '-5px',
    },
  },
  notifications: {
    zIndex: 999,
    position: 'absolute',
    top: '5px',
    border: `1px solid ${whiteColor}`,
    right: '5px',
    fontSize: '9px',
    background: dangerColor[0],
    color: whiteColor,
    minWidth: '16px',
    height: '16px',
    borderRadius: '10px',
    textAlign: 'center',
    lineHeight: '14px',
    verticalAlign: 'middle',
    display: 'block',
  },
  headerLinksSvg: {
    width: '20px !important',
    height: '20px !important',
  },
});

export default adminNavbarLinksStyle;
