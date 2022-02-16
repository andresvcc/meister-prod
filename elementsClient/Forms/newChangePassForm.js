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
        label: 'Email address'
      },
      FR: {
        label: 'Address mail'
      }
    },
  },
  password: {
    size: [1, 1, 1, 1, 1],
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

export default function ChangePassForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['310px', '320px', '320px', '320px', '320px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Send password change email', FR: 'Send password change email' }}
      types={types}
      elements={['email']}
      submit={submit}
    />
  );
}
