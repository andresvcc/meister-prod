import React from 'react';
import { Div, redux, hookDeviceInfo } from 'components';

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
    product, ...rest
  } = props;
  const classes = useStyles();

  const [{
    localCurrency
  }] = redux();

  const { width } = hookDeviceInfo();
  const reduceString = (text, count) => text.slice(0, count) + (text.length > count ? '...' : '');

  return (
    <Card className={classes.cardProduct} {...rest}>
      <Div height={['auto', '170px', '170px', '180px', '220px']}>
        <CardAvatar>
          <img src={product.colors[0].photos[0]} alt="..." className={classes.photoProduct} />
        </CardAvatar>
      </Div>
      <CardBody className={classes.CardBody}>
        <Div horizontal="left">
          <h6 className={classes.cardProductBrand}>
            <Typography type="h6">
              {`${product.brand}`}
            </Typography>
          </h6>
        </Div>
        <h4 className={classes.cardProductTitle}>
          <Typography type="cardProduct">
            {reduceString(`${product.languages.EN.nameProduct}`, 19)}
          </Typography>
        </h4>
        <h5 className={classes.cardProductPrice}>

          <Typography type="cardProduct">
            {localCurrency}
            {' '}
            {product?.price}
            .-
          </Typography>
        </h5>
        <Div height={10} />
      </CardBody>
    </Card>
  );
}
