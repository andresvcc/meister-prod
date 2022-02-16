/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useRef } from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';
import { Div } from 'component';
import languagesCodes from '@/assets/dataBase/BDLanguagesCodes';
import types from './otherTypes/addProductTypes';

const titleForm = {
  EN: 'Product parameters',
  FR: 'Paramètres du produit'
};

export default function LoginForm(props) {
  const { formDataMaster } = props;
  const [formData, setData] = formDataMaster;

  const elements = ['characteristics', 'sizeType', 'prix', 'currency', 'delivery', 'packageSize', 'Provider', 'Homologation'];

  const onChange = (data) => {
    if (data.id === 'language') {
      const langues = {};
      if (data && data.value && Array.isArray(data.value)) {
        data.value.forEach((val) => {
          langues[languagesCodes[val] || 'UNDEFINED'] = {};
        });
      }

      const newFormData = { ...formData, [data.id]: data.value, languages: { ...langues, ...formData.languages } };
      setData(newFormData);
    } else {
      const newFormData = { ...formData, [data.id]: data.value };
      setData(newFormData);
    }
  };

  return (
    <FlexForm
      buttonWidth="100%"
      width={['100%', '500px', '600px', '600px', '600px']}
      title={titleForm[props.language] || titleForm.EN}
      language={props.language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Next', FR: 'Continuer' }}
      types={types(formData)}
      elements={elements}
      submit={props.submit}
      formDataMaster={formDataMaster}
      masterChange={onChange}
      buttonChild={props.buttonChild}
    />
  );
}
