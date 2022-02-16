import React, { useState } from 'react';
import { Div, hookDeviceInfo } from 'component';
import { makeStyles } from '@material-ui/core/styles';
import { HexColorPicker } from 'react-colorful';
import Button from '@/components/CustomButtons/Button';
import 'react-colorful/dist/index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '120px',
    height: '150px',
    '& .react-colorful__hue': {
      height: '30px',
      borderRadius: '0px 0px 0px 8px',
    },
    '& .react-colorful__saturation': {
      borderRadius: '8px 0px 0px 0px'
    }
  },
}));

const Picker = React.memo(({ onChange }) => {
  const [color, setColor] = useState('#3781A5');
  const classes = useStyles();
  const handleChange = (data) => {
    setColor(data);
  };

  return (
    <Div width="240px" row vertical="top" style={{ position: 'relative', top: '100px' }}>
      <HexColorPicker color={color} onChange={(data) => handleChange(data)} className={classes.root} />
      <Div width="120px" height="150px" vertical="at" style={{ background: '#f7f7f7', borderRadius: '0px 8px 8px 0px', border: 'solid 1px #e4e4e4' }}>
        <div style={{ background: color, width: '60px', height: '60px' }} />
        <div>{color}</div>
        <Button color="primary" onClick={() => onChange(color)}>
          Add
        </Button>
      </Div>
    </Div>
  );
});

function actuButtonColorPiker(prevMovie, nextMovie) {
  return prevMovie.color === nextMovie.color && prevMovie.selected === nextMovie.selected;
}

const ButtonColorPiker = React.memo(({
  onChange, selectColor, color, selected
}) => {
  const [open, setOpen] = useState(true);

  const handleChange = (data) => {
    if (onChange) {
      setOpen(false);
      onChange(data);
    }
  };

  const handleSelectColor = () => {
    if (selectColor) selectColor();
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  };

  return (
    <Div>
      <Div width="50px">
        <Button round justIcon onClick={() => handleSelectColor()} style={{ background: !open ? color : '#fff' || '#fff', border: selected || open ? 'solid 5px black' : 'none' }} />
      </Div>
      {open ? (
        <div style={popover}>
          <Picker onChange={(data) => handleChange(data)} />
        </div>
      ) : null}
    </Div>
  );
}, actuButtonColorPiker);

export default ButtonColorPiker;
