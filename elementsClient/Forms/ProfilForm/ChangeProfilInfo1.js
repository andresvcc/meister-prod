import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {

};

/*
default types:
  fname
  lname
  email
  password
  passwordConfirm
  telephone
  birthDate
  expiryDate
  poid
  sex
  creditCard
  cvv
*/

export default function ChangeEmailAddressForm(props) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['260px', '320px', '320px', '320px', '320px']}
      title=""
      language={props.language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Change profil information', FR: 'Changer les information' }}
      types={types}
      elements={['fname2', 'lname2']}
      submit={props.submit}
    />
  );
}
