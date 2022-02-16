/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from 'react';
import { Div, redux, hookDeviceInfo } from 'components';
import { useRouter } from 'next/router';
// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import Button from '@/components/CustomButtons/Button';
import styles from './cardStyle';
import Cart from '../../components/iconsButtons/Cart';

const useStyles = makeStyles(styles);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + `${string.slice(1)}`.toLowerCase();
}

export default function CardProfile(props) {
  const {
    product, addToBag, alReadyInBag = () => false, filter, ...rest
  } = props;
  const { width } = hookDeviceInfo();

  const maxWidth = 1600;
  const elementsParSize = [2, 2, 4, 3, 3];
  const router = useRouter();
  const [{
    profilInfo, currencyRates, productList, localCurrency, curentLanguage, dialogBag = 'false'
  }, dispatch] = redux();
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const handleHover = (newHover) => {
    setHover(newHover);
  };

  const goToProduct = (product) => {
    router.push({
      pathname: `/product/${product}`,
    }).then(() => window.scrollTo(0, 0));
  };

  const selectableOptionsArr1 = [...new Set(product?.selectableOptions1?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr2 = [...new Set(product?.selectableOptions2?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr3 = [...new Set(product?.selectableOptions3?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const optionSelect1 = selectableOptionsArr1[0];
  const optionSelect2 = selectableOptionsArr2[0];
  const optionSelect3 = selectableOptionsArr3[0];

  const priceOptions = React.useMemo(() => {
    const reg = /[(](\d+(\.\d)*)[)]/g;
    const reg2 = /[(]*[)]*(null)*/g;

    const so1 = [...new Set(product?.selectableOptions1?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
    const so1A = so1[selectableOptionsArr1.indexOf(optionSelect1)] || 0;

    const so2 = [...new Set(product?.selectableOptions2?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
    const so2A = so2[selectableOptionsArr2.indexOf(optionSelect2)] || 0;

    const so3 = [...new Set(product?.selectableOptions3?.split(','))].map((a) => `${a.match(reg) ? a.match(reg)[0] : 0}`.replaceAll(reg2, '')).map((a) => parseInt(a, 10));
    const so3A = so3[selectableOptionsArr3.indexOf(optionSelect3)] || 0;

    const priceOptions = (Math.round((((so1A + so2A + so3A) / currencyRates[product?.currency]) * currencyRates[localCurrency]) * 100) / 100);

    return Math.round(((priceOptions || 0) + product?.price) * 100) / 100;
  }, [product, localCurrency, optionSelect1, optionSelect2, optionSelect3]);

  const varAlReadyInBag = alReadyInBag(color, size, optionSelect1, optionSelect2, optionSelect3);

  const handleCLick = () => {
    setHover(false);
    if (product.id !== undefined) addToBag(color, size);
  };

  const widthBox = useMemo(() => {
    if (width > maxWidth) return 450;
    if (width > 1280) return width / (elementsParSize[4] * 1.15);
    if (width > 960) return width / (elementsParSize[4] * 1.1);
    if (width > 600) return width / (elementsParSize[0]);
    if (width > 300) return width / (elementsParSize[1]);
    return width;
  }, [width]);

  const sizeIndex = product.sizesType.split(',').indexOf(filter.size);

  // Test pastilles - supprimer après ligne 89 à 121

  return (
    <Div width="100%" onHover={(hover) => handleHover(hover)}>
      <Div onClick={() => goToProduct(product.product)} height={`${widthBox}px`} width="100%" style={{ background: product.categorie === 'Certification' ? 'white' : '#00000008' }}>
        {
          product.tag !== undefined ? (
            <Div
              vertical="top"
              dev
              height={width < 650 ? `${widthBox * 1.05}px` : `${widthBox}px`}
              width={width < 950 ? `${widthBox / 1.2}px` : width < 960 ? `${widthBox / 1.1}px` : width < 1200 ? `${widthBox / 1.5}px` : `${widthBox / 1.35}px`}
              horizontal="left"
              pointer
              style={{
                position: 'absolute',
                zIndex: 0,
                background: 'transparent',
                paddingTop: '10px',
              }}
            >
              <Div
                row
                style={{
                  border: '1px solid white', borderRadius: '5px', background: 'white', paddingLeft: '10px', paddingRight: '10px'
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
                  {`${capitalize(product.tag.label || '')}`}
                </Div>
              </Div>
            </Div>
          ) : null
        }
        {
          product.colors[color].photos[1] === '' ? (
            <Div width="100%" height="100%">
              <img src={product.colors[color].photos[0]} alt="..." className="boxCardImageHover" style={{ transform: hover ? 'scale(1.15)' : 'scale(1)' }} />
            </Div>
          ) : (
            <Div width="100%" height="100%" style={{ position: 'relative' }}>
              <img src={product.colors[color].photos[0]} alt="..." className="boxCardImageCrossFading" style={{ opacity: hover ? '0' : '1' }} />
              <img src={product.colors[color].photos[1]} alt="..." className="boxCardImageCrossFading" style={{ opacity: hover ? '1' : '0' }} />
            </Div>
          )
        }
      </Div>

      <Div height="15px" />

      <Div width="100%">
        <Div onClick={() => goToProduct(product.product)} width="100%">
          <Div height="20px" width="100%" horizontal="left" style={{ fontFamily: 'Gorgia', fontSize: '16px', textTransform: 'uppercase' }}>
            {product.brand}
          </Div>
          <Div
            width="100%"
            horizontal="left"
            height="15px"
            vertical="top"
            style={{
              fontFamily: 'Gorgia', fontSize: '15px', textTransform: 'capitalize', color: '#00000070', lineHeight: '20px', overflow: 'hidden', maxHeight: '40px'
            }}
          >
            {product.languages.EN.nameProduct}
          </Div>
        </Div>
      </Div>

      {/*      <Div height="30px" width="100%" dev>

        <Div width="100%" onHover={(hover) => handleHover(hover)}>
          {hover ? (
            <Div row horizontal="at" width="100%">
              <Div row>
                {product.colors.length > 1 ? product.colors.map((val, i) => <Button onClick={() => setColor(i)} round justIcon className={classes.colorBt} key={val.color} style={{ background: val.color }} />) : null}
              </Div>
              <Div row>
                {product.sizesType !== 'custom' && product.sizesType.split(',').map((val, i) => (
                  <Button key={val} justIcon className={classes.sizesBt} link onClick={() => setSize(i)}>
                    {sizeIndex !== -1 ? (
                      sizeIndex === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val
                    ) : (
                      size === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val
                    )}
                  </Button>
                ))}
              </Div>
            </Div>
          ) : <Div onHover={(hover) => handleHover(hover)} />}
        </Div>

      </Div>

      */}

      <Div height="55px" vertical="top" width="100%" style={{ marginTop: '10px' }}>
        <Div row height="15px" width="100%" horizontal="at" style={{ fontFamily: 'Gorgia', fontSize: '16px', marginBottom: '5px' }}>
          <Div>
            {`${localCurrency} ${priceOptions}`}
          </Div>

          <Div row horizontal="at">
            <Div row>
              {
                hover ? (
                  product.sizesType !== 'custom' && product.sizesType.split(',').slice(0, 5).map((val, i) => (
                    <Button key={val} justIcon className={classes.sizesBt} link onClick={() => setSize(i)}>
                      {sizeIndex !== -1 ? (
                        sizeIndex === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val
                      ) : (
                        size === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val
                      )}

                    </Button>

                  ))

                ) : null
              }
            </Div>

            <Div row>
              {
                hover && product.sizesType.split(',').length >= 5
                  ? <Div style={{ paddingTop: '1px', color: 'grey' }}>...</Div> : null
              }
            </Div>

          </Div>

        </Div>

        {hover ? (
          <Div width="100%">
            {
              varAlReadyInBag ? (
                <Button color="primary" className={classes.addToBagButton} onClick={handleCLick}>
                  <Div style={{ fontFamily: 'Gorgia', fontSize: '12px', textTransform: 'uppercase' }} pointer>
                    Add to Cart
                  </Div>
                </Button>
              ) : (
                <Button color="primary" className={classes.addToBagButton} onClick={handleCLick} style={{ cursor: 'not-allowed', background: '#697d8a' }}>
                  <Div style={{
                    fontFamily: 'Gorgia', fontSize: '12px', textTransform: 'uppercase', cursor: 'not-allowed'
                  }}
                  >
                    Already In The Bag
                  </Div>
                </Button>
              )
            }
          </Div>
        ) : <Div height="34px" onHover={(hover) => handleHover(true)} />}
      </Div>
      <Div height="20px" />
    </Div>
  );
}

/*
 <Div
          vertical="top"
          height={`${widthBox}px`}
          width={`${widthBox / 1.5}px`}
          horizontal="left"
          style={{
            position: 'absolute',
            zIndex: 9991,
            background: 'transparent',
            paddingTop: '10px',
          }}
        >

          <Div1
            row
            style={{
              border: '1px solid white', borderRadius: '5px', background: 'white', paddingLeft: '5px', paddingRight: '5px'
            }}
          >
            <Div style={{ border: '5px solid #0062a3', borderRadius: '50%', }} />
            <Div style={{
              fontFamily: 'Helvetica Neue',
              fontSize: '13px',
              paddingLeft: '10px',
              paddingRight: '5px',

              fontWeight: '400'
            }}
            >
              NEW COLOR
            </Div>
          </Div>
        </Div>
         */
