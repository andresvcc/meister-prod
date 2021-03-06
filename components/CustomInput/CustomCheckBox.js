import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  primaryColor, blackColor, grayColor
} from '@/assets/jss/nextjs-material-dashboard-pro';
import Div from '@/components/Div/Div';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 18,
    height: 18,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: primaryColor[0],
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
        + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
        + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: primaryColor[4],
    },
  },
});

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
}

export default function Input(props) {
  const {
    label, id, linkLabel, link, labelPlacement = 'end', required, state, onChange = () => false, initialValue, style, center
  } = props;

  const handleClick = () => {
    onChange(!initialValue);
  };

  return (
    <Div
      row
      width={center ? 'auto' : '100%'}
      horizontal={center ? 'center' : 'left'}
      style={{
        paddingLeft: '10px', paddingTop: '10px', paddingBottom: '5px', ...style
      }}
    >
      <FormControlLabel
        style={{ marginRight: '8px' }}
        value="top"
        control={<StyledCheckbox onClick={handleClick} checked={initialValue} />}
        label={(
          <div>
            <p style={{ margin: 0, padding: 0, color: grayColor[6] }}>
              {`${label} ${required ? '*' : ''}`}
              {link ? (
                <span
                  type="link2"
                  style={{
                    cursor: 'pointer', fontSize: '16px', color: '#026eb1', textDecoration: 'underline',
                  }}
                >
                  <Link href={link} passHref>
                    <span>{linkLabel}</span>
                  </Link>
                </span>
              ) : null}
            </p>
          </div>
        )}
        labelPlacement={labelPlacement}
      />
    </Div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  state: PropTypes.string,
  labelPlacement: PropTypes.oneOf(['start', 'top', 'bottom', 'end']),
  linkLabel: PropTypes.string,
  link: PropTypes.string,
  onChange: PropTypes.func,
  initialValue: PropTypes.bool,
};
