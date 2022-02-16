import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CachedIcon from '@material-ui/icons/Cached';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Div, Button } from 'component';
import Image from 'next/image';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DoneIcon from '@material-ui/icons/Done';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import GavelIcon from '@material-ui/icons/Gavel';
import Router from 'next/router';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import SteperRefound from './SteeperRefound';
import SteeperReturn from './SteeperReturn';
// react component used to create sweet alerts
// material-ui components

import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';

const useStyles2 = makeStyles(styles2);

function SweetCheckFinal(props) {
  const {
    children,
    useSocketHook,
    color,
    className,
    data,
  } = props;

  const [open, setOpen] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [emit, socket] = useSocketHook;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const RefundhandleClose = () => {
    setOpenRefund(false);
  };

  const ReturnhandleClose = () => {
    setOpenReturn(false);
  };

  const CancelhandleClose = () => {
    setOpenCancel(false);
  };

  const reportProducts = useMemo(() => data?.products?.filter(({ report }) => !!report), [data]);
  const notReportedProducts = useMemo(() => data?.products?.filter(({ report }) => !!report), [data]);

  const RefundhandleSubmit = ({ dataRefound, product, }) => {
    console.log({
      dataRefound, product, idBilling: data.idBilling, desition: 'refund'
    });
    emit('setSolveProblem', {
      dataRefound, product, idBilling: data.idBilling, desition: 'refund'
    });
    setOpenRefund(false);
  };

  const ReturnhandleSubmit = ({ dataRefound, product, }) => {
    console.log({
      dataRefound, product, idBilling: data.idBilling, desition: 'return'
    });
    emit('setSolveProblem', {
      dataRefound, product, idBilling: data.idBilling, desition: 'return'
    });
    setOpenReturn(false);
  };

  return (
    <>
      <Button color={color} className={className} onClick={() => setOpen(!open)}>
        {children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Report</DialogTitle>
        <DialogContent>
          <GridContainer>
            <GridItem num={[2, 2, 2, 2, 2]}>
              Photo
            </GridItem>
            <GridItem num={[3, 3, 3, 3, 3]}>
              Name
            </GridItem>
            <GridItem num={[3, 3, 3, 3, 3]}>
              Informations
            </GridItem>
            <GridItem num={[1, 1, 1, 1, 1]}>
              Quantity
            </GridItem>
            <GridItem num={[3, 3, 3, 3, 3]} />
          </GridContainer>
          {
            reportProducts?.map((product) => (
              <Div key={product.name} width="100%">
                <GridContainer>
                  <GridItem num={[2, 2, 2, 2, 2]}>
                    <div style={{ position: 'relative' }}>
                      <Image
                        src={product.photo}
                        alt="Picture of product"
                        objectFit="contain"
                        width="180px"
                        height="130px"
                      />
                    </div>
                  </GridItem>
                  <GridItem num={[3, 3, 3, 3, 3]}>
                    <Div height="120px">
                      {product.name}
                    </Div>
                  </GridItem>
                  <GridItem num={[3, 3, 3, 3, 3]}>
                    <Div height="120px">
                      <p>{`Demand: ${product.report.demand}`}</p>
                      <p>{`Reason: ${product.report.reason}`}</p>
                    </Div>
                  </GridItem>
                  <GridItem num={[1, 1, 1, 1, 1]}>
                    <Div height="120px">
                      {product.report.qty}
                    </Div>
                  </GridItem>
                  <GridItem num={[3, 3, 3, 3, 3]}>
                    <Div>
                      {
                        product.solve ? (
                          <Div style={{
                            borderRadius: '15px', background: 'green', padding: '5px 10px', color: 'white'
                          }}
                          >
                            {`Status: ${product.solve.status}`}
                          </Div>
                        ) : (
                          <Div style={{
                            borderRadius: '15px', background: 'red', padding: '5px 10px', color: 'white'
                          }}
                          >
                            Status: Not solve
                          </Div>
                        )
                      }
                      <Div row>
                        <Button color="success" justIcon onClick={() => setOpenRefund(true)}>
                          <GavelIcon style={{ width: '30px', height: '30px' }} />
                        </Button>
                        <Dialog
                          open={openRefund}
                          onClose={RefundhandleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          maxWidth="md"
                          fullWidth
                        >
                          <Div width="100%" style={{ padding: '50px' }}>
                            <Div>Refund</Div>
                            <SteperRefound submit={RefundhandleSubmit} product={product} order={data} />
                          </Div>
                        </Dialog>

                        <Button color="twitter" justIcon onClick={() => setOpenReturn(true)}>
                          <CachedIcon style={{ width: '30px', height: '30px' }} />
                        </Button>
                        <Dialog
                          open={openReturn}
                          onClose={ReturnhandleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          maxWidth="md"
                          fullWidth
                        >
                          <Div width="100%" style={{ padding: '50px' }}>
                            <Div>Return</Div>
                            <SteeperReturn submit={ReturnhandleSubmit} product={product} order={data} />
                          </Div>
                        </Dialog>

                        <Button color="danger" justIcon onClick={() => setOpenCancel(true)}>
                          <IndeterminateCheckBoxIcon style={{ width: '30px', height: '30px' }} />
                        </Button>

                        <Dialog
                          open={openCancel}
                          onClose={CancelhandleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          maxWidth="md"
                          fullWidth
                        >
                          <Div width="100%" style={{ padding: '50px' }}>
                            <Div>Cancel Facture</Div>
                            <Div>It is not possible to cancel this invoice, you must first have the agreement of the buyer.</Div>
                          </Div>
                        </Dialog>
                      </Div>
                    </Div>

                  </GridItem>
                </GridContainer>
              </Div>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SweetCheckFinal;
