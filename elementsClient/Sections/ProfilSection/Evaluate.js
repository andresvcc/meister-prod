import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Div, Button, redux } from 'component';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Rating from '@material-ui/lab/Rating';
import DialogTitle from '@material-ui/core/DialogTitle';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const RattingController = ({ val, setValue }) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Div horizontal="left" vertical="top">
      <pre>{JSON.stringify(val, null, 2)}</pre>
      <Rating
        name="rating"
        onChange={(event, newValue) => {
          event.preventDefault();
          handleChange(newValue);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" style={{ width: '35px', height: '35px' }} />}
        icon={<StarIcon fontSize="inherit" style={{ width: '35px', height: '35px', color: '#ffaf00' }} />}
      />
    </Div>
  );
};

export default function AlertDialog({ product = {}, billingsData = {}, submitEvaluation = () => true }) {
  const [open, setOpen] = React.useState(false);
  const [evaluation, setEvaluation] = useState({});

  const saveEvaluation = (newData) => {
    setEvaluation({
      ...evaluation,
      ...newData
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    submitEvaluation({
      idBilling: billingsData.idBilling,
      product,
      evaluation,
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Evaluate
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${`${product?.name}`.split('_')[0]} Evaluation`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Define the overall product evaluation
          </DialogContentText>
          <RattingController
            setValue={(value) => saveEvaluation({ ratting: value })}
          />
          <Div height="50px" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" link>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
