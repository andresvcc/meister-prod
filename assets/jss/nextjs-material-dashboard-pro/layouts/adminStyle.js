import {
  drawerWidth,
  drawerMiniWidth,
  transition,
  containerFluid,
  grayColor,
  primaryColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const appStyle = (theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5em',
      background: 'transparent',
      position: 'absolute',
      left: '-5px',
    },
    '*:hover::-webkit-scrollbar': {
      width: '0.5em',
      background: 'transparent',
      position: 'absolute',
      left: '-5px',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-track-piece': {
      backgroundColor: '#FaFaFa', // scrollbar admin
      '-webkit-border-radius': '6px',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'grey', // scrollbar admin
      borderRadius: '15px',
    }
  },
  wrapper: {
    position: 'relative',
    top: '0',
    background: '#FaFaFa', // white
    height: '100vh',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "',
    },
  },
  mainPanel: {
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    background: '#FaFaFa',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    ...transition,
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    marginTop: '70px',
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
  container: { ...containerFluid },
  map: {
    marginTop: '70px',
  },
  mainPanelSidebarMini: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerMiniWidth}px)`,
    },
  },
  mainPanelWithPerfectScrollbar: {
    overflow: 'hidden !important',
  },
});

export default appStyle;
