/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useRef } from 'react';
// import FlexForm from '@/components/FlexForm/FlexForm';
import { Div } from 'component';
import dynamic from 'next/dynamic';
import { title } from '@/assets/jss/nextjs-material-dashboard-pro';

import types from './otherTypes/addProductTypes';

const FlexForm = dynamic(
  () => import('@/components/FlexForm/FlexForm'),
  { loading: () => <Div width="100%" height="50vh">...Loading</Div>, ssr: false }
);

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
  const {
    formDataMaster,
    globalSettings,
    providers,
    language
  } = props;
  const [formData, setData] = formDataMaster;
  const prevFormData = usePrevious(formData);

  const brandZone = formData.brand && formData.brand !== '' ? (formData.categorie === 'Motorcycle' ? ['brand', 'model'] : ['brand']) : ['brand'];
  const compatibilityZone = formData.categorie === 'Parts' ? ['brandCompatibility', 'compatibility'] : formData.categorie === 'Certification' ? ['compatibilityCertification'] : [];
  const modification = formData.subcategorie !== 'unmodified' ? ['dateOfModification'] : [];
  const motorcycleZone = formData.categorie === 'Motorcycle' ? ['year', ...modification] : [];
  const genre = formData.categorie === 'Motorcycle' ? [] : ['genre'];

  const [elements, setElements] = useState(['categorie', ...brandZone, ...compatibilityZone, ...motorcycleZone]);

  const onChange = (data) => {
    const newFormData = { ...formData, [data.id]: data.value };

    if (data.id === 'categorie' && formData.categorie !== data.value) {
      newFormData.genre = '';
      newFormData.subcategorie = '';
      if (data.value === 'Pilot') {
        newFormData.colors = [
          ...newFormData.colors.map((color) => ({ ...color, photos: [...(color.photos.length > 4 ? [...color.photos.slice(0, 4)] : [...color.photos])] }))
        ];
      } else {
        newFormData.colors = [
          ...newFormData.colors.map((color) => ({ ...color, photos: [...(color.photos.length < 6 ? [...color.photos, '', ''] : [...color.photos])] }))
        ];
      }
      delete newFormData.brand;
      delete newFormData.model;
      if (newFormData.categorie === 'Parts' || newFormData.categorie === 'Certification') {
        delete newFormData.brandCompatibility;
        delete newFormData.compatibility;
      }
    }

    if (data.id === 'subcategorie' && formData.subcategorie !== data.value) {
      newFormData.genre = '';
      delete newFormData.brand;
      delete newFormData.model;
    }

    if (data.id === 'brand') {
      delete newFormData.model;
    }

    if (data.id === 'brandCompatibility') {
      delete newFormData.compatibility;
    }

    setData(newFormData);
  };

  useEffect(() => {
    if (formData.subcategorie && formData.subcategorie !== '') return setElements(['categorie', 'subcategorie', ...genre, ...brandZone, ...compatibilityZone, ...motorcycleZone]);
    if (formData.categorie && formData.categorie !== '') return setElements(['categorie', 'subcategorie', ...brandZone, ...compatibilityZone, ...motorcycleZone]);
  }, [formData]);

  return (
    <FlexForm
      buttonWidth="50%"
      width="100%"
      title="Products settings"
      language={props.language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Next', FR: 'Continuer' }}
      types={types(formData, null, globalSettings, providers)}
      elements={elements}
      submit={props.submit}
      formDataMaster={formDataMaster}
      masterChange={onChange}
      buttonChild={props.buttonChild}
    />
  );
}
