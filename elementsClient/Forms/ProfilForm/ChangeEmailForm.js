import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  email: {
    size: [12, 12, 12, 12, 12],
    type: 'email',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'New email address',
        info1: ''
      },
      FR: {
        label: 'Nouvelle addresse e-mail',
        info1: ''
      }
    },
  },
  confirmEmail: {
    size: [12, 12, 12, 12, 12],
    type: 'email',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Confirm email address',
        info1: ''
      },
      FR: {
        label: 'Confirmer l addresse e-mail',
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
        label: 'Password',
      },
      FR: {
        label: 'Mot de pase',
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

export default function ChangeEmailAddressForm(props) {
    return (
      <FlexForm
        buttonWidth="100%"
        width={['310px', '320px', '320px', '320px', '320px']}
        title=""
        language={props.language || 'EN'}
        variant="outlined"
        submitLabelLanguages={{ EN: 'Change Email Address', FR: 'Changer adresse e-mail' }}
        types={types}
        elements={['email', 'confirmEmail', 'password']}
        submit={props.submit}
      />
    );
}


