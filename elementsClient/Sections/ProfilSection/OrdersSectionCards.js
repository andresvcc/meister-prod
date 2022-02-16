import React, { useState, useMemo } from 'react';
import { Div, redux, hookDeviceInfo } from 'components';
import { useRouter } from 'next/router';
// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
  const {
    product
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
  const reduceString = (text, count) => text.slice(0, count) + (text.length > count ? '...' : '');

  const widthBox = useMemo(() => {
    if (width > maxWidth) return 450;
    if (width > 1280) return width / (elementsParSize[1]);
    if (width > 960) return width / (elementsParSize[1]);
    if (width > 600) return width / (elementsParSize[1]);
    if (width > 300) return width / (elementsParSize[1]);
    return width;
  }, [width]);

  return (
    <Div width="220px">
      <Div width="210px" horizontal="left">
        <Div height="150px" width="210px" style={{ background: '#00000010' }}>
          <img src={`${product.photo}`} alt="..." className="boxCardImage" />
        </Div>

        <Div horizontal="left" height="20px" width="100%" style={{ fontFamily: 'Gorgia', fontSize: '16px', textTransform: 'capitalize' }}>
          {reduceString(`${product.name}`, 25)}

        </Div>

        {product.sizeName === ' '

          ? <Div horizontal="left" height="20px" width="100%" style={{ fontFamily: 'Gorgia', fontSize: '16px' }} /> : (
            <Div>
              <Div horizontal="left" height="20px" width="100%" style={{ fontFamily: 'Gorgia', fontSize: '16px' }}>
                Size:
                {' '}
                {product.sizeName}
              </Div>
            </Div>
          )}
      </Div>
      <Div height="40px" />
    </Div>
  );
}
