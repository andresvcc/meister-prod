/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
// material ui
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import Dialog from '@material-ui/core/Dialog';
import {
  createTheme, makeStyles, ThemeProvider, withStyles
} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// components
import { redux, Div, hookDeviceInfo } from 'components';
import DialogContent from '@material-ui/core/DialogContent';
import ContactForm from 'elementsClient/Forms/ProfilForm/ContactForm';
import Tooltip from '@material-ui/core/Tooltip';
import BlockIcon from '@material-ui/icons/Block';
import Grid from '@material-ui/core/Grid';
import {
  deviceType, browserName
} from 'react-device-detect';
import DialogTitle from '@material-ui/core/DialogTitle';
import SettingsIcon from '@material-ui/icons/Settings';
import DialogActions from '@material-ui/core/DialogActions';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
// Config
import Button from '@/components/CustomButtons/Button';
import CustomOptions from './CustomOptions';
import config from './ProductUniqueCofig';
import EditorDescription from './TextEditorDescription';
import EditorContent from './TextEditorContent';
import EditorTitle from './TextEditorTitle';
import Editor from '@/elementAdmin/section/productVue//TextEditor';

// DialogMotorcycle
import DialogMotoContact from './Motorcycle/DialogMotoContact';
import MotorcycleImages from './Motorcycle/MotorcycleImages';
import VideoIntro from '@/elementsClient/VideoIntro/VideoIntro';
import EditorChampMotorcycle from '@/elementAdmin/section/productVue/EditorChampMotorcycle';

// Dialog contact form

// Mui Theme
const LazyDialog = ({
  onClick, children, title, maxWidth = 'xs', btProps = {}, btProps2 = {}, icon = <SettingsIcon style={{ color: 'white' }} />, icon2 = <SettingsIcon style={{ color: 'white' }} />, notAcept = false
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="transparent" justIcon onClick={() => setOpen(true)} {...btProps} style={{ width: '100%' }}>{icon}</Button>
      {onClick ? <Button color="transparent" justIcon onClick={onClick} {...btProps2} style={{ width: '100%' }}>{icon2}</Button> : null}
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

const DialogGallery = ({
  photos = [], current = 0, theme, classes, children
}) => {
  const [open, setOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(current);

  const backPhoto = () => {
    if (currentPhoto > 0) setCurrentPhoto(currentPhoto - 1);
    else setCurrentPhoto(photos.length - 1);
  };

  const forwardPhoto = () => {
    if (currentPhoto < photos.length - 1) setCurrentPhoto(currentPhoto + 1);
    else setCurrentPhoto(0);
  };

  return (
    <Div width="100%" height="100%" pointer>
      <Div width="100%" height="100%" onClick={() => setOpen(true)} pointer>
        {children}
      </Div>
      <ThemeProvider theme={theme}>
        <Dialog
          fullWidth
          maxWidth="xl"
          open={open}
          aria-labelledby="max-width-dialog-title"
          PaperProps={{
            style: {
              backgroundColor: 'white',
              width: '80vw',
              height: '75%',
            },
          }}
          onClose={() => setOpen(false)}
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
                <img src={`${photos[currentPhoto] ?? ''}`} alt="MotorCycle photos" {...config.photo2(photos[currentPhoto] ?? '')} style={{ height: '100%', width: '95%', objectFit: 'contain' }} />
                <Div onClick={forwardPhoto}>
                  <ArrowForward />
                </Div>
              </Div>
            </Div>
          </Div>
        </Dialog>
      </ThemeProvider>
    </Div>
  );
};

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

const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)'
      }
    }
  }
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);

// Use styles dialog
const useStyles = makeStyles({
  dialog: {
  },
});

const ProductUnique = (props) => {
  const classes = useStyles();
  const { product = { colors: [] }, useSocketHook } = props;
  const [{
    profilInfo, localCurrency, curentLanguage, currencyRates, tva
  }, dispatch] = redux();

  const { cartItems } = profilInfo;
  const router = useRouter();
  const { width } = hookDeviceInfo();

  const {
    id = 0,
    visibility = false,
    hidden = false,
    colors = [],
    categorie = '',
    subcategorie = '',
    genre = '',
    brand = '',
    family = '',
    styleTextes = {
      EN: {
        text1: '',
        text2: '',
        text3: '',
      }
    },
    languages = {
      EN: {
        nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
      },
      FR: {
        nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
      },
      IT: {
        nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
      },
      DE: {
        nameProduct: '', description: '', details: [], characteristics: [], greatDescription: '', specialCare: '', content: []
      }
    },
    video = '',
    gallery = [],
    characteristics = '',
    selectableOptions1 = '',
    selectableOptions2 = '',
    selectableOptions3 = '',
    price = 0,
    currency = 'CHF',
    delivery = [],
    packageSize = 'void',
    Homologation = [],
    Provider = [],
    index = 0,
    tableData = { id: 0 },
    sizesType = '',
    clasificationColor = false,
  } = product;

  const selectableOptionsArr1 = [...new Set(selectableOptions1.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr2 = [...new Set(selectableOptions2.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr3 = [...new Set(selectableOptions3.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));

  const [optionSelect1, setOptionSelect1] = useState(selectableOptionsArr1[0] || '');
  const [optionSelect2, setOptionSelect2] = useState(selectableOptionsArr2[0] || '');
  const [optionSelect3, setOptionSelect3] = useState(selectableOptionsArr3[0] || '');

  const priceOptions = React.useMemo(() => {
    const reg = /[(](\d+(\.\d)*)[)]/g;
    const reg2 = /[(]*[)]*(null)*/g;

    const so1 = [...new Set(selectableOptions1.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
    const so1A = parseInt(so1[selectableOptionsArr1.indexOf(optionSelect1)] || '0', 10) || 0;

    const so2 = [...new Set(selectableOptions2.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
    const so2A = parseInt(so2[selectableOptionsArr2.indexOf(optionSelect2)] || '0', 10) || 0;

    const so3 = [...new Set(selectableOptions3.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
    const so3A = parseInt(so3[selectableOptionsArr3.indexOf(optionSelect3)] || '0', 10) || 0;

    const finalPrice = ((((parseInt(`${product?.price}`, 10) + so1A + so2A + so3A) * 1) / currencyRates[product?.currency]) * currencyRates[localCurrency]);

    return finalPrice + (finalPrice * tva);
  }, [product, price, localCurrency, optionSelect1, optionSelect2, optionSelect3]);

  const [state, setState] = useState({ size: 0, color: 0, qty: 1 });

  const [dialog, setDialog] = useState(false);

  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Dialog Motorcycle
  const [openD, setopenD] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickopenD = (scrollType) => () => {
    setopenD(true);
    setScroll(scrollType);
  };

  const handleCloseDialog = () => {
    setopenD(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openD) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openD]);

  const selectColor = useMemo(() => (colors[state.color] ? colors[state.color] : []), [colors, state.color]);

  useEffect(() => {
    setCurrentPhoto(0);
  }, [state.color]);

  const handleClose = () => {
    setDialog(false);
  };

  const photos = useMemo(() => [...selectColor?.photos?.filter((val) => val !== '')], [selectColor, product]);

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

  const [emit, socket] = useSocketHook;
  const [loading, setLoading] = useState(false);
  const [errorApiLogin, serErrorApiLogin] = useState([]);
  const [validateForm, setValidateForm] = useState([]);

  const contactSubmit = (data) => {
    if (data.fname && data.motorcycle && data.lname && data.tel && data.email && data.address1 && data.postal1 && data.city2) {
      setLoading(true);
      emit('contactMotorcycle', data);
      serErrorApiLogin([]);
      const accountConfirmation = ['Thank you! We will contact you soon! '];
      setValidateForm(accountConfirmation);
    } else {
      const missingErrMsg = ['All the fields must be filled'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorApiLogin)) serErrorApiLogin(missingErrMsg);
    }
  };

  const ErrorMsg = ({ message, i }) => <Spam type="subtitle4" color="danger">{message}</Spam>;
  const ValidateMsg = ({ message, i }) => <Spam type="subtitle4" color="subtitle4Green">{message}</Spam>;

  useEffect(() => {
    setCurrentPhoto(0);
  }, [state.color, product?.colors]);

  const scrollYHook = useHideOnScrolled(browserName);
  const scrollYPos = React.useMemo(() => scrollYHook * 10, [scrollYHook]);

  const parallaxImage = '/static/images/Meister_paralax_img.png';
  const videoExits = typeof video === 'string' && video !== '';

  const [selectLangue, setSelectLangue] = useState('EN');
  const defaultDetails = ['Versatility', ' ', 'Agility', ' ', 'Powered', ' '];
  const [selectDetailTimer, setSelectDetailTimer] = useState(0);

  const setProperty = (property, block) => {

  };

  return (
    <Div width="100%" vertical="top">

      <ThemeProvider theme={theme}>
        <Dialog
          open={openD}
          onClose={handleCloseDialog}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"

        >

          <DialogContent dividers={scroll === 'paper'}>

            <GridContainer>
              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div height="120px" width={['80%', '95%', '95%', '85%', '95%']} horizontal="center">
                  <Spam type="testTypo">
                    To buy this motorcycle, please fill out the form below.
                  </Spam>
                  <Spam type="testTypo">
                    We will contact you to finalize this purchase
                  </Spam>
                </Div>

              </GridItem>

              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div
                  width="100%"
                  height={['950px', '950px', '780px', '780px', '780px']}
                >
                  {errorApiLogin.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}

                  <Div height={['20px', '20px', '0px', '0px', '0px']} />
                  <ContactForm submit={contactSubmit} language="EN" />
                  {validateForm.map((val, i) => <ValidateMsg message={val} i={i} key={`${i + 1}`} />)}
                  <Div width="100%">
                    <Button onClick={handleCloseDialog} color="primary" style={{ fontSize: '14px', width: '300px' }}>
                      Back
                    </Button>
                  </Div>

                  <Div height={['20px', '20px', '20px', '20px', '20px']} />
                  <Div height={['50px', '50px', '0px', '0px', '0px']} />
                </Div>
              </GridItem>

            </GridContainer>
          </DialogContent>
        </Dialog>
      </ThemeProvider>

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
              height: '75%'
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
                {
                  photos.length > 1 ? (
                    <Div onClick={backPhoto}>
                      <ArrowBack />
                    </Div>
                  ) : (
                    <Div />
                  )
                }
                <Div width="calc(90% - 40px)" onClick={() => setDialog(true)}>
                  <img style={{ height: '90%', width: '100%' }} src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt="" />
                </Div>
                {
                  photos.length > 1 ? (
                    <Div onClick={forwardPhoto}>
                      <ArrowForward />
                    </Div>
                  ) : (
                    <Div />
                  )
                }
              </Div>
            </Div>
          </Div>
        </Dialog>
      </ThemeProvider>

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
            <Div
              width="100%"
              style={{
                transform: 'translate(0px, 170px)', position: 'absolute', zIndex: 99999, background: '#00000080'
              }}
            >
              <Spam type="motorCycleDetail">
                {`${brand} ${languages[selectLangue]?.nameProduct || 'Name Product'}`.toLocaleUpperCase()}
              </Spam>
              <Button color="primary" onClick={handleClickopenD('body')} style={{ fontSize: '12px', height: '25px' }}>
                ORDER THIS MOTORCYCLE
              </Button>
            </Div>
            {
              videoExits ? (
                <VideoIntro parallaxVideo={video} />
              ) : null
            }
          </div>
        </div>
      </Div>

      <Div width={['90%', '90%', '90%', '100%', '100%']} style={{ marginBottom: '10px', marginTop: '50px' }}>
        <GridContainer spacing={0}>
          <EditorChampMotorcycle
            value={languages[selectLangue]}
            readOnly
          />
        </GridContainer>
      </Div>

      <Div width={['90%', '90%', '90%', '100%', '100%']}>
        <GridContainer spacing={2}>
          <GridItem num={['auto', 'auto', 4, 4, 4]}>
            <Div width="100%" horizontal="left" style={{ paddingLeft: '20px', padding: '10px' }}>
              <Div width="100%" horizontal="left" height={['auto', 'auto', 'auto', '330px', '330px']} vertical="at">

                <Div width="100%" horizontal="left" style={{ marginBottom: '10px' }}>
                  <Div width="90%" horizontal="left" style={{ textAlign: 'justify' }}>
                    <Editor
                      toolbarHidden
                      titleBlockquote
                      contain={languages[selectLangue]?.nameProduct_block || languages[selectLangue]?.nameProduct}
                      style={{ minHeight: '50px', maxHeight: '54px' }}
                      maxCaracter={52}
                      setEditingContain={(block) => setProperty('nameProduct', block)}
                      variantUpdate={selectLangue}
                      readOnly
                    />
                  </Div>
                </Div>

                <Div width={['100%', '100%', '0%', '0%', '0%']}>
                  <Div width="100%" horizontal="center" row>
                    <Div width="100%" horizontal="center" row style={{ padding: '10px' }}>
                      {
                        photos.length > 1 ? (
                          <Div onClick={backPhoto}>
                            <ArrowBack />
                          </Div>
                        ) : null
                      }
                      <Div onClick={() => setDialog(true)} width="100%" height={['50vw', '50vw', '0px', '0px', '0px']} horizontal="right">
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
                </Div>

                <Div width="100%" horizontal="left" style={{ marginBottom: '20px' }}>
                  <Div width={['100%', '100%', '100%', '100%', '100%']} horizontal="left" style={{ textAlign: 'justify' }}>
                    <Editor
                      toolbarHidden
                      superFancyBlockquote
                      contain={languages[selectLangue]?.description_block || languages[selectLangue]?.description}
                      setEditingContain={(block) => setProperty('description', block)}
                      style={{ minHeight: '100px', maxHeight: '200px' }}
                      maxCaracter={140}
                      variantUpdate={selectLangue}
                      readOnly
                    />
                  </Div>
                </Div>

                <Div horizontal="left">

                  <Spam type="produitUniqueTitle">
                    Price starting at
                    {` ${currency} ${price}`}
                  </Spam>

                  <Button color="primary" onClick={handleClickopenD('body')} style={{ fontSize: '16px' }}>
                    ORDER THIS MOTORCYCLE
                  </Button>

                  {/*

                    <LazyDialog onClick={handleClickopenD('body')} notAcept title="Gallery" icon={<span>ALL THE DETAILS</span>} icon2={<span>ORDER THIS MOTORCYCLE</span>} maxWidth="lg" btProps={{ color: 'google', justIcon: false }} btProps2={{ color: 'primary', justIcon: false }}>
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
          <GridItem num={['auto', 'auto', 8, 8, 8]}>
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
                      <img src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt="MotorCycle photos" {...config.photo2(selectColor.photos ? selectColor.photos[currentPhoto] : '')} style={{ height: '100%', width: '95%', objectFit: 'contain' }} />
                      <Div onClick={forwardPhoto}>
                        <ArrowForward />
                      </Div>
                    </Div>
                  </Div>
                </Div>
              </Dialog>
            </ThemeProvider>
            <Div width={['0%', '0%', '100%', '100%', '100%']} horizontal="right" row>
              <Div width="75%" horizontal="right" row style={{ padding: '10px' }}>
                {
                  photos.length > 1 ? (
                    <Div onClick={backPhoto}>
                      <ArrowBack />
                    </Div>
                  ) : null
                }
                <Div onClick={() => setDialog(true)} width="100%" height={['0px', '0px', '350px', '350px', '350px']} horizontal="right">
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
              <Div width="100%">
                <Div width="100%" height="2px" style={{ backgroundColor: '#ababab50' }} />
              </Div>
              <Div width="100%" style={{ marginTop: '30px' }} horizontal="left" row>
                <Spam type="titleYellow">
                  GALLERY
                </Spam>
              </Div>
              <Div width="100%" style={{ marginTop: '40px' }}>
                <GridContainer spacing={2}>

                  {/* DIALOG GALLERIE */}

                  {
                    gallery[0] ? (
                      <GridItem num={[12, 12, 12, 12, 12]}>
                        <DialogGallery photos={gallery} current={0} theme={theme} classes={classes}>
                          <Div width="100%" height={['50vw', '50vw', '550px', '550px', '550px']} style={{ border: '2px solid #ababab20' }} pointer>
                            <Div
                              pointer
                              width="80%"
                              height="100%"
                              style={{
                                backgroundImage: `url(${gallery[0].replaceAll(' ', '%20')})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: '55%',
                              }}
                            />
                          </Div>
                        </DialogGallery>
                      </GridItem>
                    ) : null
                  }
                  {
                    gallery[1] ? (
                      <GridItem num={[6, 6, 6, 6, 6]}>
                        <DialogGallery photos={gallery} current={1} theme={theme} classes={classes}>
                          <Div width="100%" height={['50vw', '50vw', '550px', '550px', '550px']} style={{ border: '2px solid #ababab20' }} pointer>
                            <Div
                              pointer
                              width="90%"
                              height="100%"
                              style={{
                                backgroundImage: `url(${gallery[1].replaceAll(' ', '%20')})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: '50%',
                                backgroundPositionX: '50%',
                              }}
                            />
                          </Div>
                        </DialogGallery>
                      </GridItem>
                    ) : null
                  }
                  {
                    gallery[2] ? (
                      <GridItem num={[6, 6, 6, 6, 6]}>
                        <DialogGallery photos={gallery} current={2} theme={theme} classes={classes}>
                          <Div width="100%" height={['50vw', '50vw', '550px', '550px', '550px']} style={{ border: '2px solid #ababab20' }} pointer>
                            <Div
                              pointer
                              width="90%"
                              height="100%"
                              style={{
                                backgroundImage: `url(${gallery[2].replaceAll(' ', '%20')})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: '50%',
                                backgroundPositionX: '50%',
                              }}
                            />
                          </Div>
                        </DialogGallery>
                      </GridItem>
                    ) : null
                  }
                  {
                    [...gallery].slice(3).map((photo, i) => (
                      <GridItem num={[6, 6, 4, 4, 4]} key={photo}>
                        <DialogGallery photos={gallery} current={i} theme={theme} classes={classes}>
                          <Div width="100%" height={['50vw', '50vw', '300px', '350px', '350px']} style={{ border: '2px solid #ababab20' }} pointer>
                            <Div
                              pointer
                              width={['90%', '90%', '100%', '100%', '100%']}
                              height={['100%', '100%', '200px', '200px', '200px']}
                              style={{
                                backgroundImage: `url(${photo.replaceAll(' ', '%20')})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: '50%',
                                backgroundPositionX: '50%',
                              }}
                            />
                          </Div>
                        </DialogGallery>
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

/*
 {product.categorie === 'Motorcycle'
      ? <MotorcycleImages motorcycle={product} /> : <Div />}
       */
