import React from 'react';
// components
import { Div } from 'components';
import Spam from '@/components/Typography/Spam';
// elements
import ChangePassword from 'elementsClient/Forms/changePassword';

function ChangePass() {
  return (
    <Div width="95%" vertical="around" height="400px">
      <Spam type="serifDescription2">Change your password</Spam>
      <ChangePassword />
    </Div>
  );
}

export default ChangePass;
