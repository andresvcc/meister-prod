import { cardTitle, grayColor, successColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import buttonStyle from '@/assets/jss/nextjs-material-dashboard-pro/components/buttonStyle';
import buttonGroupStyle from '@/assets/jss/nextjs-material-dashboard-pro/buttonGroupStyle';
import customCheckboxRadioSwitch from '@/assets/jss/nextjs-material-dashboard-pro/customCheckboxRadioSwitch';

const sweetAlertStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  successIcon: {
    color: successColor[0]
  },
  right: {
    textAlign: 'right',
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
  cardTitle: {
    marginTop: '0',
    marginBottom: '3px',
    color: grayColor[2],
    fontSize: '16px',
  },
  littleCenter: {
    textAlign: 'center',
    fontSize: '16px !important',
    alingItem: 'flex-start'
  },
  center: {
    textAlign: 'center',
  },
  left: {
    textAlign: 'left',
  },
  ...buttonStyle,
  photoOrder: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  photoCell: {
    maxWidth: '90px'
  }
};

export default sweetAlertStyle;
