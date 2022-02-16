import {
  blackColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const userProfileStyles = {
  cardMotorcycle: {
    background: 'transparent',
    borderRadius: '0',
    border: 'nonde',
    boxShadow: 'none',

  },

  photoProduct: {
    display: 'block',
    maxWidth: '100%',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(0.9)',
      transition: 'transform .5s',

    },
  },
  bodyCardMotorcycle: {
    height: '0px',

  },
  cardMotorcycleTitle: {
    color: `${blackColor} !important`,
    textAlign: 'left',
    position: 'relative',
    top: '-40px',
    cursor: 'pointer',
    fontWeight: '400',
    '&:hover': {
      color: '#2d2b2b !important',
    },
  },

};

export default userProfileStyles;
