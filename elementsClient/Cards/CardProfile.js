import React, { useEffect, useState } from 'react';
import {
 redux, Div, hookDeviceInfo, FlexDiv
} from 'components';

// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import CardIcon from '@/components/Card/CardIcon';
import CardAvatar from '@/components/Card/CardAvatar';
import Button from '@/components/CustomButtons/Button';

import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
    const {
      photo, message, ...rest
    } = props;
    const classes = useStyles();
    return (
      <Card profile style={{ marginTop: '120px' }}>
        <CardAvatar profile>
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img src={photo} alt="..." />
          </a>
        </CardAvatar>
        <CardBody profile>
          <h6 className={classes.cardCategory}>CEO</h6>
          <h4 className={classes.cardTitle}>Antoine Meister</h4>
          <p className={classes.description}>
            {message}
          </p>
          <Button color="primary">
            Follow
          </Button>
        </CardBody>
      </Card>
    );
  }
