import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useData from '@/elementAdmin/page/dashboard/useDataHook';

function PieChart(props) {
  const { allCurrencyNames, productSoldByCurrency } = useData();
  // array

  const data = {
    // labels: allCategoriesNames,
    labels: allCurrencyNames,
    datasets: [
      {
        label: 'Nombre de ventes par Devises',
        // data: allCategoriesNames.map((name) => nbCategoriesInBillings[name]), // array
        data: allCurrencyNames.map((name) => productSoldByCurrency[name]), // array
        backgroundColor: [
          '#6399ef',
          '#7bc58b',
          '#58d3d9',
          '#f99614',
          '#75c5ce',
          '#c44104',
          '#dd496c',
        ],
        borderColor: [
          '#6399ef',
          '#7bc58b',
          '#58d3d9',
          '#f99614',
          '#75c5ce',
          '#c44104',
          '#dd496c',
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
