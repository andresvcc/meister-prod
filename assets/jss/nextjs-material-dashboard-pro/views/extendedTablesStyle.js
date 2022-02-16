import buttonGroupStyle from '@/assets/jss/nextjs-material-dashboard-pro/buttonGroupStyle';
import customCheckboxRadioSwitch from '@/assets/jss/nextjs-material-dashboard-pro/customCheckboxRadioSwitch';
import {
  cardTitle,
  grayColor,
} from '@/assets/jss/nextjs-material-dashboard-pro';

const extendedTablesStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  head: {
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  photoHeader: {
    textAlign: 'left',
    width: '19.5%',
  },
  productHeader: {
    textAlign: 'left',
    width: '23%',
  },
  classificationHeader: {
    textAlign: 'center',
    width: '22%',
  },
  stockHeader: {
    textAlign: 'center',
    width: '12%',
  },
  priceHeader: {
    textAlign: 'center',
    width: '15%',
  },
  centerID: {
    textAlign: 'center',
    width: '100px',
    padding: 0,
    margin: 0,
    minWidth: '50px',
    maxWidth: '50px',
  },
  centerDashboard: {
    textAlign: 'center',
    width: '100px',
    padding: 0,
    margin: 0,
    minWidth: '105px',
    maxWidth: '105px',
  },
  center2: {
    textAlign: 'center',
    minWidth: '120px',
  },
  description: {
    maxWidth: '150px',
  },
  actionButton: {
    margin: '0 0 0 5px',
    padding: '5px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px',
    },
  },
  actionButton2: {
    margin: '0 0 0 5px',
    padding: '5px 30px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px',
    },
  },
  actionButton3: {
    margin: '0 0 0 5px',
    padding: '5px 5px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px',
    },
  },
  cliclable: {
    cursor: 'pointer',
    top: '3px',
    position: 'relative',
    padding: 0,
    margin: 0,
  },
  icon: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    top: '-1px',
    position: 'relative',
  },
  imgContainer: {
    width: '150px',
    minHeight: '140px',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imgContainer3: {
    width: '180px',
  },
  imgContainer2: {
    width: '120%',
    maxWidth: '200px',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
    // left: '-8%',
    // paddingTop:'40px'
  },
  img: {
    width: '200px',
    maxWidth: '250px',
    height: '150px',
    objectFit: 'cover',
    background: 'white',
  },
  img2: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    transform: 'scale(0.9)',
  },
  tdName: {
    minWidth: '180px',
    maxWidth: '200px',
    fontWeight: '400',
    fontSize: '1.3em',
  },
  tdName2: {
    minWidth: '180px',
    maxWidth: '200px',
    fontWeight: '400',
    fontSize: '1em',
    textAlign: 'center',
  },
  tdNameAnchor: {
    color: grayColor[2],
    fontSize: '0.9em',
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: '0.75em',
    fontWeight: '300',
  },
  tdNameSmall2: {
    color: grayColor[0],
    fontSize: '0.9em',
    fontWeight: '300',
    fontFamily: 'NovaLight, sans serif',
  },
  tdNumber: {
    textAlign: 'right',
    minWidth: '80px',
    fontWeight: '300',
    fontSize: '1.1em !important',
  },
  tdNumberSmall: {
    marginRight: '3px',
  },
  tdNumberAndButtonGroup: {
    lineHeight: '1 !important',
  },
  positionAbsolute: {
    position: 'absolute',
    right: '0',
    top: '0',
  },
  customFont: {
    fontSize: '16px !important',
  },
  actionButtonRound: {
    width: 'auto',
    height: 'auto',
    minWidth: 'auto',
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: '5px',
    },
  }
};

export default extendedTablesStyle;
