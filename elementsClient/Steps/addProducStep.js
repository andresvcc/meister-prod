import React, {
  useEffect, useState, useCallback, useRef
} from 'react';
import { Div, hookDeviceInfo } from 'component';
import AddProductForm from 'elementsClient/Forms/addProduct';
import AddProductForm2 from 'elementsClient/Forms/addProduct2';
import AddProductForm3 from 'elementsClient/Forms/addProduct3';
import AddProductForm4 from 'elementsClient/Forms/addProduct4';
import types from 'elementsClient/Forms/otherTypes/addProductTypes';
import StepForm from '@/components/StepForm/StepForm';
import languagesCodes from '@/assets/dataBase/BDLanguagesCodes';
import FlexForm from '@/components/FlexForm/FlexForm';

const titleForm = {
  EN: 'Product parameters',
  FR: 'Paramètres du produit'
};

function StepFormCharacteristique(props) {
  const {
    formDataMaster, language, submit, buttonChild, elements, title = {}
  } = props;
  const [formData, setData] = formDataMaster;

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
      title={title[language] || titleForm.EN}
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Next', FR: 'Continuer' }}
      types={types(formData)}
      elements={elements}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={onChange}
      buttonChild={buttonChild}
    />
  );
}

export default function AddProductStep(props) {
  const formDataMaster = useState({});
  const [formData, setData] = formDataMaster;

  const submit = (data) => {
    console.log('submit AddProductStep', JSON.stringify(data));
  };

  return (
    <StepForm language="EN" submit={submit} title="Product Data" formDataMaster={formDataMaster}>
      <AddProductForm2 />
      <AddProductForm3 />
      <AddProductForm4 elements={['color']} title={{ EN: 'Graphique', FR: 'Graphique' }} />
    </StepForm>
  );
}

/*

        <StepFormCharacteristique elements={['material']} title={{ EN: 'Materials', FR: 'Matériel' }} />
        <StepFormCharacteristique elements={['Composition']} title={{ EN: 'Review', FR: 'Revue' }} />

*/
