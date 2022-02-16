import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  // pas utilisé mais conserver
  condition: {
    size: [12, 12, 12, 12, 12],
    type: 'checkbox',
    labelPlacement: 'end',
    justify: 'center',
    link: '/',
    languages: {
      EN: {
        label: 'I accept the',
        linkLabel: 'Terms of Use'
      },
      FR: {
        label: "J'accepte les",
        linkLabel: "conditions d'utilisation"
      }
    }
  },
  // utilisé pour indiquer les newsletters
  condition2: {
    size: [12, 12, 12, 12, 12],
    type: 'checkbox',
    labelPlacement: 'end',
    justify: 'center',
    link: '/',
    languages: {
      EN: {
        label: 'Subscribe to our newsletter',
      },
      FR: {
        label: "S'abonner à la newsletter",
      }
    }
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

export default function RegistreForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['310px', '400px', '450px', '450px', '450px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Create an account', FR: 'Create an account' }}
      types={types}
      elements={['fname', 'lname', 'email', 'password', 'passwordConfirm']}
      submit={submit}
    />
  );
}
