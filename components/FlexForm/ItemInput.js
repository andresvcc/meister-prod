/* eslint-disable object-curly-newline */
import React, { useDebugValue, useEffect, useState, useCallback } from 'react';
import { Div, redux, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Input from '@/components/CustomInput/CustomInput';
import InputDate from '@/components/CustomInput/CustomInputDate';
import InputTelephone from '@/components/CustomInput/CustomInputTelephone';
import InputRegex from '@/components/CustomInput/CustomInputByRegularFormat';
import InputOption from '@/components/CustomInput/CustomOptions';
import InputChexBox from '@/components/CustomInput/CustomCheckBox';
import InputAutoComplet from '@/components/CustomInput/CustomAutoComplet';
import InputAutoCompletMultiple from '@/components/CustomInput/CustomAutoCompletMultiple';
import Button from '@/components/CustomButtons/Button';
import Typography from '@/components/Typography/Spam';

import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const useStyles = makeStyles((theme) => ({
  errorText: {
    fontSize: '13px',
    lineHeight: '1.1em',
    color: dangerColor[0]
  },
  successText: {
    fontSize: '13px',
    lineHeight: '1.1em',
    color: successColor[4]
  }
}));

const ItemInput = (props) => {
  const {
    id, data, variant, num = [12, 12, 6, 6, 6], onChange, formData, currentIDChange, infoText
  } = props;

  const {
    label, type, pathData, required, disableFuture, disablePast, options, defaultCountry, labelPlacement, link, linkLabel, regex, verify, binding, auto, addPlus, disable, multiline, rows
  } = data;

  const classes = useStyles();
  const { width } = hookDeviceInfo();
  const [state, setState] = useState('');
  const [lastValue, setLastValue] = useState('');
  const [info, setInfo] = useState([]);
  const [visibleErrors, setVisibleErrors] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentID, setCurrentID] = currentIDChange;

  const handleChange = (dataChange) => {
    setLastValue(dataChange.value);
    setVisibleErrors(false);
    setCurrentID('');
    if (lastValue === '') setState('');
    onChange(dataChange);
  };

  const handleFocus = () => {
    setVisibleErrors(true);
    setCurrentID(id);
    // onChange({ id, value: lastValue });
    if (verify !== undefined) {
      const verifyResult = verify(formData, lastValue);
      setInfo(verifyResult);
      // if (lastValue === '')setState('error');
    }
  };

  const handleVerify = (dataVerify) => {
    if (auto) onChange(dataVerify);
    else {
      setLastValue(dataVerify.value);
      onChange(dataVerify);
      if (verify !== undefined) {
        const verifyResult = verify(formData, dataVerify.value);
        if (JSON.stringify(info) !== JSON.stringify(verifyResult)) {
          const error = verifyResult.map((val) => val.return).includes(false);
          const newState = error ? 'error' : 'success';
          if (newState !== state) {
            if (lastValue === '') setState('');
            else setState(newState);
            setVisibleErrors(true);
          }
          setInfo(verifyResult);
        }
      }
    }
  };

  useEffect(() => {
    if (lastValue !== '') {
      if (verify !== undefined) {
        const verifyResult = verify(formData, lastValue);
        setInfo(verifyResult);
        const error = verifyResult.map((val) => val.return).includes(false);
        const newState = error ? 'error' : 'success';
        if (newState !== state) {
          if (lastValue === '') setState('');
          else setState(newState);
          setVisibleErrors(true);
        }
      }
    }
  }, [formData]);

  useEffect(() => {
    if (binding && currentID !== id) {
      const s = binding.includes(currentID) || binding[0] === 'all';
      if (s) {
        setVisibleErrors(true);
        if (verify !== undefined) {
          const verifyResult = verify(formData, lastValue);
          setInfo(verifyResult);
          const error = verifyResult.map((val) => val.return).includes(false);
          const newState = error ? 'error' : 'success';
          if (newState !== state) {
            if (lastValue === '') setState('');
            else setState(newState);
          }
        }
      } else setVisibleErrors(false);
    }
  }, [currentID]);

  const responsiveCalc = () => {
    if (width < 600) return 0;
    if (width < 960) return 1;
    if (width < 1280) return 2;
    if (width < 1920) return 3;
    if (width >= 1920) return 4;
  };

  if (type.indexOf('empty') !== -1) {
    return (
      <GridItem num={JSON.parse(`${(type || '[6,6,6,6,6]').replace('empty', '')}`)} horizontal="center">
        <Div width="100%" height="40px" />
      </GridItem>
    );
  }

  if (type === 'regex') {
    return (
      <GridItem num={num} horizontal="center">
        <InputRegex
          initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
          label={label}
          id={id}
          variant={variant}
          required={required}
          regex={regex}
          onChange={handleVerify}
          onBlur={handleChange}
          onFocus={handleFocus}
        />
      </GridItem>
    );
  }

  if (type === 'date') {
    return (
      <GridItem num={num} horizontal="center">
        <InputDate
          initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
          label={label}
          id={id}
          type={type}
          variant={variant}
          required={required}
          onChange={handleChange}
          disableFuture={disableFuture}
          disablePast={disablePast}
        />
      </GridItem>
    );
  }

  if (type === 'autocomplet') {
    return (
      <GridItem num={num} horizontal="center">
        <Div width="100%">
          <Div width="100%" horizontal="left" style={{ height: info.length > 0 && visibleErrors ? `${15 * ((info.filter((val) => (val.info !== '' || (num[responsiveCalc()] !== 12)) && val.ocult !== true).length))}px` : '0px', opacity: info.filter((val) => !val.ocult).length > 0 && visibleErrors ? 1 : 0, transition: 'height .2s, opacity .5s' }}>
            <Div style={{ position: 'absolute' }} horizontal="left">
              {visibleErrors ? (
                info.filter((val) => !val.ocult).map((val, i) => {
                  if (val.info === '') {
                    return (
                      <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                        {' '}
                      </div>
                    );
                  }
                  return (
                    <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                      {`${val.return ? '✓' : '☒'} ${infoText[val.info] || 'undefined'}`}
                    </div>
                  );
                })
              ) : null}
            </Div>
          </Div>
          <InputAutoComplet
            initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
            label={label}
            id={id}
            value={formData[id]}
            variant={variant}
            required={required}
            options={options}
            onChange={handleVerify}
            onBlur={handleChange}
            onFocus={handleFocus}
            type={type}
            state={state}
            addPlus={addPlus}
          />
        </Div>
      </GridItem>
    );
  }

  if (type === 'autocompletMultiple') {
    return (
      <GridItem num={num} horizontal="center" vertical="top">
        <Div width="100%" vertical="top">
          <Div width="100%" horizontal="left" style={{ height: info.length > 0 && visibleErrors ? `${15 * ((info.filter((val) => (val.info !== '' || (num[responsiveCalc()] !== 12)) && val.ocult !== true).length))}px` : '0px', opacity: info.filter((val) => !val.ocult).length > 0 && visibleErrors ? 1 : 0, transition: 'height .2s, opacity .5s' }}>
            <Div style={{ position: 'absolute' }} horizontal="left">
              {visibleErrors ? (
                info.filter((val) => !val.ocult).map((val, i) => {
                  if (val.info === '') {
                    return (
                      <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                        {' '}
                      </div>
                    );
                  }
                  return (
                    <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                      {`${val.return ? '✓' : '☒'} ${infoText[val.info] || 'undefined'}`}
                    </div>
                  );
                })
              ) : null}
            </Div>
          </Div>
          <InputAutoCompletMultiple
            initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
            label={label}
            id={id}
            value={formData[id]}
            variant={variant}
            required={required}
            options={options}
            onChange={handleVerify}
            onBlur={handleChange}
            onFocus={handleFocus}
            type={type}
            state={state}
            addPlus={addPlus}
            disable={disable}
          />
        </Div>
      </GridItem>
    );
  }

  if (type === 'option') {
    return (
      <GridItem num={num} horizontal="center">
        <Div width="100%">
          <Div width="100%" horizontal="left" style={{ height: info.length > 0 && visibleErrors ? `${15 * ((info.filter((val) => (val.info !== '' || (num[responsiveCalc()] !== 12)) && val.ocult !== true).length))}px` : '0px', opacity: info.filter((val) => !val.ocult).length > 0 && visibleErrors ? 1 : 0, transition: 'height .2s, opacity .5s' }}>
            <Div style={{ position: 'absolute' }} horizontal="left">
              {visibleErrors ? (
                info.filter((val) => !val.ocult).map((val, i) => {
                  if (val.info === '') {
                    return (
                      <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                        {' '}
                      </div>
                    );
                  }
                  return (
                    <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                      {`${val.return ? '✓' : '☒'} ${infoText[val.info] || 'undefined'}`}
                    </div>
                  );
                })
              ) : null}
            </Div>
          </Div>
          <InputOption
            label={label}
            id={id}
            value={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']]) || formData[id] || ''}
            variant={variant}
            required={required}
            options={options}
            onChange={handleVerify}
            onBlur={handleChange}
            onFocus={handleFocus}
            type={type}
            state={state}
          />
        </Div>
      </GridItem>
    );
  }

  if (type === 'telephone') {
    return (
      <GridItem num={num} horizontal="center">
        <InputTelephone
          label={label}
          initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
          id={id}
          variant={variant}
          required={required}
          defaultCountry={defaultCountry}
          onChange={handleChange}
        />
      </GridItem>
    );
  }

  if (type === 'checkbox') {
    return (
      <GridItem num={num} horizontal="center">
        <InputChexBox
          label={label}
          initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
          id={id}
          variant={variant}
          required={required}
          labelPlacement={labelPlacement}
          link={link}
          linkLabel={linkLabel}
          onChange={(value) => onChange({ id, value })}
        />
      </GridItem>
    );
  }

  return (
    <GridItem num={num} horizontal="center">
      <Div width="calc(100% - 16px)">
        <Div width="calc(100% - 16px)" horizontal="left" style={{ height: info.length > 0 && visibleErrors ? `${15 * ((info.filter((val) => (val.info !== '' || (num[responsiveCalc()] !== 12)) && val.ocult !== true).length))}px` : '0px', opacity: info.filter((val) => !val.ocult).length > 0 && visibleErrors ? 1 : 0, transition: 'height .1s, opacity .8s' }}>
          <Div style={{ position: 'absolute' }} horizontal="left">
            {visibleErrors ? (
              info.filter((val) => !val.ocult).map((val, i) => {
                if (val.info === '') {
                  return (
                    <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                      {' '}
                    </div>
                  );
                }
                return (
                  <div key={`${i + 1}`} className={val.return ? classes.successText : classes.errorText}>
                    {`${val.return ? '✓' : '☒'} ${infoText[val.info] || 'undefined'}`}
                  </div>
                );
              })
            ) : null}
          </Div>
        </Div>
        <Input
          label={label}
          initialValue={(pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']] && formData[pathData['0']][pathData['1']][pathData['2']]) || (pathData && formData[pathData['0']] && formData[pathData['0']][pathData['1']]) || (pathData && formData[pathData['0']])}
          id={id}
          type={type}
          variant={variant}
          required={required}
          onChange={handleVerify}
          onBlur={handleChange}
          onFocus={handleFocus}
          state={state}
          multiline={multiline}
          rows={rows}
        />
      </Div>
    </GridItem>
  );
};

export default ItemInput;
