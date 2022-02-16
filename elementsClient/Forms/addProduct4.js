import React, {
  useEffect, useState, useCallback, useRef
} from 'react';
import { Div, hookDeviceInfo } from 'component';
import Button from '@/components/CustomButtons/Button';
import { primaryColor, grayColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import { makeStyles } from '@material-ui/core/styles';
import { HexColorPicker } from 'react-colorful';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CropImage from 'elementsClient/Forms/chatacteristicsFiles/uploaderCrop';
import Typography from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ColorEditer from './chatacteristicsFiles/colorEditer';
import ButtonColorPiker from './chatacteristicsFiles/colorPiker';

import 'react-colorful/dist/index.css';

const titleForm = {
  EN: 'Product parameters',
  FR: 'Paramètres du produit'
};

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
      color: 'white',
    },
  }
}));

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

const StepDiv = React.memo((props) => {
  const { formDataMaster } = props;
  const [formData, setData] = formDataMaster;
  const [elements, setElements] = useState([]);
  const [hoverColor, setHoverColor] = useState(null);
  const [selectedColor, setSelectedColor] = useState(undefined);
  const classes = useStyles();

  const addColor = () => {
    if (elements.length < 7) {
      setElements([...elements, { color: '', photos: ['', '', '', '', '', ''] }]);
      setSelectedColor(undefined);
    }
  };

  const deleteColor = (i) => {
    const newElements = elements.filter((val, index) => index !== i);
    setElements(newElements);
    setData({
      ...formData,
      colors: newElements
    });
    setSelectedColor(undefined);
  };

  const changeColor = ({ i, data }) => {
    if (elements[i].color !== data) {
      const newElements = [...elements];
      newElements[i].color = data;
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

  return (
    <Div width="100%">
      <Div row width="100%" horizontal="at" vertical="bottom" style={{ border: `solid 1px ${grayColor[4]}`, borderRadius: '8px', }}>
        <Div row horizontal="left" style={{ marginLeft: '5px' }}>
          {
                elements.map((val, i) => (
                  <Div key={`${i + 1}`} onHover={(enter) => setHoverColor(enter ? i : null)}>
                    <Div height="20px">
                      {hoverColor === i && val.color !== '' ? (
                        <Div onClick={() => deleteColor(i)}>
                          <DeleteForeverIcon />
                        </Div>
                      ) : ''}
                    </Div>
                    <ButtonColorPiker
                      color={val.color}
                      onChange={(data) => changeColor({ i, data })}
                      selectColor={() => setSelectedColor(i)}
                      selected={i === selectedColor}
                    />
                  </Div>
                ))
              }
          {
              elements.length < 7 ? (
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
        <Div horizontal="right">
          {selectedColor !== undefined ? <ColorEditer color={elements[selectedColor].color} onChange={(data) => changeColor({ i: selectedColor, data })} /> : <div style={{ height: '145px' }} />}
        </Div>
      </Div>
      <Div width="100%" height="300px">
        <Div width="100%" height="270px" style={{ border: `solid 1px ${grayColor[4]}`, borderRadius: '8px', }}>
          {selectedColor !== undefined ? (
            <Div width="95%" height="270px" horizontal="at" row>
              <Div width="100%" height="100%" vertical="top">
                <GridContainer spacing={3}>
                  {elements[selectedColor].photos.map((val, i) => (
                    <GridItem key={`${i + 1}`} num={[12, 4, 4, 4, 4]}>
                      <Div
                        height="110px"
                        width="90%"
                        vertical={val === '' ? 'center' : 'bottom'}
                        style={{
                          border: `solid 1px ${grayColor[3]}`,
                          backgroundImage: `url(${val})`,
                          backgroundRepeat: 'no-repeat, repeat',
                          backgroundSize: 'cover',
                          color: val !== '' ? 'red' : primaryColor[0],
                          borderRadius: '8px'
                        }}
                      >
                        <Div width={val === '' ? 'auto' : 0}>
                          {val === '' ? <div style={{ position: 'relative', top: '15px' }}><ArrowIndicator /></div> : null}
                          <CropImage key={`${i + 1}`} onUpload={(data) => addPhoto({ indexPhoto: i, i: selectedColor, data })} />
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
          ) : <Div width="70%">Vous devez selectioner un couleur/matériau pour pouvoir charger des photos</Div>}
        </Div>
      </Div>
    </Div>
  );
});

export default StepDiv;
