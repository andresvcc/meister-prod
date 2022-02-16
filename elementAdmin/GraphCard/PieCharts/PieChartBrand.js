import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useData from '@/elementAdmin/page/dashboard/useDataHook';

function PieChart(props) {
  const { allBransNames, productSoldByBrand } = useData();
  // array

  const data = {
    // labels: allCategoriesNames,
    labels: allBransNames,
    datasets: [
      {
        label: 'Nombre de ventes par Marques',
        // data: allCategoriesNames.map((name) => nbCategoriesInBillings[name]), // array
        data: allBransNames.map((name) => productSoldByBrand[name]), // array
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
