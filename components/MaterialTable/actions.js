import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import { primaryColor } from '@/assets/jss/nextjs-material-dashboard-pro';

const actionsSet = (onVisibility, onEditRow, onDelRow) => ([
  (rowDatax) => ({
    icon: rowDatax.visibility ? 'visibility' : 'visibility_off',
    tooltip: 'visibility',
    onClick: (event, rowData) => onVisibility(rowData),
    disabled: rowDatax.setParameters === false
  }),
  {
    icon: 'edit',
    tooltip: 'Edit Item',
    onClick: (event, rowData) => onEditRow(rowData),
  },
  {
    icon: 'delete',
    tooltip: 'Delete Item',
    onClick: (event, rowData) => onDelRow(rowData),
  },
]);

export default actionsSet;
