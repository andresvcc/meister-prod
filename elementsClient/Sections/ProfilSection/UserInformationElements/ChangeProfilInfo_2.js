import React, { useState } from 'react';// components
import { Div } from 'components';
import Spam from '@/components/Typography/Spam';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
// material ui
import { Dialog } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ChangeProfilInfo2 from 'elementsClient/Forms/ProfilForm/ChangeProfilInfo2';
// material ui icon
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  dialog: {
  }
});
const theme = createTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.2)'
      }
    }
  }
});

// temp database
const profil = { phoneNum: '+41 323 23 12', birthDate: '14/09/1920' };

const InputGenerator = (props) => {
  const { title, userValue } = props;
  return (
    <Div width="100%" horizontal="left" height="60px">
      <Spam type="serifDescriptionBold">{title}</Spam>
      <Spam type="serifDescription">{userValue}</Spam>
    </Div>
  );
};

const DialogInputGenerator1 = (props) => {
  const { children, type } = props;
  return (
    <Div width="80%" height="20px">
      <Div horizontal="left" width="100%">
        <Spam type="serifDescription">
          {children}
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

function ChangeInfoProfil2() {
  const classes = useStyles();

  const [dialog, setDialog] = useState(false);
  const handleClose = () => {
    setDialog(false);
  };

  return (
    <Div width="100%">

      <ThemeProvider theme={theme}>

        <Dialog
          open={dialog}
          aria-labelledby="max-width-dialog-title"
          PaperProps={{
            style: {
              backgroundColor: 'white',
              height: '50%',
              width: '600px'
            },
          }}
          onClose={handleClose}
          classes={{
            paper: classes.dialog,
          }}
        >
          <Div width="100%" height="100%" vertical="top" style={{ paddingTop: '20px' }}>

            <Div width="90%" row style={{ borderBottom: '1px solid grey' }}>

              <Div onClick={() => setDialog(false)} width="20%" height="60px" horizontal="left">
                <CloseIcon />
              </Div>
              <DialogInputGenerator2>Modify your personnal information</DialogInputGenerator2>
            </Div>

            <Div width="90%" horizontal="left">
              <Div height="50px" />

              <DialogInputGenerator1>
                Current phone Number:
                {' '}
                {profil.phoneNum}
              </DialogInputGenerator1>

            </Div>

            <Div width="80%" height="400px">
              <Div horizontal="left" width="100%">
                <ChangeProfilInfo2 />
              </Div>
            </Div>
          </Div>

        </Dialog>
      </ThemeProvider>

      <GridContainer>
        <GridItem num={[1, 2, 2, 2, 2]}>
          <Div width="100%" height="100px" style={{ paddingTop: '10px' }}>
            <AccountCircleIcon />
          </Div>
        </GridItem>
        <GridItem num={[7, 7, 7, 7, 7]}>
          <Div width="100%" height="100px">
            <InputGenerator title="Phone number" userValue={profil.phoneNum} />
          </Div>
          <Div width="100%" height="100px">
            <InputGenerator title="Birthdate" userValue={profil.birthDate} />
          </Div>
        </GridItem>
        <GridItem num={[3, 3, 3, 3, 3]}>
          <Div width="50%" horizontal="left" height="100px" onClick={() => setDialog(true)} style={{ color: '#2E5E80' }}>
            Modify
          </Div>
        </GridItem>
      </GridContainer>
    </Div>
  );
}
export default ChangeInfoProfil2;
