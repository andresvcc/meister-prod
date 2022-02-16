import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  tel: {
    size: [11, 11, 11, 11, 11],
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

export default function ContactForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['300px', '320px', '320px', '320px', '320px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Send', FR: 'Send' }}
      types={types}
      elements={['motorcycle', 'fname', 'lname', 'empty[1,1,1,1,1]', 'tel', 'email', 'address1', 'postal1', 'country2', 'city2', 'commentaire']}
      submit={submit}
    />
  );
}
