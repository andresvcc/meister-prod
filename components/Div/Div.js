import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const newWidth = (width) => (typeof width === 'string' ? width : `${width}px`);
const newHeight = (height) => (typeof height === 'string' ? height : `${height}px`);

const verticalAsing = (value) => {
  if (value === 'top') return 'flex-start';
  if (value === 'bottom') return 'flex-end';
  if (value === 'around') return 'space-around';
  if (value === 'at') return 'space-between';
  if (value === 'space-between') return 'space-between';
  return 'center';
};

const horizontalAsing = (value) => {
  if (value === 'left') return 'flex-start';
  if (value === 'right') return 'flex-end';
  if (value === 'around') return 'space-around';
  if (value === 'at') return 'space-between';
  if (value === 'space-between') return 'space-between';
  return 'center';
};

export default function Div(props) {
  const {
    dev,
    children,
    className,
    style,
    row,
    vertical,
    horizontal,
    onClick,
    onHover,
    onMouseDown,
    onMouseUp,
    width,
    height,
    flex,
    pointer,
    ref,
  } = props;

  const isClickable = !!onClick || pointer;

  const classes = makeStyles((theme) => ({
    root: {
      background: dev ? '#ff004a25' : 'transparent',
      cursor: isClickable ? 'pointer' : 'auto',
      userSelect: 'none',
      outline: 'none',
      overflow: 'hidden',
      flexWrap: flex ? 'wrap' : 'nowrap',
    },
    notResponsiveWidth: {
      width: newWidth(width),
    },
    notResponsiveHeight: {
      height: newHeight(height),
    },
    responsiveWidth: {
      [theme.breakpoints.only('xs')]: {
        width: newWidth(width.length >= 1 ? width[0] : 'auto'),
      },
      [theme.breakpoints.only('sm')]: {
        width: newWidth(width.length >= 2 ? width[1] : 'auto'),
      },
      [theme.breakpoints.only('md')]: {
        width: newWidth(width.length >= 3 ? width[2] : 'auto'),
      },
      [theme.breakpoints.only('lg')]: {
        width: newWidth(width.length >= 4 ? width[3] : 'auto'),
      },
      [theme.breakpoints.only('xl')]: {
        width: newWidth(width.length >= 5 ? width[4] : 'auto'),
      },
    },
    responsiveHeight: {
      [theme.breakpoints.only('xs')]: {
        height: newHeight(height[0]),
      },
      [theme.breakpoints.only('sm')]: {
        height: newHeight(height[1]),
      },
      [theme.breakpoints.only('md')]: {
        height: newHeight(height[2]),
      },
      [theme.breakpoints.only('lg')]: {
        height: newHeight(height[3]),
      },
      [theme.breakpoints.only('xl')]: {
        height: newHeight(height[4]),
      },
    }
  }))();

  const button = onClick || onHover || onMouseDown || onMouseUp ? {
    role: 'button',
    onClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter: onHover ? (e) => onHover(true, e) : () => null,
    onMouseLeave: onHover ? (e) => onHover(false, e) : () => null,
  } : {};

  const divClasses = classNames({
    [classes.root]: true,
    [classes.notResponsiveWidth]: !Array.isArray(width),
    [classes.notResponsiveHeight]: !Array.isArray(height),
    [classes.responsiveWidth]: Array.isArray(width),
    [classes.responsiveHeight]: Array.isArray(height),
    [className]: className,
  });

  if (row) {
    return (
      <Grid
        className={divClasses}
        container
        direction="row"
        alignItems={verticalAsing(vertical)}
        justifyContent={horizontalAsing(horizontal)}
        style={style}
        spacing={0}
        {...button}
        ref={ref}
      >
        {children}
      </Grid>
    );
  }

  return (
    <Grid
      className={divClasses}
      container
      direction="column"
      justifyContent={verticalAsing(vertical)}
      alignItems={horizontalAsing(horizontal)}
      style={style}
      spacing={0}
      {...button}
      ref={ref}
    >
      {children}
    </Grid>
  );
}

Div.defaultProps = {
  vertical: 'center',
  horizontal: 'center',
  width: 'auto',
  height: 'auto',
  row: false,
  margin: [0, 0],
};

Div.propTypes = {
  dev: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.any,
  row: PropTypes.bool,
  width: PropTypes.any,
  height: PropTypes.any,
  vertical: PropTypes.oneOf(['top', 'bottom', 'around', 'at', 'center', 'space-between']),
  horizontal: PropTypes.oneOf(['left', 'right', 'around', 'at', 'center', 'center top', 'space-between']),
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  flex: PropTypes.bool,
  pointer: PropTypes.bool,
};
