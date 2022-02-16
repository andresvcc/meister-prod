import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  password: {
    size: [12, 12, 12, 12, 12],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Password',
        info1: 'The password and confirm password are equal',
        info2: 'The password and confirm password are not equal',
        info3: 'More than 6 characters',
        info4: 'More than 6 characters are required',
        info5: 'At least one uppercase letter',
        info6: 'One uppercase letter is required',
        info7: 'More than 1 number',
        info8: '1 number is required'
      },
      FR: {
        label: 'Password',
        info1: 'The password and confirm password are equal',
        info2: 'The password and confirm password are not equal',
        info3: 'More than 6 characters',
        info4: 'More than 6 characters are required',
        info5: 'At least one uppercase letter',
        info6: 'One uppercase letter is required',
        info7: 'More than 1 number',
        info8: '1 number is required'
      }
    },
    verify: (formData, currentValue) => [
      formData.passwordConfirm ? (formData.passwordConfirm === currentValue && currentValue !== '' ? { return: true, info: 'info1' } : { return: false, info: 'info2', }) : { return: false, info: 'info2', },
      /(?=^.{6,}$)/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
      /(?=^.{1,}$)(?=.*[A-Z]).*/.test(currentValue) ? { return: true, info: 'info5' } : { return: false, info: 'info6' },
      /(?=^.{1,}$)(?=.*[0-9]).*/.test(currentValue) ? { return: true, info: 'info7' } : { return: false, info: 'info8' },
    ],
    binding: ['passwordConfirm']
  },
  passwordConfirm: {
    size: [12, 12, 12, 12, 12],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Password confirmation',
      },
      FR: {
        label: 'Password confirmation',
      }
    },
    verify: (formData, currentValue) => [
      formData.password ? (formData.password === currentValue && currentValue !== '' ? { return: true, info: '', } : { return: false, info: '', }) : { return: false, info: '', },
      /(?=^.{6,}$)/.test(currentValue) ? { return: true, info: '', } : { return: false, info: '', },
      /(?=^.{1,}$)(?=.*[A-Z]).*/.test(currentValue) ? { return: true, info: '', } : { return: false, info: '', },
      /(?=^.{1,}$)(?=.*[0-9]).*/.test(currentValue) ? { return: true, info: '', } : { return: false, info: '', },
    ],
    binding: ['password']
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

export default function RecoveryForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['350px', '320px', '320px', '320px', '320px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Change Password', FR: 'Changer mot de passe' }}
      types={types}
      elements={['password', 'passwordConfirm']}
      submit={submit}
    />
  );
}
