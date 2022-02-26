/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from 'react';
// material ui
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { Dialog } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import Image from 'next/image';

// components
import { redux, Div, Button } from 'components';
import BlockIcon from '@material-ui/icons/Block';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';
import Spam from '@/components/Typography/Spam';
import { grayColor, primaryColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import CustomOptions from '@/components/CustomInput/CustomOptions';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Langues from '@/components/iconsButtons/langues';
import DialogOption from './dialogOption';
import DialogDelete from './dialogDeleteBlock';
import DialogDescriptionEdit from './dialogDescriptionEdit';
import Editor from './TextEditor';
import EditorChamp from './EditorChamp';

// Config
import config from './ProductUniqueCofig';

// Mui Theme
const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)'
      }
    }
  }
});

// Use styles dialog
const useStyles = makeStyles({
  dialog: {
  }
});

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
    style: { fontSize: '14px', color: primaryColor[0] }
  };
}

const ProductUnique = ({ product, setProductData }) => {
  const classes = useStyles();

  const [state, setState] = useState({ size: 0, color: 0, qty: 1 });
  const [dialog, setDialog] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [value, setValue] = React.useState(0);

  const [selectLangue, setSelectLangue] = useState('EN');

  const alReadyInBag = false;

  const {
    price = 0,
    currency = '',
    name = '',
    fournisseur = '',
    description = '',
    languages = {},
    colors = [],
    sizesType = 'none',
    selectableOptions1 = '',
    selectableOptions2 = '',
    selectableOptions3 = '',
    features = [],
    categorie = '',
    brand = '',
  } = product || {};

  const langues = React.useMemo(() => Object.entries(languages), [languages]);

  const selectColor = useMemo(() => (colors[state.color] ? colors[state.color] : { photos: [] }), [colors, state.color]);
  const photos = useMemo(() => [...(selectColor.photos.filter((val) => val !== ''))], [selectColor, product]);

  const updateState = ({ stateName, value }) => {
    setState({
      ...state,
      [stateName]: value
    });
  };

  useEffect(() => {
    setCurrentPhoto(0);
  }, [state.color, product?.colors]);

  const handleClose = () => {
    setDialog(false);
  };

  const backPhoto = () => {
    // setCurrentPhoto(currentPhoto + 1);
    if (!selectColor.photos) return true;
    if (currentPhoto <= 0) setCurrentPhoto(photos.length - 1);
    else setCurrentPhoto(currentPhoto - 1);
  };

  const forwardPhoto = () => {
    // setCurrentPhoto(currentPhoto + 1);
    if (!selectColor.photos) return true;
    if (currentPhoto < (photos.length - 1)) setCurrentPhoto(currentPhoto + 1);
    else setCurrentPhoto(0);
  };

  const optionsSizeType = [...new Set(sizesType.split(','))];
  const selectableOptionsArr1 = [...new Set(selectableOptions1.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr2 = [...new Set(selectableOptions2.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr3 = [...new Set(selectableOptions3.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));

  const addBLockLangue = () => {
    const selectLangueObject = languages[selectLangue] || {};

    const newLangueArr = {
      ...languages,
      [selectLangue]: {
        ...(selectLangueObject || {}),
        content: [
          ...(selectLangueObject && selectLangueObject.content ? selectLangueObject.content : []),
          {
            size: 4,
            item: undefined,
            index: selectLangueObject?.content?.length || 0
          }
        ]
      }
    };

    setProductData({
      ...product,
      languages: newLangueArr
    });
  };

  const setContainBLock = (block, i) => {
    const selectLangueObject = languages[selectLangue];
    const newComtent = selectLangueObject.content;

    newComtent[i] = {
      size: selectLangueObject?.content[i]?.size || 4,
      item: block,
      index: selectLangueObject?.content?.length
    };

    const newLaangueArr = {
      ...languages,
      [selectLangue]: {
        ...selectLangueObject,
        content: newComtent
      }
    };

    setProductData({
      ...product,
      languages: newLaangueArr
    });
  };

  const setProperty = (property, block) => {
    const selectLangueObject = languages[selectLangue];
    const newLangueArr = {
      ...languages,
      [selectLangue]: {
        ...selectLangueObject,
        [property]: `${block?.blocks.map((a) => a.text).join(' ')}`,
        [`${property}_block`]: block
      }
    };

    setProductData({
      ...product,
      languages: newLangueArr
    });
  };

  const deleteBlock = (index) => {
    const selectLangueObject = languages[selectLangue];
    const newContent = selectLangueObject.content.filter((a, i) => i !== index);

    const newLaangueArr = {
      ...languages,
      [selectLangue]: {
        ...selectLangueObject,
        content: newContent
      }
    };

    setProductData({
      ...product,
      languages: newLaangueArr
    });
  };

  const editSizeBlock = (size, index) => {
    const selectLangueObject = languages[selectLangue];
    const newContent = selectLangueObject.content;
    newContent[index].size = size;

    const newLaangueArr = {
      ...languages,
      [selectLangue]: {
        ...selectLangueObject,
        content: newContent
      }
    };

    setProductData({
      ...product,
      languages: newLaangueArr
    });
  };

  if (product === undefined) return null;

  return (
    <Div width="100%" height="100%" style={{ maxWidth: '1400px' }}>
      <ThemeProvider theme={theme}>
        <Dialog
          fullWidth
          maxWidth="xl"
          open={dialog}
          aria-labelledby="max-width-dialog-title"
          PaperProps={{
            style: {
              backgroundColor: 'white',
              width: '80vw',
              height: '75%',
            },
          }}
          onClose={handleClose}
          classes={{
            paper: classes.dialog,
          }}
        >
          <Div width="100%" height="100%">
            <Div {...config.photoContainerFull}>
              <Div {...config.photoVisibleFull}>
                <Div onClick={backPhoto}>
                  <ArrowBack />
                </Div>
                <img src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt="product" {...config.photo(selectColor.photos ? selectColor.photos[currentPhoto] : '')} />
                <Div onClick={forwardPhoto}>
                  <ArrowForward />
                </Div>
              </Div>
            </Div>
          </Div>
        </Dialog>
      </ThemeProvider>

      <Div width="100%" horizontal="right">
        <Langues selectLangue={selectLangue} setSelectLangue={setSelectLangue} />
      </Div>

      <Div width="100%" height={['850px', '850px', '650px', '650px', '650px']} horizontal="left" style={{ backgroundColor: '#EFEEE960' }}>
        <Div width="98%" height={['850px', '850px', '650px', '650px', '650px']}>
          <GridContainer>
            <GridItem num={[12, 12, 7, 7, 7]}>
              <Div width="90%" height={['400px', '450px', '650px', '650px', '650px']}>
                <Div {...config.photoVisible}>
                  {
                    photos.length > 1 ? (
                      <Div onClick={backPhoto}>
                        <ArrowBack />
                      </Div>
                    ) : null
                  }
                  <Div onClick={() => setDialog(true)} width="100%">
                    <img src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt="product" {...config.photo(selectColor.photos ? selectColor.photos[currentPhoto] : '')} />
                  </Div>
                  {
                    photos.length > 1 ? (
                      <Div onClick={forwardPhoto}>
                        <ArrowForward />
                      </Div>
                    ) : null
                  }
                </Div>
                <Div {...(photos.length > 4 ? config.mapPhoto2 : config.mapPhoto)}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    {
                      photos.length > 1 ? photos.map((val, i) => (
                        <GridItem num={photos.length > 4 ? [2, 2, 2, 2, 2] : [3, 3, 3, 3, 3]} key={`${i + 1}`}>
                          <Div
                            key={`${val + i}`}
                            {...config.photo3({ image: val, selected: currentPhoto === i, size: photos.length })}
                            onClick={() => setCurrentPhoto(i)}
                          >
                            {val !== '' ? <img src={val} alt="product" {...config.photo3({ image: val, selected: currentPhoto === i })} /> : null}
                          </Div>
                        </GridItem>
                      )) : null
                    }
                  </Grid>
                </Div>
              </Div>

            </GridItem>

            <GridItem num={[12, 12, 5, 5, 5]}>
              <Div width="100%" height={['400px', '400px', '650px', '650px', '650px']} vertical="top">
                <Div width="100%" horizontal="left" vertical="top" height="400px">
                  <Div height="30px" />

                  <Div width="100%" height="30px" horizontal="left">
                    <Spam type="produitUniqueFournisseur">{`CRAFTED BY ${brand}`}</Spam>
                  </Div>

                  <Div width="90%" height="80px" horizontal="left">
                    <Div width="98%" horizontal="left" style={{ textAlign: 'justify', border: 'dashed 1px grey' }}>
                      <Editor
                        toolbarHidden
                        titleBlockquote
                        contain={languages[selectLangue]?.nameProduct_block || languages[selectLangue]?.nameProduct}
                        style={{ minHeight: '50px', maxHeight: '52px' }}
                        maxCaracter={51}
                        setEditingContain={(block) => setProperty('nameProduct', block)}
                        variantUpdate={selectLangue}
                      />
                    </Div>
                  </Div>

                  <Div width="90%" height="40px" horizontal="left">
                    <Spam type="produitUniqueTitle">
                      {`${currency === '$' ? currency : ''} ${price} ${currency !== '$' ? currency : ''}`}
                    </Spam>
                  </Div>
                  <Div height="30px" />

                  <Div width="98%" horizontal="left" style={{ textAlign: 'justify', border: 'dashed 1px grey' }}>
                    <Editor
                      toolbarHidden
                      superFancyBlockquote
                      contain={languages[selectLangue]?.description_block || languages[selectLangue]?.description}
                      setEditingContain={(block) => setProperty('description', block)}
                      style={{ minHeight: '50px', maxHeight: '150px' }}
                      maxCaracter={140}
                      variantUpdate={selectLangue}
                    />
                  </Div>
                </Div>

                <Div width="100%" style={{ paddingTop: '30px' }} horizontal="left" row>
                  {
                    // Select option 1 34 - Selection option 2 33
                      selectableOptionsArr1.length > 1 ? (
                        <Div width="34%" horizontal="left">
                          <CustomOptions
                            label="Select option 1"
                            id="option1"
                            value={selectableOptionsArr1[0] || ''}
                            options={[...selectableOptionsArr1.map((a, i) => ({ title: a, value: `${a}` }))]}
                          />
                        </Div>
                      ) : null
                  }
                  {
                      selectableOptionsArr2.length > 1 ? (
                        <Div width="33%" horizontal="center">
                          <CustomOptions
                            label="Select option 2"
                            id="option2"
                            value={selectableOptionsArr2[0] || ''}
                            options={[...selectableOptionsArr2.map((a) => ({ title: a, value: a }))]}
                          />
                        </Div>
                      ) : null
                  }
                  {
                      selectableOptionsArr3.length > 1 ? (
                        <Div width="33%" horizontal="right">
                          <CustomOptions
                            label="Select option 3"
                            id="option3"
                            value={selectableOptionsArr3[0] || ''}
                            options={[...selectableOptionsArr3.map((a) => ({ title: a, value: a }))]}
                          />
                        </Div>
                      ) : null
                  }
                </Div>

                <Div width="100%">
                  <Div {...config.line1} height="40px">
                    {(colors.length <= 1 ? [] : colors).map((val, i) => (
                      <Div
                        key={`${val.nom}${i + 1}`}
                        {...config.colorBorder({ val, select: state.color === i })}
                        onClick={() => updateState({ stateName: 'color', value: i })}
                      >

                        {val.colorName === 'colourless' ? <BlockIcon style={{ color: 'red' }} /> : null}
                      </Div>
                    ))}
                  </Div>
                  <Div {...config.line2}>
                    <Div {...config.sizesContainer}>
                      {sizesType.length < 20 ? optionsSizeType.map((val, i) => (
                        <Div
                          key={`${val}${i + 1}`}
                          {...config.label({ val, select: state.size === i })}
                          onClick={() => updateState({ stateName: 'size', value: i })}
                        >
                          <Spam type="produitUniqueSizes">{val}</Spam>
                        </Div>
                      )) : (
                        <Div width="250px" horizontal="left">
                          <CustomOptions
                            label="Select size"
                            id="size"
                            value={state.size}
                            options={[...optionsSizeType.map((a, i) => ({ title: a, value: `${i}` }))]}
                            onBlur={(a) => updateState({ stateName: 'size', value: `${a.value}` })}
                          />
                        </Div>
                      )}
                    </Div>
                    <Div {...config.qtyContainer}>
                      <Div {...config.qtyBtsup({ disable: state.qty <= 1 })} onClick={() => updateState({ stateName: 'qty', value: state.qty > 1 ? state.qty - 1 : state.qty })}>
                        <Spam type="produitUniqueDescription">-</Spam>
                      </Div>
                      <Div {...config.qtyValue({ disable: state.qty <= 1 })}>
                        <Spam type="produitUniqueDescription">
                          {state.qty}
                        </Spam>
                      </Div>
                      <Div {...config.qtyBtAdd} onClick={() => updateState({ stateName: 'qty', value: state.qty + 1 })}>
                        <Spam type="produitUniqueDescription">+</Spam>
                      </Div>
                    </Div>
                  </Div>
                </Div>
                <Div height="10px" />
                <Div width="100%">
                  <Div {...config.sumitButton(alReadyInBag)}>
                    <Spam type="subtitle4">
                      Add to Bag
                    </Spam>
                  </Div>
                </Div>
              </Div>
            </GridItem>
          </GridContainer>
        </Div>
      </Div>

      <Div width="100%" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <GridContainer spacing={0}>
          {
            langues.filter(([key]) => key === selectLangue).map(([key, value]) => (
              <EditorChamp
                key={key}
                value={value}
                editSizeBlock={editSizeBlock}
                setContainBLock={setContainBLock}
                deleteBlock={deleteBlock}
                addBlock={(index) => console.log(index)}
              />
            ))
          }

          <GridItem num={[4, 4, 4, 4, 4]}>
            <Div width="100%" height="476px" onClick={addBLockLangue}>
              <Div width="50%" height="233px" style={{ border: 'dashed 1px #c3c3c3' }}>
                <PostAddIcon style={{ color: 'grey', width: '50px', height: '50px' }} />
                <p style={{ color: 'grey' }}>Add Block</p>
              </Div>
            </Div>
          </GridItem>

        </GridContainer>
      </Div>
    </Div>
  );
};

export default ProductUnique;
