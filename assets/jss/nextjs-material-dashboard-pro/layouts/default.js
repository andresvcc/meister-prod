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
      [theme.breakpoints.only('xs')]: {
        width: '0px',
        background: 'transparent',
        position: 'absolute',
        left: '-5px',
      },
    },
    '*:hover::-webkit-scrollbar': {
      width: '0.5em',
      background: 'transparent',
      position: 'absolute',
      left: '-5px',
      [theme.breakpoints.only('xs')]: {
        width: '0px',
        background: 'transparent',
        position: 'absolute',
        left: '-5px',
      },
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-track-piece': {
      backgroundColor: grayColor[10],
      '-webkit-border-radius': '6px',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: grayColor[10],
      borderRadius: '15px',
    }
  },
});

export default appStyle;

/*

    'scroll-behavior': 'smooth',
    position: 'relative',
    top: '0',
    // transition: 'all 0.5s',
    '&:after': {
      display: 'table',
      clear: 'both',
      content: '" "',
    },

*/
