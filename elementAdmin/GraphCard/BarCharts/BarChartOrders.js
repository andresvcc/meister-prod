import React from 'react';
import { Bar } from 'react-chartjs-2';
import useData from '@/elementAdmin/page/dashboard/useDataHook';

function BarChart(props) {
  const { datas, label, title } = props;

  const {
    allCategoriesNames, totalSales, WeekOrdersTotal, weekNames, monthSales, monthOrdersTotal, monthNAmes
  } = useData();
  // arra

  const data = {
    // labels: monthNAmes,
    labels: label,
    datasets: [
      {
        label: title,
        // data: monthNAmes.map((name) => monthSales[name]), // array
        // data: monthNAmes.map((name) => monthOrdersTotal[name]), // array
        data: label.map((name) => datas[name]), // array
        backgroundColor: [
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
        ],
        borderColor: [
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
          '#000080',
          '#ff0000',
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
