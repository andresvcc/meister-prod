import {
  primaryColor,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const accordionStyle = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  accordion: {
    boxShadow: 'none',
    '&:before': {
      display: 'none !important',
    },
  },
  accordionExpanded: {
    margin: '0 !important',
  },
  accordionSummary: {
    minHeight: 'auto !important',
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${grayColor[5]}`,
    padding: '25px 10px 5px 0px',
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
    color: grayColor[2],
    '&:hover': {
      color: primaryColor[0],
    },
  },
  accordionSummaryExpaned: {
    color: primaryColor[0],
    '& $accordionSummaryExpandIcon': {
      [theme.breakpoints.up('md')]: {
        top: 'auto !important',
      },
      transform: 'rotate(180deg)',
      [theme.breakpoints.down('sm')]: {
        top: '10px !important',
      },
    },
  },
  accordionSummaryContent: {
    margin: '0 !important',
  },
  accordionSummaryExpandIcon: {
    [theme.breakpoints.up('md')]: {
      top: 'auto !important',
    },
    transform: 'rotate(0deg)',
    color: 'inherit',
    position: 'absolute',
    right: '20px',
    [theme.breakpoints.down('sm')]: {
      top: '10px !important',
    },
  },
  accordionSummaryExpandIconExpanded: {},
  title: {
    fontSize: '15px',
    fontWeight: 'bolder',
    marginTop: '0',
    marginBottom: '0',
    color: 'inherit',
  },
  accordionDetails: {
    padding: '15px 0px 5px',
  },
});

export default accordionStyle;
