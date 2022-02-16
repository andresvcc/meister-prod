import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  redux, Div, hookDeviceInfo, Button
} from 'components';
import { makeStyles } from '@material-ui/core/styles';

import SweetAlert from 'react-bootstrap-sweetalert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import GavelIcon from '@material-ui/icons/Gavel';
import styles2 from '@/assets/jss/nextjs-material-dashboard-pro/views/sweetAlertStyle';
import DialogEditProvider from './DialogEditProvider';

const useStyles2 = makeStyles(styles2);

const Seet = ({
  children, open, onConfirm, onCancel, title, confirmBtnText, cancelBtnText, warning, success, danger
}) => {
  const classes = useStyles2();
  const [alert, setAlert] = useState(null);

  const openAction = () => {
    setAlert(
      <SweetAlert
        warning={warning}
        success={success}
        danger={danger}
        style={{ display: 'block', marginTop: '-100px' }}
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmBtnCssClass={`${classes.button} ${classes.success}`}
        cancelBtnCssClass={`${classes.button} ${classes.link}`}
        showCancel
        confirmBtnText={confirmBtnText}
        cancelBtnText={cancelBtnText}
      >
        {children}
      </SweetAlert>
    );
  };

  const closeAction = () => {
    setAlert(null);
  };

  useEffect(() => {
    if (open === true) openAction();
    else closeAction();
  }, [open]);

  return (
    <>
      {alert}
    </>
  );
};

const ActionsButtons = ({ provider, editProvider, deleteProvider }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openGrave, setOpenGrave] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const edit = (data) => {
    editProvider(data);
    setOpenEdit(false);
  };

  const onDelete = () => {
    setOpenDelete(false);
    deleteProvider(provider);
  };

  return (
    <div>
      <Seet
        open={openDelete}
        warning
        onConfirm={onDelete}
        onCancel={() => setOpenDelete(false)}
        title="You are about to delete a provider!"
        confirmBtnText="yes, I want to delete it"
        cancelBtnText="No, turn back"
      >
        Removing a supplier from the list will not cause any damage to the system.
        Old orders will still appear and ongoing orders will continue to be processed.
      </Seet>
      <Seet
        open={openGrave}
        onConfirm={() => setOpenGrave(false)}
        onCancel={() => setOpenGrave(false)}
        title="You are about to delete a provider!"
        confirmBtnText="yes, I want to delete it"
        cancelBtnText="No, turn back"
      >
        Removing a supplier from the list will not cause any damage to the system.
        Old orders will still appear and ongoing orders will continue to be processed.
      </Seet>
      <DialogEditProvider
        addNew={(data) => console.log(data)}
        open={openEdit}
        onConfirm={edit}
        onCancel={() => setOpenEdit(false)}
        provider={provider}
      />
      <Button justIcon color="linkedin" onClick={() => setOpenEdit(true)}>
        <EditIcon style={{ width: '25px', height: '25px' }} />
      </Button>
      <Button justIcon color="github" onClick={() => setOpenGrave(true)}>
        <GavelIcon style={{ width: '25px', height: '25px' }} />
      </Button>
      <Button justIcon color="rose" onClick={() => setOpenDelete(true)}>
        <DeleteForeverIcon style={{ width: '25px', height: '25px' }} />
      </Button>
    </div>
  );
};

ActionsButtons.propTypes = {};

export default ActionsButtons;
