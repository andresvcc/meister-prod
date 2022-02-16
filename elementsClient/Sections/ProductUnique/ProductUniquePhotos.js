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

// DialogMotorcycle
import DialogMotoContact from './Motorcycle/DialogMotoContact';
import MotorcycleImages from './Motorcycle/MotorcycleImages';
// Dialog contact form

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
    price = 0,
    languages = {
      EN: {
        nameProduct: '', details: [], description: '', greateDescription: '', specialCare: ''
      }
    },
    colors = [],
    id = 0,
    categorie = '',
    sizesType = 'none',
    selectableOptions1 = '',
    selectableOptions2 = '',
    selectableOptions3 = '',
    brand = '',
  } = product;

  const langues = React.useMemo(() => Object.entries(languages), [languages]);
  const selectLangue = 'EN'; // ici changement de langue - > // React.useMemo(() => languages[curentLanguage] || 'EN', [curentLanguage]);

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
  const [dialogMoto, setDialogMoto] = useState(false);

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [elementSize, setElementSize] = useState([]);
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

  const toHome = () => {
    router.push({
      pathname: '/',
      query: { ...(router.query || {}) },
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const toCategorie = (props) => {
    router.push({
      pathname: `/${props}`,
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const orderMotorcycle = (props) => {
    const { categorie } = props;
    router.push({
      pathname: '/motorcycles',
    }).then(() => window.scrollTo({ top: 0, left: 0 }));
  };

  const alReadyInBag = cartItems[`${id}¦${state.color}¦${state.size}${optionSelect1 !== '' ? `¦${optionSelect1}` : ''}${optionSelect2 !== '' ? `¦${optionSelect2}` : ''}${optionSelect3 !== '' ? `¦${optionSelect3}` : ''}`] === undefined;
  const selectColor = useMemo(() => (colors[state.color] ? colors[state.color] : []), [colors, state.color]);
  const sizes = [...new Set(sizesType.split(','))];

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

  // Motorcycle
  const handleCloseMoto = () => {
    setDialogMoto(false);
  };

  const addToBag = async () => {
    /*
    const temp = {
      id,
      color: state.color,
      size: state.size,
      qty: state.qty,
      date: new Date(),
      pathname: router.pathname,
      photo: selectColor.photos[currentPhoto]
    };
    */

    const temp = {
      id: product.id,
      color: state.color,
      size: state.size,
      sizeValue: sizes[state.size],
      qty: state.qty,
      photo: selectColor.photos[currentPhoto],
      colorCode: product.colors[state.color].color,
      colorName: product.colors[state.color].colorName,
      sizeName: `${sizes[state.size]} ${optionSelect1 !== '' ? `- ${optionSelect1}` : ''}${optionSelect2 !== '' ? `- ${optionSelect2}` : ''}${optionSelect3 !== '' ? `- ${optionSelect3}` : ''}`,
      opt1: selectableOptionsArr1.indexOf(optionSelect1),
      opt1Key1: optionSelect1,
      opt2: selectableOptionsArr2.indexOf(optionSelect2),
      opt1Key2: optionSelect2,
      opt3: selectableOptionsArr3.indexOf(optionSelect3),
      opt1Key3: optionSelect3,
      packageSize: product.packageSize,
      name: product.product,
      pathname: `/product/${product.product}`,
    };

    if (alReadyInBag) {
      await dispatch({
        state: 'profilInfo',
        value: {
          cartItems: {
            ...cartItems,
            [`${id}¦${state.color}¦${state.size}${optionSelect1 !== '' ? `¦${optionSelect1}` : ''}${optionSelect2 !== '' ? `¦${optionSelect2}` : ''}${optionSelect3 !== '' ? `¦${optionSelect3}` : ''}`]: temp
          }
        }
      });

      await dispatch({
        state: 'dialogBag',
        value: 'true',
      });
    }
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

  return (
    <Div width="100%" vertical="top">

      <ThemeProvider theme={theme}>
        <Dialog
          open={openD}
          onClose={handleCloseDialog}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullScreen
        >
          <Button onClick={handleCloseDialog} color="primary">
            Back
          </Button>
          <DialogContent dividers={scroll === 'paper'}>

            <GridContainer>
              <GridItem num={[12, 12, 12, 12, 12]}>
                <Div height="120px" width={['90%', '95%', '95%', '85%', '95%']} horizontal="left">
                  <Spam type="testTypo">
                    To buy this motorcycle, please fill out the form below. We will contact you to finalize this purchase
                  </Spam>
                </Div>

              </GridItem>

              <GridItem num={[12, 6, 6, 6, 6]}>
                <Div
                  width="100%"
                  height={['300px', '650px', '650px', '650px', '650px']}
                  style={{ maxWidth: '500px' }}
                  vertical="top"
                >
                  <Div height={['0px', '15px', '40px', '40px', '40px']} />
                  <Div width="90%" horizontal="left">
                    <Spam type="h1TitleBold">{languages.EN.nameProduct}</Spam>
                  </Div>
                  <Div width="90%" horizontal="left">
                    <Spam type="h1TitleBold">
                      {`${localCurrency} ${priceOptions}`}
                    </Spam>
                  </Div>
                  <img
                    src={product.colors[0].photos[0]}
                    alt="fd"
                    width="150px"
                    height="250px"
                    style={{
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Div>
              </GridItem>

              <GridItem num={[12, 6, 6, 6, 6]}>
                <Div
                  width="100%"
                  height={['820px', '820px', '750px', '750px', '750px']}
                >
                  {errorApiLogin.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}

                  <Div height={['20px', '20px', '0px', '0px', '0px']} />
                  <ContactForm submit={contactSubmit} language="EN" />
                  {validateForm.map((val, i) => <ValidateMsg message={val} i={i} key={`${i + 1}`} />)}
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

      <Div width="100%" height={['auto', 'auto', '700px', '700px', '700px']} style={{ backgroundColor: '#EFEEE960' }}>
        <GridContainer>
          <GridItem num={[12, 12, 12, 12, 12]} />
          <Div height="20px" />
          <Div width="100%" height="40px" vertical="top" horizontal="left" style={{ paddingLeft: '40px' }}>
            <Breadcrumbs separator={<NavigateBeforeIcon fontSize="small" style={{ transform: 'rotate(180deg)' }} />}>
              <Div onClick={toHome}>
                <Spam type="produitUniqueDownTitle">
                  Home
                </Spam>
              </Div>
              <Div onClick={() => toCategorie(categorie)}>
                <Spam type="produitUniqueDownTitle">
                  {categorie}
                </Spam>
              </Div>
              <Spam type="produitUniqueDownTitle">
                {languages.EN.nameProduct}
              </Spam>
            </Breadcrumbs>
          </Div>
          <GridItem num={[12, 12, 7, 7, 7]}>
            <Div width="90%" height={['370px', '540px', '650px', '650px', '650px']}>
              <Div {...config.photoVisible}>

                {
                  photos.length > 1 ? (
                    <Div onClick={backPhoto} width="120px" style={{ paddingLeft: '18px' }}>
                      <ArrowBack />
                    </Div>
                  ) : (
                    <Div />
                  )
                }

                <Div onClick={() => (width < 900 ? setDialog(false) : setDialog(true))}>
                  <img src={`${selectColor && selectColor.photos && selectColor.photos[0] ? selectColor.photos[currentPhoto] : ''}`} alt={`${languages.EN.nameProduct}`} {...config.photo} />
                </Div>

                {
                  photos.length > 1 ? (
                    <Div onClick={forwardPhoto} width="120px" style={{ paddingRight: '18px' }}>
                      <ArrowForward />
                    </Div>
                  ) : (
                    <Div />
                  )
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
            <Div width={['90%', '90%', '80%', '80%', '80%']} height={['auto', 'auto', '650px', '650px', '650px']} horizontal="left" vertical="top">
              <Div horizontal="left" vertical="top" height={['auto', 'auto', '400px', '400px', '400px']} style={{ marginBottom: '15px' }}>
                <Div height={['20px', '30px', '30px', '30px', '30px']} />
                {
          product.tag !== undefined ? (
            <Div
              row
              style={{
                border: '1px solid #FaFaFa', borderRadius: '5px', background: '#00000005',
              }}
            >
              <Div style={{ border: `5px solid ${product.tag.color || ''}`, borderRadius: '50%', }} />
              <Div style={{
                fontFamily: 'Helvetica Neue',
                fontSize: '13px',
                paddingLeft: '10px',
                paddingRight: '5px',
                fontWeight: '400',
                textTransform: 'uppercase'
              }}
              >
                {`${(product.tag.label || '')}`}
              </Div>
            </Div>
          ) : null
        }
                <Div width="100%" horizontal="left">
                  <Spam type="h2GreyBold">{`CRAFTED BY ${brand}`}</Spam>
                </Div>

                <Div width="90%" horizontal="left">
                  <EditorTitle
                    contain={languages[selectLangue]?.nameProduct_block || languages[selectLangue]?.nameProduct}
                  />
                </Div>
                <Div width="90%" height="40px" horizontal="left">
                  <Spam type="h1TitleBold">
                    {new Intl.NumberFormat(`${curentLanguage}`, { currencyDisplay: 'symbol', style: 'currency', currency: localCurrency }).format(priceOptions)}
                  </Spam>
                </Div>
                <Div height="20px" />
                <Div width="98%" horizontal="left" style={{ textAlign: 'justify' }}>
                  <EditorDescription
                    contain={languages[selectLangue]?.description_block || languages[selectLangue]?.description.substring(0, 250)}
                  />
                </Div>
              </Div>

              <Div width="100%" style={{ paddingTop: '30px' }} horizontal="left" row>
                {
                  selectableOptionsArr1.length > 1 ? (
                    <Div width="34%" horizontal="left">
                      <CustomOptions
                        label="Select option 1"
                        id="option1"
                        value={optionSelect1}
                        options={[...selectableOptionsArr1.map((a, i) => ({ title: a, value: `${a}` }))]}
                        onBlur={(option) => setOptionSelect1(option.value)}
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
                        value={optionSelect2}
                        options={[...selectableOptionsArr2.map((a) => ({ title: a, value: a }))]}
                        onBlur={(option) => setOptionSelect2(option.value)}
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
                        value={optionSelect3}
                        options={[...selectableOptionsArr3.map((a) => ({ title: a, value: a }))]}
                        onBlur={(option) => setOptionSelect3(option.value)}
                      />
                    </Div>
                  ) : null
                }
              </Div>

              <Div width="100%">
                {
                  colors.length >= 2
                    ? (
                      <Div {...config.line1} height="40px" style={{ paddingLeft: '10px' }}>
                        {colors.map((val, i) => (
                          <Div key={`${val.nom}${i + 1}`}>
                            <LightTooltip title={`${val.colorName || 'undefined'}`.toUpperCase()} interactive placement="top" style={{ fontSize: '15px' }}>
                              <div>
                                <Div
                                  {...config.colorBorder({ val, select: state.color === i })}
                                  onClick={() => updateState({ stateName: 'color', value: i })}
                                >
                                  {val.colorName === 'colourless' ? <BlockIcon style={{ color: 'red' }} /> : null}
                                </Div>
                              </div>
                            </LightTooltip>
                          </Div>

                        ))}
                      </Div>
                    ) : <Div />
                }

                <Div {...config.line2}>
                  <Div {...config.sizesContainer}>
                    {sizesType.length < 20 ? sizes.map((val, i) => (
                      <Div
                        key={`${val}${i + 1}`}
                        {...config.label({ val, select: state.size === i })}
                        onClick={() => updateState({ stateName: 'size', value: i })}
                        width="25px"
                      >
                        {
                          val !== 'custom' ? <Spam type="produitUniqueSizes">{val}</Spam> : <Spam type="produitUniqueSizes" />
                        }
                      </Div>
                    )) : (
                      <Div width="180px" height="100px">
                        <CustomOptions
                          label="Select size"
                          id="option"
                          value={state.size || 0}
                          options={[...[...new Set(sizes)].map((a, i) => ({ title: a, value: i }))]}
                          // onBlur={(a) => console.log(a)}
                          onBlur={(a) => updateState({ stateName: 'size', value: a.value })}
                        />
                      </Div>
                    )}
                  </Div>
                  {product.categorie === 'Motorcycle'
                    ? <Div />
                    : (
                      <Div {...config.qtyContainer}>

                        <Div {...config.qtyBtsup({ disable: state.qty <= 1 })} onClick={() => updateState({ stateName: 'qty', value: state.qty > 1 ? state.qty - 1 : state.qty })}>
                          <Spam type="produitUniqueSizes">-</Spam>
                        </Div>
                        <Div {...config.qtyValue({ disable: state.qty <= 1 })}>
                          <Spam type="produitUniqueSizes">
                            {state.qty}
                          </Spam>
                        </Div>
                        <Div {...config.qtyBtAdd} onClick={() => updateState({ stateName: 'qty', value: state.qty + 1 })}>
                          <Spam type="produitUniqueSizes">+</Spam>
                        </Div>
                      </Div>
                    )}
                </Div>
              </Div>
              <Div height="10px" />
              <Div width="100%">
                {product.categorie === 'Motorcycle'
                  ? (
                    <Div width="100%">
                      <Button color="primary" width="100%" {...config.submitMotorcycleOrder} onClick={handleClickopenD('body')}>
                        <Div width="100%" style={{ fontFamily: 'Gorgia', fontSize: '12px', textTransform: 'uppercase' }}>
                          Order this motorcycle
                        </Div>
                      </Button>
                    </Div>
                  ) : (
                    <Div width="100%">

                      <Button disabled={!alReadyInBag} color="primary" width="100%" {...config.sumitButton(alReadyInBag)} onClick={addToBag}>
                        <Div width="100%" style={{ fontFamily: 'Gorgia', fontSize: '12px', textTransform: 'uppercase' }}>
                          {
                            alReadyInBag ? 'Add To Cart' : 'Already In Cart'
                          }
                        </Div>
                      </Button>
                    </Div>
                  )}
              </Div>
            </Div>
          </GridItem>

        </GridContainer>

      </Div>

      <Div
        width="100%"
        style={{
          backgroundColor: '#EFEEE940', paddingTop: '100px', paddingLeft: '30px', paddingRight: '30px'
        }}
      >

        <Div width="100%">
          <GridContainer spacing={4}>
            {
              langues.filter(([key]) => key === selectLangue).map(([key, value]) => (
                value?.content?.map((a, i, arr) => (
                  <GridItem num={[12, 12, a.size, a.size, a.size]} key={`${i + 1}`}>
                    <Div width="100%" vertical="top" style={{ marginBottom: '50px' }}>
                      <EditorContent contain={a.item} />
                    </Div>
                  </GridItem>
                ))
              ))
            }
          </GridContainer>
        </Div>
        <Div height="50px" />
      </Div>
    </Div>

  );
};

export default ProductUnique;

/*
 {product.categorie === 'Motorcycle'
      ? <MotorcycleImages motorcycle={product} /> : <Div />}
       */
