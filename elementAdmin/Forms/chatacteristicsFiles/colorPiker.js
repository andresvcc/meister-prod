import React, { useState, useEffect } from 'react';
import { Div, hookDeviceInfo } from 'component';
import { makeStyles } from '@material-ui/core/styles';
import { HexColorPicker } from 'react-colorful';
import TextField from '@material-ui/core/TextField';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ntc from 'ntcjs';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Span from '@/components/Typography/Spam';

import Button from '@/components/CustomButtons/Button';

import 'react-colorful/dist/index.css';

const colorToName = (name) => {
  const nameArr = ntc.name(name);
  const firtColorName = nameArr[1] || 'undefined';

  return firtColorName;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '150px',
    marginTop: '10px',
    '& .react-colorful__hue': {
      height: '30px',
      borderRadius: '0px 0px 8px 8px',
    },
    '& .react-colorful__saturation': {
      borderRadius: '8px 8px 0px px'
    }
  },
}));

const presetColors = [
  {
    name: 'Black',
    presetColor: '#313131'
  },
  {
    name: 'Blue',
    presetColor: '#55a0f9'
  },
  {
    name: 'Brown',
    presetColor: '#c88a54'
  },
  {
    name: 'Gold',
    presetColor: '#fed370'
  },
  {
    name: 'Green',
    presetColor: '#6bc887'
  },
  {
    name: 'Grey',
    presetColor: '#bbbbbb'
  },
  {
    name: 'Metallic',
    presetColor: '#9f9f9f'
  },
  {
    name: 'Neutrals',
    presetColor: '#f8daae'
  },
  {
    name: 'Orange',
    presetColor: '#ffc46f'
  },
  {
    name: 'Pink',
    presetColor: '#f07ed3'
  },
  {
    name: 'Purple',
    presetColor: '#be88ee'
  },
  {
    name: 'Red',
    presetColor: '#f56576'
  },
  {
    name: 'Silver',
    presetColor: '#d1d1d1'
  },
  {
    name: 'White',
    presetColor: '#ffffff'
  },
  {
    name: 'Yellow',
    presetColor: '#fcea72'
  },
  {
    name: 'Copper',
    presetColor: '#cb6d51'
  },
  {
    name: 'Desert',
    presetColor: '#c8ad7f'
  }
];

const Picker = React.memo(({ onChange }) => {
  const [color, setColor] = useState('#55a0f9');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');

  const [nameColor, setNameColor] = useState('Blue');
  const [nameColor1, setNameColor1] = useState('');
  const [nameColor2, setNameColor2] = useState('');

  const classes = useStyles();

  const handleChangeColor = (name, colorInput) => {
    setNameColor(name);
    setColor(colorInput);
  };

  const handleChangeColor1 = (name, colorInput) => {
    setNameColor1(name);
    setColor1(colorInput);
  };

  const handleChangeColor2 = (name, colorInput) => {
    setNameColor2(name);
    setColor2(colorInput);
  };

  return (
    <Div
      width="380px"
      vertical="top"
      style={{
        position: 'relative', top: '250px', border: 'solid 1px #e4e4e4', background: 'white', borderRadius: '8px 8px 8px 8px', padding: '10px'
      }}
    >

      <GridContainer spacing={1} alignItems="flex-start" style={{ background: 'white', padding: '5px' }}>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <Div row width="100%" style={{ padding: '10px', border: 'solid 1px #aeaeae', borderRadius: '8px' }} onClick={() => handleChangeColor('multicolor', 'linear-gradient(-135deg,#fff572,#fff572 25%,#79ea9b 0,#79ea9b 40%,#5f9de6 0,#5f9de6 55%,#b469f5 0,#b469f5 70%,#f569d1 0,#f569d1)')}>
            <Div
              width="25px"
              height="25px"
              style={{
                background: 'linear-gradient(-135deg,#fff572,#fff572 25%,#79ea9b 0,#79ea9b 40%,#5f9de6 0,#5f9de6 55%,#b469f5 0,#b469f5 70%,#f569d1 0,#f569d1)', borderRadius: '50%', marginRight: '10px', border: '1px solid #dcdd9c'
              }}
            />
            <Span type="JournalCardDescription" style={{ lineHeight: '25px', fontSize: '14px' }}>
              Multicolor
            </Span>
          </Div>
        </GridItem>

        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div row width="100%" style={{ padding: '10px', border: 'solid 1px #aeaeae', borderRadius: '8px' }} onClick={() => handleChangeColor('transparent', 'transparent')}>
            <Div
              width="25px"
              height="25px"
              style={{
                background: 'transparent', borderRadius: '50%', marginRight: '10px', border: '1px solid #dcdd9c'
              }}
            />
            <Span type="JournalCardDescription" style={{ lineHeight: '25px', fontSize: '14px' }}>
              Transparent
            </Span>
          </Div>
        </GridItem>

        <GridItem num={[6, 6, 6, 6, 6]}>
          <Div row width="100%" style={{ padding: '10px', border: 'solid 1px #aeaeae', borderRadius: '8px' }} onClick={() => handleChangeColor('colourless', 'transparent')}>
            <NotInterestedIcon style={{ color: 'red', width: '25px', height: '25px' }} />
            <Span type="JournalCardDescription" style={{ lineHeight: '25px', fontSize: '14px', marginLeft: '5px' }}>
              Colourless
            </Span>
          </Div>
        </GridItem>

        {presetColors.map(({ name, presetColor }) => (
          <GridItem num={[4, 4, 4, 4, 4]} key={presetColor}>
            <Div row width="100%" horizontal="left" style={{ padding: '10px', border: 'solid 1px #aeaeae', borderRadius: '8px' }} onClick={() => handleChangeColor(name, presetColor)}>
              <Div
                width="25px"
                height="25px"
                style={{
                  background: presetColor, borderRadius: '50%', marginRight: '10px', border: '1px solid grey'
                }}
              />
              <Span type="JournalCardDescription" style={{ lineHeight: '25px' }}>
                {name}
              </Span>
            </Div>
          </GridItem>
        ))}
      </GridContainer>

      <Div width="100%" height="20px" />

      <GridContainer spacing={0}>

        {
          nameColor === 'multicolor' ? (
            <>
              <GridItem num={[6, 6, 6, 6, 6]}>
                <Div width="calc(100% - 20px)" vertical="top">

                  <Div width="100%">
                    <TextField
                      id="filled-name1"
                      label="Color"
                      value={`${color1}`}
                      onChange={(event) => handleChangeColor1(colorToName(`${event.target.value}`), event.target.value)}
                      variant="filled"
                      style={{ width: '100%' }}
                    />
                  </Div>

                  <Div width="100%" vertical="bottom" row={false}>
                    <HexColorPicker color={color1} onChange={(color) => handleChangeColor1(colorToName(`${color}`), color)} className={classes.root} />
                  </Div>
                </Div>
              </GridItem>

              <GridItem num={[6, 6, 6, 6, 6]}>
                <Div width="calc(100% - 20px)" vertical="top">

                  <Div width="100%">
                    <TextField
                      id="filled-name2"
                      label="Color"
                      value={`${color2}`}
                      onChange={(event) => handleChangeColor2(colorToName(`${event.target.value}`), event.target.value)}
                      variant="filled"
                      style={{ width: '100%' }}
                    />
                  </Div>

                  <Div width="100%" vertical="bottom" row={false}>
                    <HexColorPicker color={color2} onChange={(color) => handleChangeColor2(colorToName(`${color}`), color)} className={classes.root} />
                  </Div>
                </Div>
              </GridItem>
            </>
          ) : (
            <GridItem num={[12, 12, 12, 12, 12]}>
              <Div width="calc(100% - 20px)" vertical="top">

                <Div width="100%">
                  <TextField
                    id="filled-name"
                    label="Color"
                    value={`${color}`}
                    onChange={(event) => handleChangeColor(colorToName(`${event.target.value}`), event.target.value)}
                    variant="filled"
                    style={{ width: '100%' }}
                  />
                </Div>

                <Div width="100%" vertical="bottom" row={false}>
                  <HexColorPicker color={color} onChange={(color) => handleChangeColor(colorToName(`${color}`), color)} className={classes.root} />
                </Div>
              </Div>
            </GridItem>
          )
        }

      </GridContainer>

      {
        nameColor === 'multicolor' ? (
          <Button
            color="primary"
            onClick={() => onChange(nameColor1 !== '' || nameColor2 !== '' ? `${nameColor1} and ${nameColor2}` : nameColor, nameColor1 !== '' || nameColor2 !== '' ? `linear-gradient(-135deg,${color2 || 'white'},${color2 || 'white'} 50%,${color1 || 'white'} 0,${color1 || 'white'} 100%)` : color)}
            style={{
              color: 'black', width: '340px', borderRadius: '8px', background: nameColor1 !== '' || nameColor2 !== '' ? `linear-gradient(-135deg,${color2 || 'white'},${color2 || 'white'} 50%,${color1 || 'white'} 0,${color1 || 'white'} 100%)` : color
            }}
          >
            <p style={{ color: 'white', fontWeight: 'bolder', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
              Select &nbsp;
              {nameColor1 !== '' || nameColor2 !== '' ? `${nameColor1} and ${nameColor2}` : nameColor}
            </p>
          &nbsp;
            {
            nameColor === 'colourless' ? <NotInterestedIcon style={{ color: 'red', width: '20px', height: '20px' }} /> : null
          }
          </Button>
        ) : (
          <Button
            color="primary"
            onClick={() => onChange(nameColor, color)}
            style={{
              color: 'black', width: '340px', borderRadius: '8px', background: color
            }}
          >
            <p style={{ color: 'white', fontWeight: 'bolder', textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' }}>
              Select &nbsp;
              {`${nameColor}`}
            </p>
          &nbsp;
            {
            nameColor === 'colourless' ? <NotInterestedIcon style={{ color: 'red', width: '20px', height: '20px' }} /> : null
          }
          </Button>
        )
      }

    </Div>
  );
});

function actuButtonColorPiker(prevMovie, nextMovie) {
  return prevMovie.color === nextMovie.color && prevMovie.selected === nextMovie.selected && prevMovie.update === nextMovie.update;
}

const ButtonColorPiker = React.memo(({
  onChange, selectColor, color, selected, update
}) => {
  const [open, setOpen] = useState(color === '');

  const handleChangeColor = (nameColor, color) => {
    if (onChange) {
      setOpen(false);
      onChange(nameColor, color);
    }
  };

  const handleSelectColor = () => {
    if (selectColor) selectColor();
  };

  const popover = {
    position: 'absolute',
    zIndex: '9999',
    left: '50px',
  };

  useEffect(() => {
    if (update) {
      setOpen(true);
      if (selectColor) selectColor();
    }
    // setOpen(open2);
  }, [update]);

  return (
    <Div>
      <Div width="50px">
        <Button round justIcon onClick={() => handleSelectColor()} style={{ background: !open ? color : '#fff' || '#fff', border: selected || open ? 'solid 5px black' : 'solid 2px grey', boxShadow: '1px 0px 7px 0px rgba(255,255,255,0.75)' }} />
      </Div>
      {open ? (
        <div style={popover}>
          <Picker onChange={(nameColor, color) => handleChangeColor(nameColor, color)} />
        </div>
      ) : null}
    </Div>
  );
}, actuButtonColorPiker);

export default ButtonColorPiker;
