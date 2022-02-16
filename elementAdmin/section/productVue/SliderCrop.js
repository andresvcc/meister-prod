import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { Div } from 'component';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CustomSlider from './CustomSlider';

export default function InputSlider({
  value,
  min,
  max,
  step,
  ariaLabelledby,
  className,
  onChange,
}) {
  const [temp, setTemp] = useState(value);
  const handleChange = (e, value) => {
    const newTemp = `${parseFloat(((typeof value === 'number' ? value : 0) / max) * 100).toFixed(1)}`;
    setTemp(newTemp);
    onChange(value);
  };

  const handleInputOnblur = (event) => {
    const n = (max / 100) * parseFloat(`${event.target.value}`, 10);
    if (`${n}`.indexOf('N') !== -1) return onChange('');
    if (n === '') return onChange('');
    return onChange(n);
  };

  return (
    <Div width="100%" horizontal="center" row vertical="top" style={{ paddingLeft: '14px', paddingRight: '14px' }}>
      <CustomSlider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        aria-labelledby={ariaLabelledby}
        className={className}
      />
      <FormControl style={{ marginLeft: '40px' }}>
        <Input
          value={temp}
          margin="dense"
          onBlur={handleInputOnblur}
          onChange={(evt) => setTemp(evt.target.value)}
          inputProps={{
            type: 'text',
            'aria-labelledby': 'input-slider',
            style: { width: '90px' }
          }}
          endAdornment={(
            <InputAdornment position="start">
              %
            </InputAdornment>
          )}
        />
      </FormControl>
    </Div>
  );
}
