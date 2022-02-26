import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';
import countriesEN from '@/assets/dataBase/DBCountriesEN';
import countriesFR from '@/assets/dataBase/DBCountriesFR';

const types = {
  country1: {
    size: [12, 7, 7, 7, 7],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Country',
        info3: 'Correcly filled',
        info4: 'Country is required'
      },
      FR: {
        label: 'Country',
        info3: 'Correcly filled',
        info4: 'Country is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{4,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['city1']
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
  city1: {
    size: [12, 5, 5, 5, 5],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'City',
        info3: 'Correcly filled',
        info4: 'City is required'
      },
      FR: {
        label: 'City',
        info3: 'Correcly filled',
        info4: 'City is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{2,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['country1']
  },
  address1: {
    size: [12, 7, 7, 7, 7],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Address',
        info1: 'The address should have at least 8 letters',
        info2: 'Invalid address',
        info3: 'Correcly filled',
        info4: 'Address is required'
      },
      FR: {
        label: 'Address',
        info1: 'The address should have at least 8 letters',
        info2: 'Invalid address',
        info3: 'Correcly filled',
        info4: 'Address is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{8,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['postal1']
  },
  postal1: {
    size: [12, 5, 5, 5, 5],
    type: 'number',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Postal Code',
        info1: 'The postal code should have at least 4 numbers',
        info2: 'Invalid postal code',
        info3: 'Correcly filled',
        info4: 'At least 4 numbers'
      },
      FR: {
        label: 'Postal Code',
        info1: 'The postal code should have at least 4 numbers',
        info2: 'Invalid postal code',
        info3: 'Correcly filled',
        info4: 'Postal Code is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{4,}$)(?=.*[/^\d+$/]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['address1']
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
