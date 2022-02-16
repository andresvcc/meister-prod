import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Search from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';
import Button from '@/components/CustomButtons/Button';
import Div from '@/components/Div/Div';
import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const LISTBOX_PADDING = 5; // px

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
    if (itemCount > 5) {
      return 5 * itemSize;
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

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

function Virtualize(props) {
  const classes = useStyles();
  const {
    options, className, label, variant, required, open, addPlus, filter, onChange, value, onOpen, initialValue
  } = props;

  const optionsF = options.map((val) => val.title);
  return (
    <Autocomplete
      id={`autocomplet ${label}`}
      style={{ width: '100%' }}
      freeSolo
      disableListWrap
      disableClearable
      selectOnFocus
      classes={classes}
      // clearOnBlur
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={optionsF}
      value={initialValue || null}
      defaultValue={initialValue}
      onOpen={onOpen}
      onChange={onChange}
      {...(addPlus ? {
        filterOptions: (options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== '' && optionsF.map((val) => val.toLowerCase()).indexOf(params.inputValue.toLowerCase()) === -1) {
            filtered.push(params.inputValue);
          }
          return filtered;
        }
      } : {})}
      renderOption={(option) => (
        <Div horizontal="left" row>
          <Div><span style={{ height: '20px', fontSize: '15px' }}>{option}</span></Div>
        </Div>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          className={className}
          margin="normal"
          InputLabelProps={{ shrink: open, style: { fontSize: '14px' }, }}
          label={label}
          variant={variant}
          required={required}
          fullWidth
        />
      )}
    />
  );
}

export default function Input(props) {
  const {
    label, id, variant = 'outlined', required, state, options, onChange, onBlur, initialValue, onFocus, value, addPlus = false
  } = props;

  // const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(!!initialValue);

  const useStyles = makeStyles((theme) => ({
    textField: {
      background: 'white',
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
        '& fieldset': {
          borderColor: state === 'success' ? successColor[0] : state === 'error' ? dangerColor[0] : grayColor[0],
          borderWidth: state === 'error' ? 2 : 1,
          borderLeftWidth: state === 'error' ? 5 : 1,
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
        '&.MuiInputBase-fullWidth': {
          width: '-webkit-fill-available',
          '@supports ( MozAppearance:none )': {
            width: '-moz-available',
          }
        },
      },
      width: '-webkit-fill-available',
      '@supports ( MozAppearance:none )': {
        width: '-moz-available',
      }
    },
  }));

  const classes = useStyles();

  const filter = createFilterOptions();

  return (
    <Virtualize
      initialValue={initialValue}
      options={options}
      className={classes.textField}
      label={label}
      variant={variant}
      required={required}
      open={open}
      filter={filter}
      onOpen={() => setOpen(true)}
      onChange={(event, newValue) => {
        setOpen(true);
        if (typeof newValue === 'string') {
          onBlur({ id, value: newValue });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          onBlur({ id, value: newValue });
        } else {
          onBlur({ id, value: newValue });
        }
      }}
      addPlus={addPlus}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.string,
  required: PropTypes.bool,
  state: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  addPlus: PropTypes.bool,
};
