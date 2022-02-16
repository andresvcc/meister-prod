import React, { useState } from 'react';
import { Div, redux } from 'components';
import { useRouter } from 'next/router';

// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@/components/Typography/Spam';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardAvatar from '@/components/Card/CardAvatar';
import Button from '@/components/CustomButtons/Button';
import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
  const {
    product, addToBag, alReadyInBag = () => false, ...rest
  } = props;

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

  const varAlReadyInBag = alReadyInBag(color, size);

  const handleCLick = () => {
    setHover(false);
    if (product.id !== undefined) addToBag(color, size);
  };

  return (
    <Card className={classes.cardProduct}>
      <CardAvatar>
        <Div vertical="bottom" horizontal="left">
          <Div width="100%" style={{ position: 'absolute', background: '#f7f6f470' }} dev onHover={(hover) => handleHover(hover)}>
            {hover ? (
              <Div row horizontal="at" width="100%">
                <Div row>
                  {product.colors.length > 1 ? product.colors.map((val, i) => <Button onClick={() => setColor(i)} round justIcon className={classes.colorBt} key={val.color} style={{ background: val.color }} />) : null}
                </Div>
                <Div row>
                  {product.sizesType !== 'custom' && product.sizesType.split(',').map((val, i) => (
                    <Button key={val} justIcon className={classes.sizesBt} link onClick={() => setSize(i)}>
                      {size === i ? <span style={{ fontWeight: 'bold', color: 'black' }}>{val}</span> : val}
                    </Button>
                  ))}
                </Div>
              </Div>
            ) : <Div onHover={(hover) => handleHover(hover)} />}
          </Div>
          <Div onHover={(hover) => handleHover(hover)} onClick={() => goToProduct(product.product)} width="100%">
            <img src={product.colors[color].photos[hover ? 1 : 0]} alt="..." className={classes.photoProduct} />
          </Div>
        </Div>
      </CardAvatar>

      {hover ? (
        <Div onHover={(hover) => handleHover(hover)} width="100%">
          <Button color="primary" className={classes.addToBagButton} onClick={handleCLick}>
            Add to Bag
          </Button>
        </Div>
      ) : <Div height="24px" onHover={(hover) => handleHover(true)} />}

      <Div onHover={(hover) => handleHover(hover)}>
        <CardBody className={classes.bodyCardProduct} onClick={() => goToProduct(product.product)}>
          <h6 className={classes.cardProductBrand}>
            <Typography type="h6">
              {product.brand}
            </Typography>
          </h6>
          <h4 className={classes.cardProductTitle}>
            <Typography type="h4">
              {product.languages.EN.nameProduct}
            </Typography>
          </h4>
          <h5 className={classes.cardProductPrice}>
            <Typography type="h5">
              {localCurrency}
              {' '}
              {product?.price}

            </Typography>
          </h5>
        </CardBody>
      </Div>
    </Card>
  );
}
