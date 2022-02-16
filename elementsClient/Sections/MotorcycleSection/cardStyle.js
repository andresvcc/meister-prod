import {
  cardTitle,
  grayColor,
  blackColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const userProfileStyles = {
  cardTitle,
  CardBody: {
    padding: 5
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
    '& small': {
      fontSize: '80%',
      fontWeight: '400',
    },
  },
  cardCategory: {
    marginTop: '10px',
    color: `${grayColor[0]} !important`,
    textAlign: 'center',
  },
  description: {
    color: grayColor[0],
  },
  updateProfileButton: {
    float: 'right',
  },
  photoProduct: {
    // display: 'flex',
    maxWidth: '100%',
//     maxHeight: '1080px',
    maxHeight:'100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },

  cardProduct: {
    background: '#F7F6F4',
    borderRadius: '0px',
    // margin: 'none !important',
    // position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    minHeight: '230px',
    // width: '100%',
  },
  cardProduct2: {
    background: '#F7F6F4',
    borderRadius: '0px',
    // margin: 'none !important',
    // position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    minHeight: '250px',
    width: '100%',
  },
  cardMotorcycle: {
    background: 'transparent',
    borderRadius: '0',
    border: 'nonde',
    boxShadow: 'none',
  },
  bodyCardProduct: {
    padding: '0 20px 0px 20px',
    cursor: 'pointer',
    width: '100%',
    // heigth: 'auto',
  },
  cardProductBrand: {
    color: '#707070 !important',
    textAlign: 'left',
    height: '10px'
  },
  cardProductTitle: {
    color: `${blackColor} !important`,
    textAlign: 'left',
    height: '15px'

  },
  cardProductPrice: {
    color: `${blackColor} !important`,
    textAlign: 'left',
    textTransform: 'capitalize',
    height: '16px'
  },
  bodyCardMotorcycle: {
    height: '0px',
  },
  cardMotorcycleTitle: {
    color: `${blackColor} !important`,
    textAlign: 'center',
    position: 'relative',
    top: '-40px',
    cursor: 'pointer',
    fontWeight: '400',
    '&:hover': {
      color: '#2d2b2b !important',
    },
  },
  addToBagButton: {
    width: '100%',
    margin: 0,
    height: '25px',
    borderRadius: 2,
    fontSize: '1.2em',
    fontFamily: 'GorgiaLight',
    textTransform: 'capitalize'
  },
  addToBagButtonMobileScroll: {
    width: '100%',
    margin: 0,
    height: '30px',
    borderRadius: 2,
    fontSize: '1.2em',
    fontFamily: 'GorgiaLight',
    textTransform: 'capitalize',
    padding: '5px',
  },
  colorBt: {
    width: '10px !important',
    height: '10px !important',
    minWidth: '10px',
    minHeight: '10px',
  },
  sizesBt: {
    width: '15px !important',
    height: '15px !important',
    minWidth: '15px',
    minHeight: '30px',
    fontSize: '14px',
    marginBottom: '0px',
  }
};

export default userProfileStyles;
