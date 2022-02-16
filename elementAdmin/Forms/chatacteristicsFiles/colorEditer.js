import React, { useEffect, useState } from 'react';
import { Div } from 'component';
import Button from '@/components/CustomButtons/Button';
import { makeStyles } from '@material-ui/core/styles';
import { HexColorPicker } from 'react-colorful';

import 'react-colorful/dist/index.css';

const useStyles = makeStyles((theme) => ({
  root2: {
    width: '150px',
    height: '110px',
    '& .react-colorful__hue': {
      height: '30px',
      borderRadius: '0px 0px 0px 0px',
    },
    '& .react-colorful__saturation': {
      borderRadius: '8px 8px 0px 0px'
    }
  },
}));

function actu(prevMovie, nextMovie) {
  return prevMovie.color === nextMovie.color
    && prevMovie.disabled === nextMovie.disabled;
}

const ColorEditer = React.memo(({ onChange, disabled, color }) => {
  const [value, setValue] = useState('#fff');
  const classes = useStyles();

  const handleChange = (data) => {
    onChange(data);
  };

  useEffect(() => {
    setValue(color);
  }, [color]);

  return (
    <Div height="145px" style={{ marginRight: '10px' }}>
      {
        disabled ? <div className={classes.root2} />
          : <HexColorPicker color={value} onChange={(data) => setValue(data)} className={classes.root2} />
      }
      {
        disabled ? <div style={{ height: '20px', width: '100%', margin: 0 }} />
          : (
            <Button
              disabled={disabled}
              color="primary"
              onClick={() => handleChange(value)}
              style={{
                height: '20px', width: '100%', margin: 0, borderRadius: '0px 0px 8px 8px'
              }}
            >
              update
            </Button>
          )
    }
    </Div>
  );
}, actu);

export default ColorEditer;
