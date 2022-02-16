import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// components
import Card from '@/components/Card/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardFooter from '@/components/Card/CardFooter';
// material-ui icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CardIcon from '@/components/Card/CardIcon';
//  styles
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';

const useStyles = makeStyles(styles);

function NumberCard1(props) {
  const classes = useStyles();
  const { data, title, subTitle } = props;
  return (
    <Card>
      <CardHeader color="warning" stats icon>
        <CardIcon color="warning">
          <AccountCircleIcon />
        </CardIcon>
        <p className={classes.cardCategory}>{title}</p>
        <h3 className={classes.cardTitle}>
          {data}
        </h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          {subTitle}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NumberCard1;
