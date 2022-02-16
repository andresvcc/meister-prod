import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';
import countriesEN from '@/assets/dataBase/DBCountriesEN';
import countriesFR from '@/assets/dataBase/DBCountriesFR';

const types = {
  countries: {
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
        label: 'Country'
      },
      FR: {
        label: 'Pays',
      }
    },
  },
  city: {
    size: [12, 5, 5, 5, 5],
    type: 'text',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'City'
      },
      FR: {
        label: 'Ville'
      }
    },
  },
  address: {
    size: [12, 7, 7, 7, 7],
    type: 'text',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Address'
      },
      FR: {
        label: 'Adresse'
      }
    },
  },
  other: {
    size: [12, 5, 5, 5, 5],
    type: 'text',
    justify: 'center',
    languages: {
      EN: {
        label: 'Apt/Suite/Other'
      },
      FR: {
        label: 'Apt/Suite/Autre'
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
        label: 'Postal code'
      },
      FR: {
        label: 'Code postal'
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

//

export default function AddAddressForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['100%', '500px', '600px', '600px', '600px']}
      title="Add Address"
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Add', FR: 'Ajouter' }}
      types={types}
      elements={['zipCode', 'empty[true,7,7,7,7]', 'countries', 'city', 'address', 'other']}
      submit={submit}
    />
  );
}
