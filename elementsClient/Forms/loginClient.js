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
        label: 'Email',
        info1: ''
      },
      FR: {
        label: 'Email address',
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
        label: 'Password',
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

export default function LoginForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['310px', '320px', '320px', '320px', '320px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Log In', FR: 'Log In' }}
      types={types}
      elements={['email', 'password']}
      submit={submit}
    />
  );
}
