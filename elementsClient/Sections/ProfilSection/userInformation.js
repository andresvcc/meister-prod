import React, { useMemo, useState } from 'react';
// components
import {
  Div, redux, hookDeviceInfo
} from 'components';
import RecoveryForm from 'elementsClient/Forms/changePassForm';
import { validate } from '@material-ui/pickers';
import Spam from '@/components/Typography/Spam';
import GridItem from '@/components/Grid/GridItem';
import GridContainer from '@/components/Grid/GridContainer';
// elements
import ChangeEmailAddress from './UserInformationElements/ChangeEmailAddress';
import ChangePassword from './UserInformationElements/ChangePassword';
import ChangeProfilInfo1 from './UserInformationElements/ChangeProfilInfo_1';
import ChangeProfilInfo2 from './UserInformationElements/ChangeProfilInfo_2';

const ChangeDivGenerator = (props) => {
  const { children } = props;
  return (
    <GridItem num={[12, 12, 12, 12, 12]}>
      <Div width="100%" height="120px" style={{ borderTop: '1px solid #00000020' }}>
        {children}
      </Div>
    </GridItem>
  );
};

function UserInformation(props) {
  const {
    profil, recoverys, recoverysMess, errorsApi,
  } = props;
  const [{ profilInfo }, dispatch] = redux();

  const changEmail = async (data) => {
    const temp = {
      email: data.email
    };
    await dispatch({
      state: 'profilInfo',
      value: {
        email: temp
      }
    });
  };

  const changProfilInfo = async (data) => {
    const temp = {
      fname: data.fname2,
      lname: data.lname2,
    };
    await dispatch({
      state: 'profilInfo',
      value: {
        fname: temp.fname,
        lname: temp.lname,
      }
    });
  };

  const { width } = hookDeviceInfo();
  const [open, setOpen] = useState(false);

  const DialogWidth = useMemo(() => {
    const fullscreen = false;
    if (width < 600) return fullscreen === false;
    return fullscreen === true;
  }, [width]);

  const DialogHeight = useMemo(() => {
    if (width < 600) return { paddingTop: '150px' };
    return null;
  }, [width]);

  return (
    <Div width="100%" style={{ background: 'white' }}>
      <Div height="60px" width="85%" horizontal="left" />
      <Div width="100%">
        <GridContainer>

          <ChangeDivGenerator>
            <ChangeEmailAddress profil={profil} submit={changEmail} />
          </ChangeDivGenerator>

          <ChangeDivGenerator>
            <ChangePassword DialogWidth={DialogWidth} DialogHeight={DialogHeight} profil={profil} submit={recoverys} errorsApi={errorsApi} recoveryMessage={recoverysMess} />
          </ChangeDivGenerator>

        </GridContainer>
        <Div height="150px" />
      </Div>
    </Div>
  );
}
export default UserInformation;
