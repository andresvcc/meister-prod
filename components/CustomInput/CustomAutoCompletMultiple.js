import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { VariableSizeList } from 'react-window';
import Div from '@/components/Div/Div';
import {
  grayColor, primaryColor, blackColor, dangerColor, successColor
} from '@/assets/jss/nextjs-material-dashboard-pro';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: primaryColor[4] }} />;
const checkedIcon = <CheckBoxIcon fontSize="small" style={{ color: primaryColor[3] }} />;

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

export default function Input(props) {
  const {
    label, id, variant = 'outlined', required, initialValue, state, options, onChange, onBlur, onFocus, value, addPlus = false, disable,
  } = props;

  // const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(initialValue && initialValue.length > 0);
  const [popup, setPopup] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    countryList: {
      // ...theme.typography.body1,
    },
    container: {
      width: '100%',
    },
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
      '& .MuiAutocomplete-input': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '10px !important',
        padding: '12.5px 4px !important'
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

        },
      },
      width: '-webkit-fill-available',
      '@supports ( MozAppearance:none )': {
        width: '-moz-available',
      }
    },
    headerLinksSvg: {
      color: 'grey',
      width: '20px !important',
      height: '20px !important',
    },
    searchIcon: {
      width: '17px',
      zIndex: '4',
    },
    searchButton: {
      /// color: 'grey',
      [theme.breakpoints.down('sm')]: {
        marginRight: '38px',
        float: 'right',
      },
    },
  }));

  const classes = useStyles();

  const handleBlur = (event, newValue) => {
    // onBlur({ id, value });
    setPopup(false);
    // if (value === null || value === []) setOpen(false);
  };

  const handleFocus = () => {

    // onFocus
  };

  const filter = createFilterOptions();

  if (disable) return ('');

  return (
    <Autocomplete
      disabled={disable}
      ListboxComponent={ListboxComponent}
      multiple
      defaultValue={initialValue}
      freeSolo
      disableClearable
      disableCloseOnSelect
      open={popup}
      options={options}
      {...(addPlus ? {
        filterOptions: (options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== '' && options.map((val) => val.toLowerCase()).indexOf(params.inputValue.toLowerCase()) === -1) {
            filtered.push(params.inputValue);
          }
          return filtered;
        }
      } : {})}
      renderOption={(option, { selected }) => {
        if (options.map((val) => val.toLowerCase()).indexOf(option.toLowerCase()) === -1) {
          return (
            <Div horizontal="left" row>
              <Div height="40px" width="40px"><span style={{ height: '20px', fontSize: '16px' }}>Add:</span></Div>
              <Div width="10px" />
              <Div><span style={{ height: '20px', fontSize: '15px' }}>{option}</span></Div>
            </Div>
          );
        }

        return (
          <Div horizontal="left" row>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{
                marginRight: 8, height: '20px', width: '20px'
              }}
              checked={selected}
            />
            <span style={{ height: '20px', fontSize: '14px' }}>{option}</span>
          </Div>
        );
      }}
      style={{ width: '100%' }}
      value={initialValue}
      onChange={(event, newValue) => {
        // setValue(newValue.value);
        setOpen(true);
        onBlur({ id, value: newValue });
      }}
      onFocus={handleFocus}
      onOpen={() => {
        // setValue('');
        setOpen(true);
        // onBlur({ id, value: null });
      }}
      onBlur={handleBlur}
      renderTags={(value, getTagProps) => value.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          variant="outlined"
          key={`${option}${index + 1}`}
          label={`${option}`.slice(0, 30)}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        />
      ))}
      renderInput={(params) => {
        const { InputProps, ...restParams } = params;
        const { startAdornment, ...restInputProps } = InputProps;
        return (
          <TextField
            {...restParams}
            className={classes.textField}
            margin="normal"
            multiline
            InputLabelProps={{ shrink: open, style: { fontSize: '16px' }, }}
            label={label}
            variant={variant}
            required={!open ? required : false}
            onClick={() => {
              setPopup(true);
            }}
            InputProps={{
              ...restInputProps,
              startAdornment: (
                <div style={{
                  width: '100%',
                  height: '90px',
                  overflowY: 'auto',
                }}
                >
                  {startAdornment}
                </div>
              ),
            }}
          />
        );
      }}
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
