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
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
  const {
    product, filter, setFilter
  } = props;
  const [hover, setHover] = useState(false);
  const handleHover = (newHover) => {
    setHover(newHover);
  };

  const classes = useStyles();

  return (
    <Card className={classes.cardProduct2}>
      <Div onHover={(hover) => handleHover(hover)} width="100%">

        {
                hover
                  ? (
                    <Div width="100%" onHover={(hover) => handleHover(hover)} style={{ backgroundColor: '#00000020' }} onClick={() => console.log('Helmets')}>
                      <CardAvatar>
                        <Div vertical="bottom" horizontal="left">
                          <Div
                            width="100%"
                            style={{ paddingTop: '40px' }}
                          >
                            <img src={product.img} alt="..." className={classes.photoProduct} />
                          </Div>
                        </Div>
                      </CardAvatar>
                    </Div>
                  ) : (
                    <Div width="100%" height="100%" onHover={(hover) => handleHover(hover)}>
                      <CardAvatar>
                        <Div vertical="bottom" horizontal="left">
                          <Div width="100%" style={{ paddingTop: '40px' }}>
                            <img src={product.img} alt="..." className={classes.photoProduct} />
                          </Div>
                        </Div>
                      </CardAvatar>
                    </Div>
                  )
            }

      </Div>

    </Card>
  );
}
