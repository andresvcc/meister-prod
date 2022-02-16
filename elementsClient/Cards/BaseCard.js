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
import CardFooter from '@/components/Card/CardFooter';

import styles from './cardStyle';

const useStyles = makeStyles(styles);

export default function CardProfile(props) {
    const {
      children, header = ' ', color = 'dark', ...rest
    } = props;
    const classes = useStyles();
    return (
      <Card chart>
        <CardHeader color={color}>
          {header}
        </CardHeader>
        <CardBody>
          <div style={{ minHeight: '151px' }}>
            {children}
          </div>
        </CardBody>
      </Card>
    );
  }
