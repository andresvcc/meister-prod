import React, { useEffect, useState, useRef } from 'react';
import { Div } from 'component';
import FlexForm from '@/components/FlexForm/FlexForm';
import languagesCodes from '@/assets/dataBase/BDLanguagesCodes';
import Typography from '@/components/Typography/Spam';

import DialogAddSelectOption from './chatacteristicsFiles/dialogAddSelectOption';

const titleForm = {
  EN: 'Product parameters',
  FR: 'Paramètres du produit'
};

export default function LoginForm(props) {
  const {
    formDataMaster, language, submit, buttonChild, globalSettings, providers
  } = props;
  const [formData, setData] = formDataMaster;

  const onChange = (data) => {
    const newFormData = { ...formData, [data.id]: data.value };
    setData(newFormData);
  };

  return (
    <Div width="calc(100% - 20px)">
      <Div width="100%">
        <Div width="calc(100% - 10px)" vertical="top" horizontal="left" height="50px">
          <Typography type="h2">Selectables Options</Typography>
        </Div>
      </Div>
      <Div height="20px" />
      <Div width="100%" height="60vh" vertical="top" style={{ overflowY: 'auto', paddingTop: '20px' }}>

        <DialogAddSelectOption defaultValues={formData.selectableOptions1} onSubmit={(data) => onChange({ id: 'selectableOptions1', value: data })}>
          <Div pointer width="calc(90% - 20px)" height="50px" style={{ padding: '5px', border: 'dashed 1px grey', margin: '5px' }}>
            Edit Select Option 1
          </Div>
        </DialogAddSelectOption>

        <DialogAddSelectOption defaultValues={formData.selectableOptions2} onSubmit={(data) => onChange({ id: 'selectableOptions2', value: data })}>
          <Div pointer width="calc(90% - 20px)" height="50px" style={{ padding: '5px', border: 'dashed 1px grey', margin: '5px' }}>
            Edit Select Option 2
          </Div>
        </DialogAddSelectOption>

        <DialogAddSelectOption defaultValues={formData.selectableOptions3} onSubmit={(data) => onChange({ id: 'selectableOptions3', value: data })}>
          <Div pointer width="calc(90% - 20px)" height="50px" style={{ padding: '5px', border: 'dashed 1px grey', margin: '5px' }}>
            Edit Select Option 3
          </Div>
        </DialogAddSelectOption>
      </Div>
    </Div>
  );
}
