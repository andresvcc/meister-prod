import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// components
import Card from '@/components/Card/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardFooter from '@/components/Card/CardFooter';
// material-ui icons
import Store from '@material-ui/icons/Store';
import DateRange from '@material-ui/icons/DateRange';
import CardIcon from '@/components/Card/CardIcon';

// styles
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';

const useStyles = makeStyles(styles);

function NumberCard4(props) {
  const classes = useStyles();
  const { data, title, subTitle } = props;
  return (
    <Card>
      <CardHeader color="dark" stats icon>
        <CardIcon color="dark">
          <Store />
        </CardIcon>
        <p className={classes.cardCategory}>{title}</p>
        <h3 className={classes.cardTitle}>
          CHF
          {' '}
          {data}
        </h3>
      </CardHeader>
      <CardFooter stats>
        <div className={classes.stats}>
          <DateRange />
          {subTitle}
        </div>
      </CardFooter>
    </Card>
  );
}

export default NumberCard4;
