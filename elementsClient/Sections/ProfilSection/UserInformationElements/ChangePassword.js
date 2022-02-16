import React, { useState } from 'react';// components
import { Div, hookDeviceInfo } from 'components';
// material ui
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChangeProfilInfo1 from 'elementsClient/Forms/ProfilForm/ChangeProfilInfo1';
// material ui icon
import CloseIcon from '@material-ui/icons/Close';
import RecoveryForm from 'elementsClient/Forms/newChangePassForm';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';

const useStyles = makeStyles({
  root: {
  },
});

// temp database
const profil = { password: '**********' };

const InputGenerator = (props) => {
  const { title, userValue, recovery } = props;
  return (
    <Div width="100%" horizontal="left" height="80px">
      <Spam type="serifDescriptionBold">{title}</Spam>
      <Spam type="serifDescription">{userValue}</Spam>
    </Div>
  );
};

const DialogInputGenerator = (props) => {
  const { children } = props;
  return (
    <Div width={['230px', '400px', '400px', '400px', '400px']} height="80px">
      <Div horizontal="left" width="100%">
        <Spam type="serifDescriptionBold">
          {children}
        </Spam>
      </Div>
    </Div>
  );
};

function ChangeInfoProfil1(props) {
  const {
    submit, DialogWidth, recoveryMessage, DialogHeight, errorsApi,
  } = props;
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const handleClose = () => {
    setDialog(false);
  };
  const { width } = hookDeviceInfo();

  const [validateRegister, setValidateRegister] = useState([]);
  const [loading, setLoading] = useState(false);
  const ValidateMsg = ({ message, i }) => <Spam type="subtitle4Green">{message}</Spam>;
  const ErrorMsg = ({ message, i }) => <Spam type="danger">{message}</Spam>;

  return (
    <Div width="100%">

      <Dialog
        maxWidth="lg"
        open={dialog}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'white',
            width: '600px',
            height: width > 400 ? '20%' : '45%'
          },
        }}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
      >
        <Div width="100%" height="100%" vertical="top" style={{ paddingTop: '20px' }}>

          <Div width="95%" horizontal="left">
            <Div height="50px" />

          </Div>

          <GridContainer spacing={2}>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <RecoveryForm submit={submit} language="EN" />
            </GridItem>

            <GridItem num={[12, 12, 12, 12, 12]}>
              <GridContainer spacing={2}>
                <GridItem num={[12, 12, 12, 12, 12]}>
                  {recoveryMessage.map((val, i) => <ValidateMsg message={val} i={i} key={`${i + 1}`} />)}
                  {errorsApi.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}

                </GridItem>
              </GridContainer>
            </GridItem>

          </GridContainer>

        </Div>

      </Dialog>

      <Div width="85%" horizontal="left">
        <GridContainer>

          <GridItem num={[7, 7, 7, 7, 7]}>
            <Div width="100%" height="100px">
              <InputGenerator title="Your password" userValue={profil.password} />
            </Div>

          </GridItem>
          <GridItem num={[5, 5, 5, 5, 5]}>

            <Div width="100%" horizontal="right" height="100px" onClick={() => setDialog(true)} style={{ fontSize: '14px', color: '#2E5E80' }}>
              Password Recovery
            </Div>
          </GridItem>
        </GridContainer>
      </Div>

    </Div>
  );
}
export default ChangeInfoProfil1;
