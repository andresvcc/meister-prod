import React, { useState } from 'react';
import { useRouter } from 'next/router';
// components
import { Div, redux, hookDeviceInfo } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@/components/Typography/Spam';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import Button from '@/components/CustomButtons/Button';
import GridContainer from '@/components/Grid/GridContainer';
import CardAvatar from '@/components/Card/CardAvatar';
import GridItem from '@/components/Grid/GridItem';
// @material-ui/icons
// styles
import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
  const {
    product, addToBag, tva, alReadyInBag = () => false, ...rest
  } = props;

  const router = useRouter();
  const [{
    localCurrency,
    currencyRates
  }] = redux();
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  const [stringSize, setStringSize] = useState({});
  const { width } = hookDeviceInfo();
  const reduceString = (text, count) => text.slice(0, count) + (text.length > count ? '...' : '');

  const selectableOptionsArr1 = [...new Set(product?.selectableOptions1?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr2 = [...new Set(product?.selectableOptions2?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const selectableOptionsArr3 = [...new Set(product?.selectableOptions3?.split(','))].map((a) => `${a}`.replace(/([(](\d)*[)])/, ''));
  const optionSelect1 = selectableOptionsArr1[0] || '';
  const optionSelect2 = selectableOptionsArr2[0] || '';
  const optionSelect3 = selectableOptionsArr3[0] || '';

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
    const priceCurency = (Math.round((((parseInt(product?.price, 10)) / currencyRates[product?.currency]) * currencyRates[localCurrency]) * 100) / 100);
    const subTotalPrice = priceOptions + priceCurency;

    return (subTotalPrice * (1 + tva)).toFixed(2);
  }, [product, localCurrency, optionSelect1, optionSelect2, optionSelect3]);

  const goToProduct = (product) => {
    router.push({
      pathname: `/product/${product}`,
    }).then(() => window.scrollTo(0, 0));
  };

  const varAlReadyInBag = alReadyInBag(color, size, optionSelect1, optionSelect2, optionSelect3);

  const handleCLick = () => {
    setHover(false);
    if (product.id !== undefined) addToBag(color, size);
  };

  return (
    <Card className={classes.cardProduct2}>
      <CardAvatar>
        <Div vertical="bottom" horizontal="left">
          <Div onClick={() => goToProduct(product.product)} width="100%">
            <img src={product.colors[color].photos[hover ? 1 : 0]} alt="..." className={classes.photoProduct} />
          </Div>
        </Div>
      </CardAvatar>

      <CardBody className={classes.bodyCardProduct}>
        <GridContainer spacing={0}>

          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div horizontal="left" width="100%">
              <h6 className={classes.cardProductBrand}>
                <Typography type="h6">
                  {product.brand}
                </Typography>
              </h6>
            </Div>
          </GridItem>

          <GridItem num={[12, 12, 12, 12, 12]}>
            <Div horizontal="left" width="100%">
              <h4 className={classes.cardProductTitle}>
                <Typography type="cardProduct">
                  {reduceString(`${product.languages.EN.nameProduct}`, width < 600 ? 35 : 25)}
                </Typography>
              </h4>
            </Div>
          </GridItem>

          <GridItem num={[5, 5, 5, 5, 5]}>
            <Div horizontal="left" width="100%">
              <h5 className={classes.cardProductPrice}>
                <Typography type="cardProduct">
                  {`${localCurrency} ${priceOptions}`}
                </Typography>
              </h5>
            </Div>
          </GridItem>

          <GridItem num={[7, 7, 7, 7, 7]}>

            {product.sizesType.split(',').length < 5 ? (
              <Div width="100%" height="100%">
                <Div horizontal="right" width="100%" height={['35px', '35px', '35px', '35px', '35px']} vertical="bottom" row>
                  {product.sizesType !== 'custom' && product.sizesType.split(',').map((val, i) => (
                    <Button key={val} justIcon className={classes.sizesBt} link onClick={() => setSize(i)}>
                      {size === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val}
                    </Button>
                  ))}
                </Div>
              </Div>

            ) : (
              <Div width="100%" height="100%">

                <Div horizontal="right" width="100%" height={['35px', '35px', '35px', '35px', '35px']} vertical="bottom" row>
                  {product.sizesType !== 'custom' && product.sizesType.split(',').slice(0, 5).map((val, i) => (
                    <Button key={val} justIcon className={classes.sizesBt} link onClick={() => setSize(i)}>
                      {size === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val}
                    </Button>
                  ))}
                  <span style={{ fontWeight: 'bold', color: 'grey', paddingBottom: '2px' }}>...</span>
                </Div>

              </Div>
            )}
          </GridItem>
          <Div />
        </GridContainer>
        <Div width="100%" style={{ marginBottom: '10px', marginTop: '2px' }}>
          {
            varAlReadyInBag ? (
              <Button color="primary" className={classes.addToBagButtonMobileScroll} onClick={handleCLick}>
                <p>Add to Cart</p>
              </Button>
            ) : (
              <Button color="primary" className={classes.addToBagButtonMobileScroll} onClick={handleCLick} disabled>
                <p>Already In The Bag</p>
              </Button>
            )
          }
        </Div>
      </CardBody>
    </Card>
  );
}

/*

code à supprimer

        <Div>
          <Div width="90%" style={{ background: '#f7f6f470' }}>
            <Div row horizontal="at" width="100%" height="30px" dev>
              <Div row dev>
                {product.colors.length > 1 ? product.colors.map((val, i) => <Button onClick={() => setColor(i)} round justIcon className={classes.colorBt} key={val.color} style={{ background: val.color }} />) : null}
              </Div>
              <Div row dev>
                {product.sizesType !== 'custom' && product.sizesType.split(',').map((val, i) => (
                  <Button key={val} justIcon className={classes.sizesBt} link onClick={() => setSize(i)}>
                    {size === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val}
                  </Button>
                ))}
              </Div>
            </Div>
          </Div>
        </Div>

*/
