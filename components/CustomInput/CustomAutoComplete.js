/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// core componets

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import Div from '@/components/Div/Div';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/customInputStyle';
import Button from '@/components/CustomButtons/Button';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles(styles);

export default function CustomAutocomplete(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const {
    formControlProps,
    id,
    label,
    options = [],
    onChange,
    icon,
    color,
    onFocus,
  } = props;

  let formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControlAutoComplete
    );
  } else {
    formControlClasses = classes.formControlAutoComplete;
  }

  const action = () => {
    if (value !== null) {
      onChange(value);
      // setValue(null);
    } else if (input !== '') {
      onChange(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (value !== null) {
      onChange(value);
      // setValue(null);
    }
  }, [value]);

  const optionsMenu = options.map((option) => option.title);

  return (
    <Div width="100%" row>
      <FormControl {...formControlProps} className={formControlClasses}>
        <Autocomplete
        // disableClearable
          freeSolo
          clearOnBlur
          // id={id}
          options={optionsMenu}
          className={classes.autoComplete}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onOpen={() => {
            if (onFocus) onFocus(true);
            setOpen(true);
            setValue(null);
          }}
          onClose={() => {
            setOpen(false);
            onFocus(false);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setInput(e.target.value)}
              margin="normal"
              InputLabelProps={{ shrink: false, className: classes.labelAutocomplete, style: { color, fontSize: '15px' } }}
              label={!value && !open ? label : ' '}
              className={classes.textFieldAutocomplete}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                style: { color }
              }}
            />
          )}
        />
      </FormControl>
      <Button
        color="transparent"
        aria-label="edit"
        justIcon
        round
        className={classes.searchButton}
        onClick={action}
      >
        {icon}
      </Button>
    </Div>
  );
}

CustomAutocomplete.propTypes = {
  id: PropTypes.string,
  formControlProps: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  icon: PropTypes.node,
  color: PropTypes.string,
};
