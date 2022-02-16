import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Div, redux } from 'component';

function valuetext(value) {
  return `${value}°C`;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% - 50px)',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const AirbnbSlider = withStyles({
  root: {
    color: '#06393c',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  const { 'aria-valuenow': current } = props;
  return (
    <span {...props}>
      <Div style={{ position: 'absolute', top: '-35px', background: 'white' }}>
        {`${current}`}
      </Div>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function RangeSlider({ initialValue, max, onChange = () => false }) {
  const classes = useStyles();
  // const maxValue = maxPrix === 'none' ? 1000 : Math.trunc(maxPrix);
  const [value, setValue] = React.useState(initialValue || [0, max]);

  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className={classes.root}>
      <AirbnbSlider
        value={value}
        ThumbComponent={AirbnbThumbComponent}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        min={0}
        max={max || 5000}
        // defaultValue={defaultValue}
        onChangeCommitted={handleChange}
        onChange={(a, v) => setValue(v)}
      />
    </div>
  );
}
