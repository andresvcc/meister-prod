import React, { useEffect, useState, useRef } from 'react';
import { Div } from 'component';
import FlexForm from '@/components/FlexForm/FlexForm';
import languagesCodes from '@/assets/dataBase/BDLanguagesCodes';
import types from './otherTypes/addProductTypes';

const titleForm = {
  EN: 'Product parameters',
  FR: 'Paramètres du produit'
};

export default function LoginForm(props) {
  const {
    formDataMaster, language, submit, buttonChild, globalSettings, providers
  } = props;
  const [formData, setData] = formDataMaster;

  const elements = ['price', 'currency', 'packageSize', 'delivery', 'Provider', 'Homologation', 'sizesType'];

  const onChange = (data) => {
    if (data.id === 'sizesType' && data.value === 'none') {
      const newFormData = { ...formData, [data.id]: '' };
      setData(newFormData);
    } else if (data.id === 'clasificationColor') {
      setData({ ...formData, [data.id]: data.value, colors: data.value ? [] : [{ colorName: '', color: '', photos: ['', '', '', ''] }] });
    } else {
      const newFormData = { ...formData, [data.id]: data.value };
      setData(newFormData);
    }
  };

  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title={titleForm[language] || titleForm.EN}
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Next', FR: 'Continuer' }}
      types={types(formData, null, globalSettings, providers)}
      elements={elements}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={onChange}
      buttonChild={buttonChild}
    />
  );
}
