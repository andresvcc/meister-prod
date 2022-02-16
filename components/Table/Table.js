// /*eslint-disable*/
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import styles from '@/assets/jss/nextjs-material-dashboard-pro/components/tableStyle';

const useStyles = makeStyles(styles);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function CollapseRow(props) {
  const classes = useStyles();

  const {
    hover,
    tableRowClasses,
    prop,
    minimal,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
  } = props;

  const [open, setOpen] = React.useState(false);

  const colapsedObject = prop[prop.length - 1];

  return (
    <>
      <TableRow
        hover={hover}
        className={`${classes.tableRow} ${tableRowClasses}`}
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer' }}
      >
        {[...prop.slice(0, prop.length - 1)].map((prop, key) => {
          const tableCellClasses = minimal ? classes.minimalTableCell : `${classes.tableCell
          } ${
            cx({
              [classes[colorsColls[coloredColls.indexOf(key)]]]:
                  coloredColls.indexOf(key) !== -1,
              [customCellClasses[customClassesForCells.indexOf(key)]]:
                  customClassesForCells.indexOf(key) !== -1,
            })}`;
          return (
            <TableCell className={tableCellClasses} key={`${key + 1}`}>
              {prop}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {colapsedObject}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const CustomTable = React.memo((props) => {
  const classes = useStyles();

  const {
    tableHead = [],
    tableData = [],
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells,
    minimal,
    stickyHeader,
    notPagination,
    addRow,
    collapse,
    maxHeight,
    minHeight,
    notEmptyRows = false,
    startRowsPerPage,
    customRowPerPageList = [25, 50, 100],
    notbody
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(startRowsPerPage || 5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className={classes.tableResponsive}>
      <TableContainer className={classes.container} style={{ maxHeight, minHeight }}>
        <Table className={classes.table} stickyHeader aria-label="sticky table">
          {
            tableHead.length > 0 ? (
              stickyHeader ? (
                <TableHead className={classes[tableHeaderColor]}>
                  <TableRow className={`${classes.tableRow} ${minimal ? classes.minimalHead : classes.tableRowHead}`}>
                    {tableHead.map((column, i) => (
                      <TableCell
                        className={
                          `${classes.tableHeadCell
                          } ${
                            classes.tableCell
                          } ${
                            cx({
                              [customHeadCellClasses[
                                customHeadClassesForCells.indexOf(i)
                              ]]: customHeadClassesForCells.indexOf(i) !== -1,
                              [classes.tableShoppingHead]: tableShopping,
                              [classes.tableHeadFontSize]: !tableShopping,
                              [classes.minimal]: minimal,
                            })}`
                        }
                        key={`${i + 1}`}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              ) : (
                <TableHead className={classes[tableHeaderColor]}>
                  <TableRow className={`${classes.tableRow} ${minimal ? classes.minimalHead : classes.tableRowHead}`}>
                    {tableHead.map((prop, key) => {
                      const tableCellClasses = `${classes.tableHeadCell
                      } ${
                        classes.tableCell
                      } ${
                        cx({
                          [customHeadCellClasses[
                            customHeadClassesForCells.indexOf(key)
                          ]]: customHeadClassesForCells.indexOf(key) !== -1,
                          [classes.tableShoppingHead]: tableShopping,
                          [classes.tableHeadFontSize]: !tableShopping,
                          [classes.minimal]: minimal,
                        })}`;
                      return (
                        <TableCell className={tableCellClasses} key={`${key + 1}`}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
              )
            ) : null
          }
          <TableBody>
            {collapse ? (
              (rowsPerPage > 0
                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tableData
              ).map((prop, key) => {
                const tableRowClasses = cx({
                  [classes.tableRowBody]: !minimal,
                  [classes.minimalBody]: minimal,
                  [classes.tableRowHover]: hover,
                  [classes.tableStripedRow]: striped && key % 2 === 0,
                });

                return (
                  <CollapseRow
                    key={`${key + 1}`}
                    hover={hover}
                    tableRowClasses={tableRowClasses}
                    prop={prop}
                    minimal={minimal}
                    colorsColls={colorsColls}
                    coloredColls={coloredColls}
                    customCellClasses={customCellClasses}
                    customClassesForCells={customClassesForCells}
                  />
                );
              })
            ) : (
              (rowsPerPage > 0
                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tableData
              ).map((prop, key) => {
                let rowColor = '';
                let rowColored = false;
                if (prop.color !== undefined) {
                  rowColor = prop.color;
                  rowColored = true;
                  // eslint-disable-next-line no-param-reassign
                  prop = prop.data;
                }
                const tableRowClasses = cx({
                  [classes.tableRowBody]: !minimal,
                  [classes.minimalBody]: minimal,
                  [classes.tableRowHover]: hover,
                  [classes[`${rowColor}Row`]]: rowColored,
                  [classes.tableStripedRow]: striped && key % 2 === 0,
                });

                return (
                  <TableRow
                    key={`${key + 1}`}
                    hover={hover}
                    className={`${classes.tableRow} ${tableRowClasses}`}
                  >
                    {prop.map((prop, key) => {
                      const tableCellClasses = minimal ? classes.minimalTableCell : `${classes.tableCell
                      } ${
                        cx({
                          [classes[colorsColls[coloredColls.indexOf(key)]]]:
                            coloredColls.indexOf(key) !== -1,
                          [customCellClasses[customClassesForCells.indexOf(key)]]:
                            customClassesForCells.indexOf(key) !== -1,
                        })}`;
                      return (
                        <TableCell className={tableCellClasses} key={`${key + 1}`}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
            {!!notbody === false && emptyRows > 0 && !notEmptyRows && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      { addRow
        ? (
          <div style={{ position: 'relative', background: 'red' }}>
            <div style={{
              position: 'absolute', zIndex: 99, left: 60, bottom: -50
            }}
            >
              <Tooltip title="Add a new product" aria-label="add">
                <IconButton onClick={addRow} aria-label="previous page">
                  <AddCircleIcon fontSize="large" style={{ color: '#d81178' }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : null}
      {
        !notPagination ? (
          <TablePagination
            rowsPerPageOptions={customRowPerPageList}
            component="div"
            colSpan={12}
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Rows"
            // labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        ) : null
      }
    </div>
  );
});

CustomTable.defaultProps = {
  tableHeaderColor: 'gray',
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  tableShopping: true,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: [],
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray',
  ]),

  tableHead: PropTypes.arrayOf(PropTypes.node),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool,
  minimal: PropTypes.bool,
  addRow: PropTypes.func,
};

export default CustomTable;
