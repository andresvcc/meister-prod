/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from 'react';
// material ui
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import SettingsIcon from '@material-ui/icons/Settings';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import {
  deviceType, browserName
} from 'react-device-detect';

// components
import { redux, Div, Button } from 'components';
import BlockIcon from '@material-ui/icons/Block';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Span from '@/components/Typography/Spam';
import VideoIntro from '@/elementsClient/VideoIntro/VideoIntro';
import { grayColor, primaryColor } from '@/assets/jss/nextjs-material-dashboard-pro';
import CustomOptions from '@/components/CustomInput/CustomOptions';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Langues from '@/components/iconsButtons/langues';
import DialogOption from './dialogOption';
import DialogDelete from './dialogDeleteBlock';
import DialogDescriptionEdit from './dialogDescriptionEdit';
import Editor from './TextEditor';
import EditorChampMotorcycle from './EditorChampMotorcycle';
import UploaderCrop from './uploaderCrop';

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

const useHideOnScrolled = (browserName) => {
  // Store the state
  const [scrollY, setScrollPos] = useState(0);

  // On Scroll
  const onScroll = React.useCallback(() => {
    const y = window.pageYOffset;
    if (y < 600 && browserName !== 'Safari') setScrollPos(Math.round(y / 10));
  });

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  if (browserName === 'Safari') return 0;

  if (typeof window === 'undefined') return 0;

  return scrollY;
};

const LazyDialog = ({
  children, title, maxWidth = 'xs', btProps = {}, icon = <SettingsIcon style={{ color: 'white' }} />, notAcept = false
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="transparent" justIcon onClick={() => setOpen(true)} {...btProps}>{icon}</Button>
      <Dialog
        open={open}
        fullWidth
        maxWidth={maxWidth}
        onClose={handleSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
          !notAcept ? (
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          ) : null
        }
        <DialogContent>
          {children}
        </DialogContent>
        {
          !notAcept ? (
            <DialogActions>
              <Div width="100%">
                <Div width="calc(100% - 5px)" row>
                  <Button color="primary" style={{ width: '45%', minWidth: '100px' }} onClick={handleSubmit}>Acept</Button>
                </Div>
              </Div>
            </DialogActions>
          ) : null
        }
      </Dialog>
    </>
  );
};

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
    video = '',
    gallery = [],
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
  }, [state.color]);

  const handleClose = () => {
    setDialog(false);
  };

  const backPhoto = () => {
    // setCurrentPhoto(currentPhoto + 1);
    if (!selectColor.photos) return true;
    if (currentPhoto <= 0) setCurrentPhoto(selectColor.photos.length - 1);
    else setCurrentPhoto(currentPhoto - 1);
  };

  const forwardPhoto = () => {
    // setCurrentPhoto(currentPhoto + 1);
    if (!selectColor.photos) return true;
    if (currentPhoto < (selectColor.photos.length - 1)) setCurrentPhoto(currentPhoto + 1);
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

  const parallaxImage = '/static/images/Meister_paralax_img.png';

  const videoExits = typeof video === 'string' && video !== '';

  const scrollYHook = useHideOnScrolled(browserName);
  const scrollYPos = React.useMemo(() => scrollYHook * 10, [scrollYHook]);

  const setparallaxVideo = (urlVideo) => {
    setProductData({
      ...product,
      video: `${urlVideo}`
    });
  };

  const addImageToGallery = (imageBlob) => {
    setProductData({
      ...product,
      gallery: [...product?.gallery, `${imageBlob}`]
    });
  };

  const defaultDetails = ['Versatility', ' ', 'Agility', ' ', 'Powered', ' '];
  const [selectDetailTimer, setSelectDetailTimer] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (selectDetailTimer < 5) setSelectDetailTimer(selectDetailTimer + 1);
      else setSelectDetailTimer(0);
    }, selectDetailTimer % 2 === 0 ? 1500 : 5000);
    return () => clearTimeout(timer);
  }, [selectDetailTimer]);

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

      <Div width="100%" height="30px" horizontal="right" style={{ backgroundColor: '#2e5e80' }}>
        <LazyDialog title="Add selectable options">
          <Div width="100%" horizontal="left" style={{ padding: '10px', marginBottom: '20px' }}>
            <TextField id="outlined-basic" label="video URL" variant="outlined" onBlur={(event) => setparallaxVideo(event.target.value)} style={{ width: '100%' }} />
          </Div>
        </LazyDialog>
      </Div>
      <Div width="100%">
        <div className="parallax" style={{ backgroundImage: `url('${parallaxImage || '/static/images/bg7.jpg'}')`, width: '100%', maxHeight: '600px' }}>
          <div
            className="parallaxChildren"
            style={{
              width: '100%',
              transform: `translate3d(0,${(scrollYPos / 3) + 0}px,0)`,
              maxHeight: '400px',
              maxWidth: '100%'
            }}
          >
            <Div width="100%" style={{ transform: 'translate(0px, -150px)', position: 'absolute', zIndex: 999 }}>
              <Span type="motorcycleTitle">
                {`${brand} ${languages[selectLangue]?.nameProduct || 'Name Product'}`.toLocaleUpperCase()}
              </Span>
              <Div width="10%" height="2px" style={{ backgroundColor: 'white', transform: 'translate(0px, 0px)' }} />
            </Div>
            <Div width="100%" style={{ transform: 'translate(0px, -20px)', position: 'absolute', zIndex: 999 }}>
              <Span type="motorCycleDetail">
                {`${defaultDetails[selectDetailTimer]}`.toLocaleUpperCase()}
              </Span>
            </Div>
            {
              videoExits ? (
                <VideoIntro parallaxVideo={video} />
              ) : null
            }
          </div>
        </div>
      </Div>

      <Div width="100%" horizontal="right">
        <Langues selectLangue={selectLangue} setSelectLangue={setSelectLangue} />
      </Div>

      <Div width="100%" style={{ paddingLeft: '50px', paddingRight: '50px', marginBottom: '40px' }}>
        <Div width="100%" style={{ padding: '10px', border: 'dashed 1px grey' }}>
          <GridContainer spacing={0}>
            {
            langues.filter(([key]) => key === selectLangue).map(([key, value]) => (
              <EditorChampMotorcycle
                key={key}
                value={value}
                editSizeBlock={editSizeBlock}
                setContainBLock={setContainBLock}
                deleteBlock={deleteBlock}
                addBlock={(index) => console.log(index)}
              />
            ))
          }
          </GridContainer>
        </Div>
      </Div>

      <Div width="100%" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        <GridContainer spacing={2}>
          <GridItem num={[4, 4, 4, 4, 4]}>
            <Div width="100%" horizontal="left" style={{ border: 'dashed 1px grey', paddingLeft: '20px', padding: '10px' }}>
              <Div width="100%" horizontal="left" height="380px" vertical="at">

                <Div width="100%" horizontal="left" style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px' }}>Product name</span>
                  <Div width="90%" horizontal="left" style={{ textAlign: 'justify', border: 'dashed 1px grey' }}>
                    <Editor
                      toolbarHidden
                      titleBlockquote
                      contain={languages[selectLangue]?.nameProduct_block || languages[selectLangue]?.nameProduct}
                      style={{ minHeight: '50px', maxHeight: '54px' }}
                      maxCaracter={52}
                      setEditingContain={(block) => setProperty('nameProduct', block)}
                      variantUpdate={selectLangue}
                    />
                  </Div>
                </Div>

                <Div width="100%" horizontal="left" style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '14px' }}>Product description</span>
                  <Div width="90%" horizontal="left" style={{ textAlign: 'justify', border: 'dashed 1px grey' }}>
                    <Editor
                      toolbarHidden
                      superFancyBlockquote
                      contain={languages[selectLangue]?.description_block || languages[selectLangue]?.description}
                      setEditingContain={(block) => setProperty('description', block)}
                      style={{ minHeight: '100px', maxHeight: '200px' }}
                      maxCaracter={140}
                      variantUpdate={selectLangue}
                    />
                  </Div>
                </Div>

                <Div horizontal="left">

                  <Span type="produitUniqueTitle">
                    Price starting at
                    {` ${currency} ${price}`}
                  </Span>

                  {/*

                  <LazyDialog notAcept title="Gallery" icon={<span>ALL THE DETAILS</span>} maxWidth="lg" btProps={{ color: 'google', justIcon: false }}>
                    <Div width="100%" height="480px" horizontal="at" vertical="top" style={{ padding: '10px', marginBottom: '20px' }} row>
                      <Div width="60%" dev>
                        sdf
                      </Div>
                      <Div width="40%" dev>
                        sdfg
                      </Div>
                    </Div>
                  </LazyDialog>

                  */}

                </Div>
              </Div>
            </Div>
          </GridItem>
          <GridItem num={[8, 8, 8, 8, 8]}>
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
                      <img src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt="MotorCycle photos" {...config.photo(selectColor.photos ? selectColor.photos[currentPhoto] : '')} />
                      <Div onClick={forwardPhoto}>
                        <ArrowForward />
                      </Div>
                    </Div>
                  </Div>
                </Div>
              </Dialog>
            </ThemeProvider>
            <Div width="100%" horizontal="right" row>
              <Div width="75%" horizontal="right" row style={{ border: 'dashed 1px grey', padding: '10px' }}>
                {
                  photos.length > 1 ? (
                    <Div onClick={backPhoto}>
                      <ArrowBack />
                    </Div>
                  ) : null
                }
                <Div onClick={() => setDialog(true)} width="100%" height="380px" horizontal="right">
                  <img src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt="MotorCycle photos" style={{ width: '100%', height: '480px', objectFit: 'contain' }} />
                </Div>
                {
                    photos.length > 1 ? (
                      <Div onClick={forwardPhoto}>
                        <ArrowForward />
                      </Div>
                    ) : null
                }
              </Div>
            </Div>
          </GridItem>
          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div width="100%">
              <Div width="100%" style={{ marginTop: '30px' }}>
                <Div width="100%" height="2px" style={{ backgroundColor: 'grey' }} />
              </Div>
              <Div width="100%" style={{ marginTop: '10px' }} horizontal="left" row>
                <Span type="titleYellow">
                  GALLERY
                </Span>
                <LazyDialog title="Gallery" icon={<SettingsIcon style={{ width: '25px', height: '25px', color: 'grey' }} />} maxWidth="lg">
                  <Div width="100%" height="480px" horizontal="left" vertical="top" style={{ padding: '10px', marginBottom: '20px', overflowY: 'scroll' }}>
                    <GridContainer spacing={2}>
                      {
                        [...gallery].map((photo) => (
                          <GridItem num={[3, 3, 3, 3, 3]} key={photo}>
                            <Div
                              width="calc(100% - 20px)"
                              height="200px"
                              style={{
                                border: '2px dashed grey',
                                backgroundImage: `url(${photo?.replaceAll(' ', '%20')})`,
                                backgroundSize: '100% 100%',
                                backgroundRepeat: 'no-repeat',
                              }}
                            />
                          </GridItem>
                        ))
                      }
                      <GridItem num={[3, 3, 3, 3, 3]}>
                        <UploaderCrop onUpload={(newPhoto) => addImageToGallery(newPhoto)} i={[...gallery].length + 1} />
                      </GridItem>
                    </GridContainer>
                  </Div>
                </LazyDialog>
              </Div>
              <Div width="100%" style={{ marginTop: '20px' }}>
                <GridContainer spacing={2}>
                  <GridItem num={[12, 12, 12, 12, 12]}>
                    <Div width="100%" height="550px">
                      <Div
                        width="100%"
                        height="100%"
                        style={{
                          border: '2px solid #ababab50',
                          backgroundImage: `url(${gallery[0]?.replaceAll(' ', '%20')})`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </Div>
                  </GridItem>
                  <GridItem num={[6, 6, 6, 6, 6]}>
                    <Div width="100%" height="550px">
                      <Div
                        width="100%"
                        height="100%"
                        style={{
                          border: '2px solid #ababab50',
                          backgroundImage: `url(${gallery[1]?.replaceAll(' ', '%20')})`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </Div>
                  </GridItem>
                  <GridItem num={[6, 6, 6, 6, 6]}>
                    <Div width="100%" height="550px">
                      <Div
                        width="100%"
                        height="100%"
                        style={{
                          border: '2px solid #ababab50',
                          backgroundImage: `url(${gallery[2]?.replaceAll(' ', '%20')})`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </Div>
                  </GridItem>
                  {
                    [...gallery].slice(3).map((photo) => (
                      <GridItem num={[3, 3, 3, 3, 3]} key={photo}>
                        <Div
                          width="100%"
                          height="200px"
                          style={{
                            border: '2px solid #ababab50',
                            backgroundImage: `url(${photo})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                          }}
                        />
                      </GridItem>
                    ))
                  }
                </GridContainer>
              </Div>
            </Div>
          </GridItem>
        </GridContainer>
      </Div>
    </Div>
  );
};

export default ProductUnique;
