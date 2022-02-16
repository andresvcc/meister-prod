import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Input from '@material-ui/core/Input';
import { Div } from 'component';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 48,
    width: 48,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -20,
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 8px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  const { 'aria-valuenow': current, 'aria-valuemax': max } = props;
  return (
    <span {...props}>
      <Div style={{ position: 'absolute', top: '12px', fontSize: '12px' }}>
        <p>{`${parseFloat((current / max) * 100).toFixed(1)}%`}</p>
      </Div>
    </span>
  );
}

export default function CustomizedSlider({
  value,
  min,
  max,
  step,
  ariaLabelledby,
  className,
  onChange,
  ...rest
}) {
  const classes = useStyles();

  return (
    <PrettoSlider
      ThumbComponent={AirbnbThumbComponent}
      value={typeof value === 'number' ? value : 0}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      aria-labelledby={ariaLabelledby}
      className={className}
      {...rest}
    />
  );
}
