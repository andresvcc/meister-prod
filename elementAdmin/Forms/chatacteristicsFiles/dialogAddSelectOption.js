import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { Div, Button } from 'component';
import update from 'immutability-helper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const CustomTextField = ({ defaultValue, onBlur, ...rest }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TextField {...rest} value={value} onChange={(e) => setValue(e.target.value)} onBlur={(e) => onBlur(value)} />
  );
};

const text2Obj = (defaultValues) => {
  const arrObj = defaultValues.split(',');
  if (arrObj.length <= 0 || defaultValues === '') return [];
  const obj = arrObj.map((a) => ({ title: a.match(/([a-zA-Z0-9])*/i)[0], prix: a.match(/[(]([0-9])*[)]/i) ? a.match(/[(]([0-9])*[)]/i)[0].replaceAll('(', '').replaceAll(')', '') : 0 }));
  return obj;
};

export default function AlertDialog({ onSubmit, defaultValues, children }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(text2Obj(defaultValues) || []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const newSelectOption = options.map(({ title, prix }) => `${title}(${prix})`).join(',');
    onSubmit(`${newSelectOption}`);
    setOpen(false);
  };

  const addNew = () => {
    setOptions([...options, { title: '', prix: '' }]);
  };

  const onBlur = (data, prop, i) => {
    const newData = { ...options };
    const dta = update(newData, {
      [i]: { [prop]: { $set: data } }
    });
    setOptions(Object.values(dta));
  };

  const deleteProp = (index) => {
    setOptions(update(options, { $splice: [[index, 1]] }));
  };

  return (
    <div style={{ width: '100%' }}>
      <Div width="100%" onClick={handleClickOpen}>
        {children}
      </Div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add selectable options</DialogTitle>
        <DialogContent>
          {
            options.map(({ title, prix }, i) => (
              <Div key={`${title}${i + 1}`} width="100%" horizontal="at" style={{ minHeight: '35px', marginBottom: '10px' }} row>
                <Div width="90%" horizontal="at" style={{ border: 'dashed 1px grey' }} row>
                  <Div width="60%" style={{ padding: '5px', paddingRight: '20px', borderRight: 'dashed 1px grey' }}>
                    <CustomTextField id="standard-basic" label="Name" defaultValue={title} type="texte" onBlur={(data) => onBlur(data, 'title', i)} />
                  </Div>
                  <Div width="30%" style={{ padding: '5px', paddingRight: '20px' }}>
                    <CustomTextField id="standard-basic" label="Prix" defaultValue={prix} type="number" onBlur={(data) => onBlur(data, 'prix', i)} />
                  </Div>
                </Div>
                <Div width="10%" onClick={() => deleteProp(i)}>
                  <DeleteForeverIcon style={{ color: 'grey', width: '30px', height: '30px' }} />
                </Div>
              </Div>
            ))
          }
          <Div width="100%" style={{ border: 'dashed 1px grey', marginTop: '20px' }} row onClick={addNew}>
            <h6>Add</h6>
            <AddIcon />
          </Div>
        </DialogContent>
        <DialogActions>
          <Div width="100%">
            <Div width="calc(100% - 5px)" row>
              <Button color="primary" style={{ width: '45%', minWidth: '100px' }} onClick={handleSubmit}>Acept</Button>
              <Div width="5%" />
              <Button color="google" style={{ width: '45%', minWidth: '100px' }} onClick={handleClose}>Cancel</Button>
            </Div>
          </Div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
