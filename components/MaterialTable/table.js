import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import tableStyle from './tableStyle';
import componentsSet from './components';
import iconsSet from './icons';
import actionsSet from './actions';

const useStyles = makeStyles(tableStyle);

const MaterialTable = dynamic(
  () => import('material-table'),
  { ssr: false }
);

export default function MaterialTableMaster(props) {
  const {
    className,
    data,
    onAddRow,
    onEditRow,
    onDelRow,
    onVisibility,
    noActions,
  } = props;

  const classes = useStyles(tableStyle);
  const icons = iconsSet(classes);
  const defaultActions = actionsSet(onVisibility, onEditRow, onDelRow);
  const components = componentsSet(onAddRow);

  return (
    <div className={classes.wrapper}>
      <MaterialTable
        style={{ width: '100%', boxShadow: 'none', border: 'none' }}
        columns={data.columns}
        data={data.data}
        detailPanel={data.detailPanel}
        options={{
          showTitle: false,
          detailPanelType: 'single',
          actionsColumnIndex: -1,
          detailPanelColumnAlignment: 'right',
          filtering: false,
          grouping: false,
          draggable: false,
          headerStyle: {
            fontWeight: 'bolder',
          },
          filterCellStyle: {
            maxWidth: '80px'
          },
          // toolbarButtonAlignment: 'left',
          pageSize: 5,
          pageSizeOptions: [25, 50, 100],
          doubleHorizontalScroll: false,
          addRowPosition: 'first',
        }}
        localization={{
          header: {
            actions: '' //  actions: 'Any text'
          },
        }}
        icons={icons}
        actions={defaultActions}
        components={components}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
}

MaterialTableMaster.defaultProps = {
  className: {},
  data: {},
};

MaterialTableMaster.propTypes = {
  className: PropTypes.any,
  data: PropTypes.any,
  onAddRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDelRow: PropTypes.func,
  onVisibility: PropTypes.func,
  noActions: PropTypes.bool,
};
