import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  username: {
    size: [12, 12, 12, 12, 12],
    type: 'email',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Username',
        info2: 'le champ ne peut pas etre vide'
      },
      FR: {
        label: 'Username',
        info2: 'le champ ne peut pas etre vide'
      }
    },
    verify: (formData, currentValue) => [
      currentValue !== undefined && currentValue !== '' ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
    ],
  },
  password: {
    size: [12, 12, 12, 12, 12],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Password',
        info2: 'le champ ne peut pas etre vide'
      },
      FR: {
        label: 'Mot de pase',
        info2: 'le champ ne peut pas etre vide'
      }
    },
    verify: (formData, currentValue) => [
      currentValue !== undefined && currentValue !== '' ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
    ],
  },
  telephone: {
    size: [12, 12, 12, 12, 12],
    type: 'telephone',
    justify: 'center',
    defaultCountry: 'CH',
    languages: {
      EN: {
        label: 'Telephone',
        info2: 'le champ ne peut pas etre vide'
      },
      FR: {
        label: 'Telephone',
        info2: 'le champ ne peut pas etre vide'
      }
    },
    verify: (formData, currentValue) => [
      currentValue !== undefined && currentValue !== '' ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
    ],
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
      submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
      types={types}
      elements={['username', 'password', 'telephone']}
      submit={submit}
    />
  );
}
