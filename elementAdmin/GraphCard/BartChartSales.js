import React from 'react';
import { Bar } from 'react-chartjs-2';
import useData from '@/elementAdmin/page/dashboard/useDataHook';

function BarChart(props) {
  const {
    allCategoriesNames, totalSales, WeekOrdersTotal, weekNames, monthSales, monthOrdersTotal, monthNAmes
  } = useData();
  // arra

  const data = {
    labels: monthNAmes,
    datasets: [
      {
        label: 'Nombre de ventes par mois (Chiffre d affaire): ',
        data: monthNAmes.map((name) => monthOrdersTotal[name]), // array
        backgroundColor: [
          '#b5d875',
          '#b5d875',
          '#b5d875',
        ],
        borderColor: [
          '#b5d875',
          '#b5d875',
          '#b5d875',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Bar data={data} />
  );
}

export default BarChart;
