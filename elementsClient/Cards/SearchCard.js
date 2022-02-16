import React, { useState } from 'react';
import {
  Div,
} from 'components';
import { useRouter } from 'next/router';

// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@/components/Typography/Spam';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardAvatar from '@/components/Card/CardAvatar';
import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
  const {
    product, addToBag, ...rest
  } = props;

  const router = useRouter();

  const classes = useStyles();
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const handleHover = (newHover) => {
    setHover(newHover);
    if (newHover === false && newHover !== hover) {
      if (newHover === false) {
        setColor(0);
        setSize(0);
      }
    }
  };

  const goToProduct = (id) => {
    router.push({
      pathname: `/product/${id}`,
    }).then(() => window.scrollTo(0, 0));
  };

  return (
    <Card className={classes.cardProduct}>
      <CardAvatar>
        <Div vertical="bottom" horizontal="left">
          <Div onHover={(hover) => handleHover(hover)} onClick={() => goToProduct(product.id)} width="100%">
            <img src={product.colors[color].photos[hover ? 1 : 0]} alt="..." className={classes.photoProduct} />
          </Div>
        </Div>
      </CardAvatar>

      <Div onHover={(hover) => handleHover(hover)} height="150px" vertical="bottom">
        <Div width="100%">
          <CardBody className={classes.bodyCardProduct} onClick={() => goToProduct(product.id)}>
            <h6 className={classes.cardProductBrand}>
              <Typography type="serifDescriptionBold">
                {product.brand}
              </Typography>
            </h6>
            <h4 className={classes.cardProductTitle}>
              <Typography type="serifDescription">
                {product.languages.EN.nameProduct}
              </Typography>
            </h4>
            <h5 className={classes.cardProductPrice}>
              <Typography type="h5">
                {product?.currency === '€' ? `${product.prix} €` : null }
                {product?.currency === '$' ? `$ ${product.prix}` : null }
                {product?.currency === 'CHF' ? `${product.prix} CHF` : null }
              </Typography>
            </h5>
          </CardBody>
        </Div>
      </Div>
    </Card>
  );
}
