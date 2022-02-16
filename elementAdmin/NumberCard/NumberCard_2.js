import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// components
import Card from '@/components/Card/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardFooter from '@/components/Card/CardFooter';
// material-ui icons
import CardIcon from '@/components/Card/CardIcon';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Update from '@material-ui/icons/Update';
// Styles
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';

const useStyles = makeStyles(styles);

function NumberCard2(props) {
  const classes = useStyles();
  const { data, title, subTitle } = props;
  return (
    <Card>
      <CardHeader color="info" stats icon>
        <CardIcon color="info">
          <SupervisedUserCircleIcon />
        </CardIcon>
        <p className={classes.cardCategory}>{title}</p>
        <h3 className={classes.cardTitle}>{data}</h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <Update />
          {subTitle}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NumberCard2;
