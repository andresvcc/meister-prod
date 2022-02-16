import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Div, hookDeviceInfo } from 'component';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import Table from '@/components/Table/Table';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import SweetStatusMaster from './SweetStatusMaster';

const useStyles = makeStyles(styles);

export default function SubTable(props) {
  const classes = useStyles();
  const {
    rowData
  } = props;

  const Buttons = (props) => {
    const { product } = props;
    return (
      <Div row>
        <SweetStatusMaster
          product={product}
          color="google"
          className={classes.actionButton}
        >
          <VerticalSplitIcon className={classes.icon} />
        </SweetStatusMaster>
      </Div>
    );
  };

  const { width } = hookDeviceInfo();

  return (
    <Div width="100%" horizontal={width < 920 ? 'left' : 'right'}>
      <Div width={['100%', 600, 600, 700, 800]} row>
        <Div width="calc(100% - 50px)">
          <Table
            tableShopping
            tableHeaderColor="primary"
            tableHead={['Provider', 'Homologation', 'stock']}
            tableData={rowData.Provider.map((val, i) => ([val, rowData.Homologation, <Buttons />]))}
            customCellClasses={[
              classes.center,
              classes.center,
              classes.center,
            ]}
            // 0 is for classes.center, 4 is for classes.right, 5 is for classes.right
            customClassesForCells={[0, 1, 2]}
            customHeadCellClasses={[
              classes.center,
              classes.center,
              classes.center,
            ]}
            customHeadClassesForCells={[0, 1, 2]}
          />
        </Div>
      </Div>
    </Div>
  );
}

SubTable.propTypes = {
  rowData: PropTypes.any
};
