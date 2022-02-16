import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/typographyStyle';

const useStyles = makeStyles(styles);

export default function Spam(props) {
  const classes = useStyles();
  const {
    className, children, color, type, style
  } = props;

  const spanClasses = classNames({
    [classes.defaultFontStyle]: true,
    [classes[type]]: type,
    [classes[color]]: color,
    [className]: className,
  });

  return (
    <div className={spanClasses} style={style}>
      {type.includes('link') ? <>&nbsp;</> : null}
      {children}
      {type.includes('link') ? <>&nbsp;</> : null}
    </div>
  );
}

Spam.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'white',
    'light',
    'darck',
    'info',
    'success',
    'warning',
    'danger',
    'gray',
  ]),
  type: PropTypes.string
};
