/* eslint-disable react/button-has-type */
/* eslint-disable class-methods-use-this */
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import LuxonUtils from '@date-io/luxon';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Span from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Div from '@/components/Div/Div';
import Button from '@/components/CustomButtons/Button';

import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const yyyymmdd = (date) => {
  const x = new Date(date);
  const y = x.getFullYear().toString();
  const m = (x.getMonth() + 1);
  const d = x.getDate();
  return `${y}-${m < 10 ? `0${m}` : `${m}`}-${d < 10 ? `0${d}` : `${d}`}`;
};

const style = {
  margin: '5px'
};

const CustomToolbar = (props) => {
  const {
    date,
    isLandscape,
    openView,
    setOpenView,
    title
  } = props;

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  return (
    <Div width="100%" height="100px" style={{ background: primaryColor[5] }}>
      <GridContainer spacing={0} alignItems="flex-start">

        <GridItem num={[4, 4, 4, 4, 4]}>
          <Div
            onClick={handleChangeViewClick('date')}
            style={style}
          >
            <Div height="70px" vertical="at">
              <Span type="TitleInputDate">Day</Span>
              <Span type="InputDate">{(new Date(date)).toLocaleDateString('en-US', { day: 'numeric' })}</Span>
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[4, 4, 4, 4, 4]}>
          <Div
            onClick={handleChangeViewClick('month')}
            style={style}
          >
            <Div height="70px" vertical="at">
              <Span type="TitleInputDate">Month</Span>
              <Span type="InputDate">{(new Date(date)).toLocaleDateString('en-US', { month: 'long' })}</Span>
            </Div>
          </Div>
        </GridItem>

        <GridItem num={[4, 4, 4, 4, 4]}>
          <Div
            onClick={handleChangeViewClick('year')}
            style={style}
          >
            <Div height="70px" vertical="at">
              <Span type="TitleInputDate">Year</Span>
              <Span type="InputDate">{(new Date(date)).getFullYear()}</Span>
            </Div>
          </Div>
        </GridItem>

      </GridContainer>
    </Div>
  );
};

export default function InputDate(props) {
  const {
    label, id, variant = 'outlined', required, state, disableFuture, disablePast, onChange, onBlur, onFocus
  } = props;

  const [repons, setRepons] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleChange = (value) => {
    setRepons(value);
    setOpen(false);
    const date = yyyymmdd(value);
    onChange({ id, value: date });
  };

  const CssKeyboardDatePicker = withStyles({
    root: {
      '& label.Mui-focused': {
        color: blackColor,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor[0],
      },
      '& .MuiInput-underline:before': {
        borderBottomColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : grayColor[0],
        borderWidth: state === 'error' ? 2 : 1,
        color: blackColor,
      },
      '& .MuiInput-underline:hover': {
        borderBottomColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : grayColor[0],
        borderWidth: state === 'error' ? 2 : 1,
        color: blackColor,
      },
      '& .MuiOutlinedInput-root': {
        background: 'white',
        '& fieldset': {
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : open ? primaryColor[2] : grayColor[0],
          borderWidth: state === 'error' ? 2 : open ? 3 : 1,
          borderLeftWidth: state === 'error' ? 5 : open ? 5 : 1,
        },
        '&:hover fieldset': {
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : primaryColor[2],
          borderWidth: state === 'error' ? 3 : 1,
          borderLeftWidth: state === 'error' ? 5 : 1,
        },
        '&.Mui-focused fieldset': {
          borderWidth: 2,
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : primaryColor[2],
          borderLeftWidth: 5,
        },
      },
    },
  })(KeyboardDatePicker);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CssKeyboardDatePicker
        keyboardIcon={<span />}
        disableFuture={disableFuture}
        disablePast={disablePast}
        open={open}
        autoOk
          // id={id}
        openTo="year"
        format="dd/MM/yyyy"
        label={label}
        views={['year', 'month', 'date']}
        value={repons}
        onChange={handleChange}
        onClick={() => (!open ? setOpen(true) : null)}
        onClose={() => setOpen(false)}
        variant="dialog"
        required={required}
        inputVariant={variant}
        TextFieldComponent={TextField}
        ToolbarComponent={CustomToolbar}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        style={{
          width: '-webkit-fill-available',
          '@supports ( MozAppearance:none )': {
            width: '-moz-available',
          }
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

InputDate.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.string,
  required: PropTypes.bool,
  state: PropTypes.string,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
