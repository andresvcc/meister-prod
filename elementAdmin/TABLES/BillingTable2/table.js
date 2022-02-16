import React from 'react';
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
// material-ui icons
import Remove from '@material-ui/icons/Remove';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Box from '@material-ui/core/Box';

import Collapse from '@material-ui/core/Collapse';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ErrorIcon from '@material-ui/icons/Error';

// core components
import TableNative from '@material-ui/core/Table';
import CloseIcon from '@material-ui/icons/Close';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Tooltip from '@material-ui/core/Tooltip';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import PrintIcon from '@material-ui/icons/Print';
import product1 from '@/assets/img/product1.jpg';
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle';
import Button from '@/components/CustomButtons/Button';
import Table from '@/components/Table/Table';
import SweetPrintMaster from './SweetPrintMaster';

const useStyles = makeStyles(styles);

const format = (val) => {
  const formDate = new Date(val.date).toLocaleDateString();
  const total = val.products.map((val) => val?.price * val.qty).reduce((a, b) => a + b);
  return { ...val, formDate, total };
};

const rowGenerator = (val, delRow, classes) => [
  `${val.fname} ${val.lname}`,
  val.email,
  val.addresses[val.selectedBilling || 0]?.countries || '', // val.addresses[val.selectedBilling || 0] || '',
  `${val.addresses[val.selectedBilling || 0]?.zipCode || ''} ${val.addresses[val.selectedBilling || 0].zipArea || ''}`,
  <div className={classes.buttonGroup}>
    <pre>{Object.values(val.billings).map((val) => val?.payment?.pay - val.shippingCost.toFixed(2) - [...val.products.map((valProduct) => valProduct?.price * (1 + val.TVA)), 0, 0].reduce((a, b) => a + b).toFixed(2)).reduce((a, b) => a + b) * -1 > 2 ? (<ErrorIcon />) : (<DoneAllIcon />)}</pre>
  </div>,
  <div>
    <TableNative size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>idBilling</TableCell>
          <TableCell>date</TableCell>
          <TableCell>shipping</TableCell>
          <TableCell>amount</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(val.billings).map((billingsRow, i) => {
          const productCost = billingsRow.products.map((val) => val?.price * val?.qty).reduce((a, b) => a + b);
          const total = ((productCost + (productCost * billingsRow?.TVA)) + billingsRow.shippingCost).toFixed(2);
          return (
            <TableRow key={`${i + 1}`}>
              <TableCell component="th" scope="row">
                {billingsRow.idBilling}
              </TableCell>
              <TableCell component="th" scope="row">
                {billingsRow.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {billingsRow.estimatedShippingDelay}
              </TableCell>
              <TableCell component="th" scope="row">
                {`${billingsRow?.currency} ${total}`}
              </TableCell>
              <TableCell>
                <div className={classes.buttonGroup}>
                  {
                   `${parseFloat(billingsRow.payment.pay, 10).toFixed(2)}` !== `${total}` ? (
                     <Tooltip title="warning">
                       <Button className={classes.actionButton} color="transparent">
                         <div>
                           <ReportProblemIcon className={classes.icon} style={{ color: 'red', width: '25px', height: '25px' }} />
                           <p>Warning</p>
                         </div>
                       </Button>
                     </Tooltip>
                   ) : null
                  }
                  {billingsRow.payment && billingsRow.payment.pay && parseFloat(billingsRow.payment.pay, 10).toFixed(2) >= total ? (
                    <Tooltip title="payment confirmation">
                      <Button className={classes.actionButton} color="transparent" onClick={() => delRow(val)}>
                        <div>
                          <CheckCircleSharpIcon className={classes.icon} style={{ color: 'green', width: '25px', height: '25px' }} />
                          <p>{`Confirmed ${billingsRow?.currency} ${parseFloat(billingsRow.payment.pay, 10).toFixed(2)}`}</p>
                        </div>
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="payment pending confirmation">
                      <Button className={classes.actionButton} color="transparent" onClick={() => delRow(val)}>
                        <div>
                          <CreditCardIcon className={classes.icon} style={{ color: 'black', width: '25px', height: '25px' }} />
                          <p>{`Pending ${billingsRow?.currency} ${billingsRow.payment ? total - parseFloat(billingsRow?.payment?.pay || '0', 10).toFixed(2) : total}`}</p>
                        </div>
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
              <TableCell component="th" scope="row">
                <SweetPrintMaster
                  product={format(billingsRow)}
                  color="info"
                  className={classes.actionButton}
                  deliveryDate={billingsRow.payment.payDate}
                >
                  <PrintIcon className={classes.icon} />
                </SweetPrintMaster>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </TableNative>
  </div>,
];

const DemoTables = React.memo(({
  list, delRow
}) => {
  const classes = useStyles();
  return (
    <Table
      stickyHeader
      tableHead={['USER NAME', 'EMAIL', 'COUNTRY', 'Zip AREA', '']}
      tableData={[...list.filter((a) => Object.keys(a.billings || {}).length > 0).map((val, i) => rowGenerator(val, delRow, classes))]}
      tableShopping
      collapse
      hover
    />
  );
}, (prev, next) => JSON.stringify(prev.list) === JSON.stringify(next.list));

export default DemoTables;
