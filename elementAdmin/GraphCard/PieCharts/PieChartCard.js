import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useData from '@/elementAdmin/page/dashboard/useDataHook';

function PieChart(props) {
  const { allCategoriesNames, nbCategoriesInBillings } = useData();

  const data = {
    labels: allCategoriesNames,
    datasets: [
      {
        label: 'Nombre de ventes par catégories',
        data: allCategoriesNames.map((name) => nbCategoriesInBillings[name]), // array
        backgroundColor: [
          '#1ad2f3',
          '#d31e47',
        ],
        borderColor: [
          '#1ad2f3',
          '#d31e47',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut data={data} />
  );
}

export default PieChart;
