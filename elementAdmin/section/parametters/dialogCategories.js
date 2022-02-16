import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Div } from 'component';

export default function AlertDialog({ open, setOpen, children }) {
  const handleClickOpen = () => {
    setOpen(null);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const data = React.useMemo(() => !!open && open, [open]);

  return (
    <div>
      <Dialog
        open={!!open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        style={{ left: '260px' }}
      >
        <DialogTitle id="alert-dialog-title">{`Settings for ${data.key} in ${data && data.title && data.title}`}</DialogTitle>
        <DialogContent>
          <Div width="100%">
            {children}
          </Div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
