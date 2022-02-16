import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Delete } from '@material-ui/icons';
import { Div, Button } from 'component';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialogSelect({ onAcept }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcept = () => {
    onAcept();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} justIcon color="transparent"><DeleteForeverIcon style={{ width: '25px', height: '25px' }} /></Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <p>
            you are about to delete this block, do you really want to delete it ?
          </p>
          <p>
            si lo hace no podra recuperarlo
          </p>
        </DialogContent>
        <DialogActions>
          <Div width="100%">
            <Div width="calc(100% - 5px)" row>
              <Button color="primary" style={{ width: '45%', minWidth: '100px' }} onClick={handleAcept}>Delete</Button>
              <Div width="5%" />
              <Button color="google" style={{ width: '45%', minWidth: '100px' }} onClick={handleClose}>Cancel</Button>
            </Div>
          </Div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
