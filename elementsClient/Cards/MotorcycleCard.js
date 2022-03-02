import React, { useState } from 'react';
// components
import Image from 'next/image';
import { Div } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import Spam from '@/components/Typography/Spam';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardAvatar from '@/components/Card/CardAvatar';
// @material-ui/icons
// styles
import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function MotorcycleCard(props) {
  const {
    motorcycle, filter, ...rest
  } = props;
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const data = {
    name: motorcycle.languages.EN.nameProduct.toUpperCase()
  };

  return (
    <Card className={classes.cardMotorcycle}>
      <CardAvatar>

        <Div onHover={(hover) => setHover(hover)}>

          <Div style={{ userSelect: 'text' }}>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <Image src={`${process.env.IMAGEPROVIDER}${(motorcycle?.colors[0]?.photos[0]) ?? '/static/images/notPhoto.png'}`} alt="..." width="350px" height="250px" className={classes.photoProductMotorcycle} />
            </a>
          </Div>

        </Div>
      </CardAvatar>
      <CardBody className={classes.bodyCardMotorcycle}>
        <h4 className={classes.cardMotorcycleTitle}>
          <Spam type="produitUniqueDescription">
            {motorcycle.languages.EN.nameProduct.toUpperCase()}
          </Spam>
          <Spam type="produitUniqueFournisseur2">
            {data.name}
          </Spam>
        </h4>
      </CardBody>
    </Card>
  );
}
