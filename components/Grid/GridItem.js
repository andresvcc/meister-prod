import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const verticalAsing = (value) => {
  if (value === 'top') return 'flex-start';
  if (value === 'bottom') return 'flex-end';
  if (value === 'around') return 'space-around';
  if (value === 'at') return 'space-between';
  return 'center';
};

const horizontalAsing = (value) => {
  if (value === 'left') return 'flex-start';
  if (value === 'right') return 'flex-end';
  if (value === 'around') return 'space-around';
  if (value === 'at') return 'space-between';
  return 'center';
};

export default function GridItem(props) {
  const {
    children, className, dev, num, vertical = 'center', horizontal = 'center', ref, style, zeroMinWidth, ...rest
  } = props;

  const useStyles = makeStyles({
    grid: {
      // padding: '0 15px !important',
      display: 'flex',
      alignItems: verticalAsing(vertical),
      justifyContent: horizontalAsing(horizontal),
      width: '100%'
    },
  });

  const classes = useStyles();

  const responsiveSizes = React.useMemo(() => ({
    xs: !!num && num.length > 0 && [false, 'auto', true, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(num[0]) !== -1 ? num[0] : undefined,
    sm: !!num && num.length > 1 && [false, 'auto', true, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(num[1]) !== -1 ? num[1] : undefined,
    md: !!num && num.length > 2 && [false, 'auto', true, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(num[2]) !== -1 ? num[2] : undefined,
    lg: !!num && num.length > 3 && [false, 'auto', true, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(num[3]) !== -1 ? num[3] : undefined,
    xl: !!num && num.length > 4 && [false, 'auto', true, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].indexOf(num[4]) !== -1 ? num[4] : undefined,
  }), [num]);

  return (
    <Grid ref={ref} zeroMinWidth={zeroMinWidth} item {...responsiveSizes} {...rest} className={`${classes.grid} ${className}`} style={{ background: dev ? '#ff000024' : 'transparent', ...style }}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  dev: PropTypes.bool,
  num: PropTypes.array,
  vertical: PropTypes.oneOf(['top', 'bottom', 'around', 'at', 'center']),
  horizontal: PropTypes.oneOf(['left', 'right', 'around', 'at', 'center']),
};
