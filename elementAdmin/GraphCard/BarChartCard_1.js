import React from 'react';
import ChartistGraph from 'react-chartist';
import { makeStyles } from '@material-ui/core/styles';
// components
import Card from '@/components/Card/Card';
import CardHeader from '@/components/Card/CardHeader';
import CardBody from '@/components/Card/CardBody';
//  styles
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/dashboardStyle';
// assets
import { emailsSubscriptionChart } from '@/assets/variables/charts';

const useStyles = makeStyles(styles);

function BarChartCard1(props) {
  const classes = useStyles();
  const { data, title } = props;
  return (
    <Card chart className={classes.cardHover}>
      <CardHeader color="dark" className={classes.cardHeaderHover}>
        <ChartistGraph
          className="ct-chart-white-colors"
          data={data}
          type="Bar"
          options={emailsSubscriptionChart.options}
          responsiveOptions={emailsSubscriptionChart.responsiveOptions}
          listener={emailsSubscriptionChart.animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title}</h4>
      </CardBody>
    </Card>
  );
}

export default BarChartCard1;
