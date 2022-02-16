import React, { useState } from 'react';// components
import { Div, hookDeviceInfo } from 'components';
import Spam from '@/components/Typography/Spam';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
// material ui
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChangeProfilInfo1 from 'elementsClient/Forms/ProfilForm/ChangeProfilInfo1';
// material ui icon
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  root: {
  },
});

const InputGenerator = (props) => {
  const { title, userValue, userValue2 } = props;
  return (
    <Div width="100%" horizontal="left" height="60px">
      <Spam type="serifDescriptionBold">{title}</Spam>
      <Div width="100%" row horizontal="left" style={{ textTransform: 'capitalize' }}>
        <Spam type="serifDescription">
          {userValue}
        </Spam>
        <Div width={5} />
        <Spam type="serifDescription">
          {userValue2}
        </Spam>
      </Div>

    </Div>
  );
};

const DialogInputGenerator2 = (props) => {
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
  const { submit, profil } = props;
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const handleClose = () => {
    setDialog(false);
  };
  const { width } = hookDeviceInfo();

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
            height: width > 400 ? '35%' : '50%'
          },
        }}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
      >
        <Div width="100%" height="100%" vertical="top" style={{ paddingTop: '20px' }}>

          <Div width="90%" height="50px" row horizontal="at" style={{ borderBottom: '1px solid grey' }}>

            <Div onClick={() => setDialog(false)} width="20%" height="60px" horizontal="left">
              <CloseIcon />
            </Div>
            <DialogInputGenerator2>Modify your first and last name</DialogInputGenerator2>
          </Div>
          <Div width="80%" height="50px" >

            <Spam type="serifDescription">
              {profil.fname} {` `} {profil.lname}
            </Spam>

          </Div>

          <Div width="80%" height="400px">
            <Div horizontal="left" width="100%">
              <ChangeProfilInfo1 submit={submit} />
            </Div>
          </Div>
        </Div>

      </Dialog>

      <Div width="85%" horizontal="left">
        <GridContainer>

          <GridItem num={[7, 7, 7, 7, 7]}>
            <Div width="100%" height="100px">
              <InputGenerator title="First and last name" userValue={profil.fname} userValue2={profil.lname} />
            </Div>

          </GridItem>
          <GridItem num={[5, 5, 5, 5, 5]}>
            <Div width="100%" horizontal="right" height="100px" onClick={() => setDialog(true)} style={{ color: '#2E5E80' }}>
              Modify
            </Div>
          </GridItem>
        </GridContainer>
      </Div>

    </Div>
  );
}
export default ChangeInfoProfil1;
