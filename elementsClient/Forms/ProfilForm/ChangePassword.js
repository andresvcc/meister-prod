import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  oldPass: {
    size: [12, 12, 12, 12, 12],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Old Password',
        info1: ''
      },
      FR: {
        label: 'Ancien mot de passe',
        info1: ''
      }
    },
  },
  password: {
    size: [12, 12, 12, 12, 12],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'New Password',
      },
      FR: {
        label: 'Nouveau mot de pase',
      }
    },
  },
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

export default function ChangePassword(props) {
    return (
      <FlexForm
        buttonWidth="100%"
        width={['260px', '320px', '320px', '320px', '320px']}
        title=""
        language={props.language || 'EN'}
        variant="outlined"
        submitLabelLanguages={{ EN: 'Change password', FR: 'Changer de mot de passe' }}
        types={types}
        elements={['oldPass', 'password']}
        submit={props.submit}
      />
    );
}


