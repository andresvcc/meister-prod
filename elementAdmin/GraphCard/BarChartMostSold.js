import React from 'react';
import { Bar } from 'react-chartjs-2';
import useData from '@/elementAdmin/page/dashboard/useDataHook';

function BarChart(props) {
  const {
    allCategoriesNames, totalSales, monthSales, monthNAmes, tenMostProductsKeys, tenMostProducts
  } = useData();
  // arra

  const data = {
    labels: tenMostProductsKeys,
    datasets: [
      {
        label: '10 Produits les plus vendus',
        data: tenMostProductsKeys.map((name) => tenMostProducts[name]), // array
        backgroundColor: [
          '#009933',
          '#e69900',
          '#0080ff',
          '#009933',
          '#e69900',
          '#0080ff',
          '#009933',
          '#e69900',
          '#0080ff',
          '#009933',
        ],
        borderColor: [
          '#009933',
          '#e69900',
          '#0080ff',
          '#009933',
          '#e69900',
          '#0080ff',
          '#009933',
          '#e69900',
          '#0080ff',
          '#009933',
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
