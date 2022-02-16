import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LastPageIcon from '@material-ui/icons/LastPage';
import { primaryColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const iconsSet = (classes) => ({
  Add: () => (
    <AddCircleIcon
      className={classes.addIcon}
      style={{
        color: primaryColor[0], borderRadius: '50%'
      }}
    />
  ),
  Filter: React.forwardRef((props, ref) => (
    <LastPageIcon {...props} fontSize="small" ref={ref} />
  ))
});

export default iconsSet;
