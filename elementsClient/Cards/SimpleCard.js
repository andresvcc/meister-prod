import React, { useEffect, useState } from 'react';
import {
  redux, Div, hookDeviceInfo, FlexDiv
} from 'components';

// @material-ui/icons
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Warning from '@material-ui/icons/Warning';

import Typography from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Card from '@/components/Card/Card';
import CardBody from '@/components/Card/CardBody';
import CardHeader from '@/components/Card/CardHeader';
import CardIcon from '@/components/Card/CardIcon';
import CardAvatar from '@/components/Card/CardAvatar';
import Button from '@/components/CustomButtons/Button';
import CardFooter from '@/components/Card/CardFooter';
import Danger from '@/components/Typography/Danger';

import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/userProfileStyles';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
  const {
    children, iconName = 'trending_up', header = 'Title Header', value = '45', unite = '%', color = 'dark', ...rest
  } = props;
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color={color} stats icon>
        <CardIcon color={color}>
          <Icon>{iconName}</Icon>
        </CardIcon>
        <p className={classes.cardCategory}>{header}</p>
        <h3 className={classes.cardTitle}>
          {value}
            &nbsp;
          <small>{unite}</small>
            &nbsp;
        </h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          {children}
        </div>
      </CardFooter>
    </Card>
  );
}
