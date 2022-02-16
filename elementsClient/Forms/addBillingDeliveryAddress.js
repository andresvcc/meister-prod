import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';
import countriesEN from '@/assets/dataBase/DBCountriesEN';
import countriesFR from '@/assets/dataBase/DBCountriesFR';

const types = {
  country: {
    size: [12, 7, 7, 7, 7],
    type: 'autocomplet',
    required: true,
    options: {
      EN: countriesEN,
      FR: countriesFR
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Country',
        info1: 'Email address is required',
        info2: 'Email address is valid',
        info3: 'Email address is not valid',
      },
      FR: {
        label: 'Country',
      }
    },
  },
  zipArea: {
    size: [12, 5, 5, 5, 5],
    type: 'text',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'City'
      },
      FR: {
        label: 'City'
      }
    },
  },

  zipCode: {
    size: [12, 5, 5, 5, 5],
    type: 'number',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Postal Code'
      },
      FR: {
        label: 'Postal Code'
      }
    },
  },
  identical: {
    size: [12, 7, 7, 7, 7],
    type: 'checkbox',
    labelPlacement: 'end',
    justify: 'center',
    link: '/',
    languages: {
      EN: {
        label: 'Identical as Billing address',
      },
      FR: {
        label: 'Identical as Billing address',
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

export default function AddAddressForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['100%', '100%', '450px', '550px', '550px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Next', FR: 'Next' }}
      types={types}
      elements={['fname', 'lname', 'address1', 'postal1', 'city1', 'country1']}
      submit={submit}
    />
  );
}
