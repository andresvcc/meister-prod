import React, { useEffect, useState } from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';
import { Div } from 'component';
import Typography from '@/components/Typography/Spam';

const types = {
  name: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Cardholder'
      },
      FR: {
        label: 'Titulaire de la carte',
      }
    },
    auto: true,
  },
  number: {
    size: [12, 12, 5, 5, 5],
    type: 'regex',
    regex: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Credit card'
      },
      FR: {
        label: 'Carte de credit'
      }
    },
    auto: true,
  },
  expiry: {
    size: [7, 7, 4, 4, 4],
    type: 'regex',
    regex: [/[0-1]/, /[0-9]/, '/', /[0-9]/, /[0-9]/],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Expiry date'
      },
      FR: {
        label: "Date d'expiration",
      }
    },
    auto: true,
  },
  cvc: {
    size: [5, 5, 3, 3, 3],
    type: 'regex',
    regex: [/[0-9]/, /\d/, /\d/],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'CVC'
      },
      FR: {
        label: 'CVV'
      }
    },
    auto: true,
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

export default function CreditCardForm(props) {
  const { language, submit } = props;
  const formDataMaster = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: 0
  });
  const [formData, setData] = formDataMaster;
  const masterCurrentIDChange = useState('');
  const [currentID, setCurrentID] = masterCurrentIDChange;

  const onChange = (data) => {
    if (data.id === 'number') {
      const newFormData = { ...formData, [data.id]: data.value.replaceAll('-', '').replaceAll(' ', '') };
      setData(newFormData);
    } else {
      const newFormData = { ...formData, [data.id]: data.value };
      setData(newFormData);
    }
  };

  return (
    <Div width="100%">
      <Div width="100%" vertical="top" height="80px">
        <Typography type="h2">Credit Card</Typography>
      </Div>
      <Div height="20px" />
      <FlexForm
        buttonWidth="100%"
        width={['100%', '500px', '600px', '600px', '600px']}
        title=""
        language={language || 'EN'}
        variant="outlined"
        submitLabelLanguages={{ EN: 'Add', FR: 'Ajouter' }}
        types={types}
        elements={['name', 'number', 'expiry', 'cvc']}
        formDataMaster={formDataMaster}
        masterChange={onChange}
        submit={submit}
        masterCurrentIDChange={masterCurrentIDChange}
      />
    </Div>
  );
}
