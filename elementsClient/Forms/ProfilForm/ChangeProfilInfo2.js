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
        width={['310px', '320px', '450px', '450px', '450px']}
        title=""
        language={props.language || 'EN'}
        variant="outlined"
        submitLabelLanguages={{ EN: 'Change profil information', FR: 'Changer les information' }}
        types={types}
        elements={['telephone']}
        submit={props.submit}
      />
    );
}


