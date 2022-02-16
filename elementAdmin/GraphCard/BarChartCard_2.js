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
import { completedTasksChart } from '@/assets/variables/charts';

const useStyles = makeStyles(styles);

function BarChartCard2(props) {
  const classes = useStyles();
  const { data, title } = props;
  return (
    <Card chart className={classes.cardHover}>
      <CardHeader color="danger" className={classes.cardHeaderHover}>
        <ChartistGraph
          className="ct-chart-white-colors"
          data={data}
          type="Line"
          options={completedTasksChart.options}
          listener={completedTasksChart.animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title}</h4>
      </CardBody>
    </Card>
  );
}

export default BarChartCard2;
