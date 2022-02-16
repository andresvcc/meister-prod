import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  couponNumber: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: '',
        info1: ''
      },
      FR: {
        label: '',
        info1: ''
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

export default function CouponForm({ language, submit }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width={['310px', '320px', '320px', '320px', '320px']}
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Apply coupon', FR: 'Apply coupon' }}
      types={types}
      elements={['couponNumber']}
      submit={submit}
    />
  );
}
