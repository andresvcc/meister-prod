import React, { useState } from 'react';// components
import { Div } from 'components';
// material ui
import { Dialog } from '@material-ui/core';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ChangeEmailForm from 'elementsClient/Forms/ProfilForm/ChangeEmailForm';
// material ui icon
import EmailIcon from '@material-ui/icons/Email';
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import Spam from '@/components/Typography/Spam';

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
const profil = { email: 'moto@meister-engineering.com' };

const InputGenerator = (props) => {
  const { title, userValue } = props;
  return (
    <Div width="100%" horizontal="left" height="60px">
      <Spam type="serifDescriptionBold">{title}</Spam>
      <Spam type="serifDescription">{userValue}</Spam>
    </Div>
  );
};

const DialogInputGenerator = (props) => {
  const { children } = props;
  return (
    <Div width="80%" height="50px">
      <Div horizontal="left" width="100%">
        <Spam type="serifDescription">
          {children}
        </Spam>
      </Div>
    </Div>
  );
};

function ChangeEmailAddress(props) {
  const { profil, submit } = props;

  const classes = useStyles();

  const [dialog, setDialog] = useState(false);
  const handleClose = () => {
    setDialog(false);
  };

  return (
    <Div width="85%" horizontal="left">

      <GridContainer>

        <GridItem num={[12, 12, 12, 12, 12]}>
          <Div width="100%" height="100px">
            <InputGenerator title="Your email address" userValue={profil.email} />
          </Div>
        </GridItem>
        <GridItem num={[3, 3, 3, 3, 3]} />
      </GridContainer>
    </Div>
  );
}
export default ChangeEmailAddress;
