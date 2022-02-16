import React, {
  useEffect, useState, useCallback, useRef
} from 'react';
import { Div, hookDeviceInfo } from 'component';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CropImage from 'elementsClient/Forms/chatacteristicsFiles/uploaderCrop';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ntc from 'ntcjs';
import PaletteIcon from '@material-ui/icons/Palette';
import Typography from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import { primaryColor, grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import Button from '@/components/CustomButtons/Button';
import ColorEditer from './chatacteristicsFiles/colorEditer';
import ButtonColorPiker from './chatacteristicsFiles/colorPiker';
import 'react-colorful/dist/index.css';

const useStyles = makeStyles((theme) => ({
  addButton: {
    border: `solid 1px ${primaryColor[0]}`,
    color: primaryColor[0],
  },
  animatedItem: {
    animation: '$parpadeo 1.5s infinite',
  },
  '@keyframes parpadeo': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0
    },
    '100%': {
      opacity: 1,
    }
  },
  hoverIcon: {
    '&:hover': {
      color: 'red',
    },
  }
}));

const colorToName = (name) => {
  const nameArr = ntc.name(name);
  return nameArr[1];
};

const ArrowIndicator = (props) => {
  const { message } = props;
  const classes = useStyles();
  return (
    <Div>
      <Typography type="paragraph1">{message}</Typography>
      <ArrowDownwardIcon className={classes.animatedItem} />
    </Div>
  );
};

const StepDiv = (props) => {
  const { formDataMaster } = props;
  const [formData, setData] = formDataMaster;
  const [elements, setElements] = useState([...formData.colors]);
  const [hoverColor, setHoverColor] = useState(null);
  const [selectedColor, setSelectedColor] = useState(formData.colors.length > 0 ? 0 : undefined);
  const [openColorPicket, setOpenColorPicket] = useState(undefined);
  const classes = useStyles();

  const addColor = () => {
    if (elements.length < 7) {
      setElements([...elements, { colorName: '', color: '', photos: ['', '', '', '', '', ''] }]);
      setSelectedColor(undefined);
      setOpenColorPicket(undefined);
    }
  };

  const selectColorSection = (i) => {
    setSelectedColor(i);
    setOpenColorPicket(undefined);
  };

  const editColor = (i) => {
    setOpenColorPicket(i);
  };

  const deleteColor = (i) => {
    const newElements = elements.filter((val, index) => index !== i);
    setElements(newElements);
    setData({
      ...formData,
      colors: newElements
    });
    setSelectedColor(undefined);
    setOpenColorPicket(undefined);
  };

  const changeColor = ({ i, data, name }) => {
    if (elements[i].color !== data) {
      const newElements = [...elements];
      newElements[i].color = data;
      newElements[i].colorName = name;
      setElements(newElements);
      setData({
        ...formData,
        colors: newElements
      });
      setSelectedColor(i);
    }
  };

  const addPhoto = ({ indexPhoto, i, data }) => {
    if (elements[i].color !== data) {
      const newElements = [...elements];
      const newArrPhoto = newElements[i].photos.map((val, index) => (index === indexPhoto ? data : val));
      newElements[i].photos = newArrPhoto;
      setElements(newElements);
      setData({
        ...formData,
        colors: newElements
      });
    }
  };

  const hanldeDeletePhoto = ({ indexPhoto, i }) => {
    const newElements = [...elements];
    const newArrPhoto = newElements[i].photos.map((val, index) => (index === indexPhoto ? '' : val));
    newElements[i].photos = newArrPhoto;
    setElements(newElements);
    setData({
      ...formData,
      colors: newElements
    });
  };

  useEffect(() => {
    setElements([...formData.colors]);
  }, [formData]);

  return (
    <Div width="calc(100% - 20px)">
      <Div width="calc(100% - 10px)" vertical="top" horizontal="left" height="50px">
        <Typography type="h2">Products Colors Photos</Typography>
      </Div>
      <Div row width="100%" horizontal="at" vertical="center" style={{ border: `solid 1px ${grayColor[4]}`, borderRadius: '8px', background: 'white' }}>
        <Div row horizontal="left" style={{ marginLeft: '5px' }}>
          {
            elements.map((val, i) => (
              <Div key={`${i + 1}`} onHover={(enter) => setHoverColor(enter ? i : null)}>
                <Div height="20px">
                  {
                    hoverColor === i && val.color !== '' ? (
                      <Div width="100%" row>
                        <Div onClick={() => deleteColor(i)}>
                          <DeleteForeverIcon />
                        </Div>
                        <Div onClick={() => editColor(i)}>
                          <PaletteIcon />
                        </Div>
                      </Div>
                    ) : ''
                  }
                </Div>
                <ButtonColorPiker
                  color={val.color}
                  update={openColorPicket === i}
                  onChange={(nameColor, color) => changeColor({ i, data: color, name: nameColor })}
                  selectColor={() => selectColorSection(i)}
                  selected={i === selectedColor}
                />
              </Div>
            ))
          }
          {
            elements.length < 8 ? (
              <Div onHover={(enter) => setHoverColor(enter ? -1 : null)}>
                {elements.length <= 0 ? <ArrowIndicator message="Add Color" /> : <Div height="20px">{hoverColor === -1 ? 'Add' : ''}</Div>}
                <Button
                  round
                  justIcon
                  className={classes.addButton}
                  onClick={addColor}
                  color="transparent"
                >
                  +
                </Button>
              </Div>
            ) : null
          }
        </Div>
      </Div>
      <Div width="100%" height="20px" />
      <Div width="100%">
        <Div
          width="100%"
          style={{
            border: `solid 1px ${grayColor[4]}`, borderRadius: '8px', background: 'white', minHeight: '310px'
          }}
        >
          <span>{elements[selectedColor] && elements[selectedColor].colorName}</span>
          <div style={{ height: '15px' }} />
          {selectedColor !== undefined ? (
            <Div width="95%" horizontal="at" row>
              <Div width="100%" height="100%" vertical="top">
                <GridContainer spacing={3}>
                  {/* elements[selectedColor].photos */}
                  {elements[selectedColor].photos.map((val, i) => (
                    <GridItem key={`${i + 1}`} num={[12, 6, 6, 6, 6]}>
                      <Div
                        height="160px"
                        width="100%"
                        vertical={val === '' ? 'center' : 'bottom'}
                        style={{
                          border: `solid 1px ${grayColor[3]}`,
                          backgroundPosition: 'center',
                          backgroundImage: `url("${val}")`,
                          backgroundRepeat: 'no-repeat, no-repeat',
                          backgroundSize: 'contain',
                          color: val !== '' ? 'white' : primaryColor[0],
                          borderRadius: '8px'
                        }}
                      >
                        <Div width={val === '' ? 'auto' : 0}>
                          {val === '' ? <div style={{ position: 'relative', top: '15px' }}><ArrowIndicator /></div> : null}
                          <CropImage onUpload={(data) => addPhoto({ indexPhoto: i, i: selectedColor, data })} i={i + 1} />
                        </Div>
                        {val !== '' ? (
                          <Div style={{ background: '#05050590' }} width="100%">
                            <Div width="90%" vertical="bottom" horizontal="at" row>
                              <div><span>{i}</span></div>
                              <Div onClick={() => hanldeDeletePhoto({ indexPhoto: i, i: selectedColor })}>
                                <DeleteForeverIcon style={{ height: '100%' }} className={classes.hoverIcon} />
                              </Div>
                            </Div>
                          </Div>
                        ) : null}
                      </Div>
                    </GridItem>
                  ))}
                </GridContainer>
              </Div>
            </Div>
          ) : <Div width="70%">Vous devez selectioner un couleur pour pouvoir charger des photos</Div>}
          <Div height="20px" />
        </Div>
      </Div>
      <Div width="100%" height="20px" />
    </Div>
  );
};

export default StepDiv;
