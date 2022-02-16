import React, { useEffect, useState, useRef } from 'react';
import { Div } from 'component';
import FlexForm from '@/components/FlexForm/FlexForm';
import { title } from '@/assets/jss/nextjs-material-dashboard-pro';
import types from './otherTypes/addProductTypes';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const titleForm = {
  EN: 'Classification',
  FR: 'Classement'
};

export default function LoginForm(props) {
  const { formDataMaster } = props;
  const [formData, setData] = formDataMaster;
  const prevFormData = usePrevious(formData);

  const brandZone = formData.brand && formData.brand !== '' ? (formData.categorie === 'Motorcycle' ? ['empty[true,12,12,12,12]', 'brand', 'model'] : ['empty[true,12,12,12,12]', 'brand', 'family']) : ['empty[true,12,12,12,12]', 'brand', 'empty[true,6,6,6,6]'];
  const compatibilityZone = formData.categorie === 'Parts' ? ['brandCompatibility', 'compatibility'] : formData.categorie === 'Certification' ? ['compatibility'] : [];
  const modification = formData.subcategorie !== 'unmodified' ? ['dateOfModification'] : [];
  const motorcycleZone = formData.categorie === 'Motorcycle' ? ['year', 'empty[true,true,6,6,6]', ...modification] : [];

  const [elements, setElements] = useState(['categorie', 'empty[6,6,6,6,6]', ...brandZone, ...compatibilityZone, ...motorcycleZone]);

  const onChange = (data) => {
    const newFormData = { ...formData, [data.id]: data.value };

    if (data.id === 'categorie' && formData.categorie !== data.value) {
      newFormData.subcategorie = '';
      delete newFormData.genre;
      delete newFormData.brand;
      delete newFormData.model;
      delete newFormData.family;
      if (newFormData.categorie === 'Parts') {
        delete newFormData.brandCompatibility;
        delete newFormData.compatibility;
      }
    }

    if (data.id === 'subcategorie' && formData.subcategorie !== data.value) {
      delete newFormData.genre;
      delete newFormData.brand;
      delete newFormData.model;
      delete newFormData.family;
    }

    if (data.id === 'brand') {
      delete newFormData.model;
      delete newFormData.family;
    }

    if (data.id === 'brandCompatibility') {
      delete newFormData.compatibility;
    }

    setData(newFormData);
  };

  useEffect(() => {
    if (formData.subcategorie && formData.subcategorie !== '') return setElements(['categorie', 'subcategorie', 'genre', ...brandZone, ...compatibilityZone, ...motorcycleZone]);
    if (formData.categorie && formData.categorie !== '') return setElements(['categorie', 'subcategorie', ...brandZone, ...compatibilityZone, ...motorcycleZone]);
  }, [formData]);

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
