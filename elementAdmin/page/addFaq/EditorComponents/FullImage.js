import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import FlexForm from '@/components/FlexForm/FlexForm';
import CropImage from './uploaderCrop';

const positions = [
  'left top',
  'left center',
  'left bottom',
  'right top',
  'right center',
  'right bottom',
  'center top',
  'center center',
  'center bottom',
];

const types = {
  height: {
    size: [12, 6, 4, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: [{ value: '300px', title: 'Barner' }, { value: '500px', title: 'Photo' }, { value: '600px', title: 'Full barner' }, { value: '50vh', title: 'adaptative barner' }],
      FR: [{ value: 'cover', title: 'Cover' }, { value: 'auto', title: 'Auto' }, { value: 'contain', title: 'Contain' }],
    },
    justify: 'center',
    pathData: { 0: 'height' },
    languages: {
      EN: {
        label: 'Height',
      },
      FR: {
        label: 'Height',
      }
    },
  },
  style: {
    size: [12, 6, 4, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: [{ value: 'cover', title: 'Cover' }, { value: '150% auto', title: 'Cover 2x' }, { value: '80% auto', title: 'Ajust' }, { value: 'auto', title: 'Auto' }, { value: 'auto 100%', title: 'Contain' }],
      FR: [{ value: 'cover', title: 'Cover' }, { value: 'auto', title: 'Auto' }, { value: 'auto 100%', title: 'Contain' }],
    },
    justify: 'center',
    pathData: { 0: 'style' },
    languages: {
      EN: {
        label: 'Style',
      },
      FR: {
        label: 'Style',
      }
    },
  },
  position: {
    size: [12, 6, 4, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: positions.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
      FR: positions.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
    },
    justify: 'center',
    pathData: { 0: 'position' },
    languages: {
      EN: {
        label: 'Position',
      },
      FR: {
        label: 'Position',
      }
    },
  },
  urlPhoto: {
    size: [12, 6, 6, 6, 6],
    type: 'text',
    justify: 'center',
    required: true,
    pathData: { 0: 'urlPhoto' }, // formData.languages && formData.languages[selectLangue] && formData.languages[selectLangue].nameProduct,
    languages: {
      EN: {
        label: 'Url',
      },
      FR: {
        label: 'Url',
      }
    },
  }
};

function LoginForm({ language, submit, formDataMaster }) {
  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
      types={types}
      elements={['height', 'style', 'position']}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={(data) => submit(data)}
      buttonChild={<div />}
    />
  );
}

const FullImageEditor = ({ contain, setEditingContain }) => {
  const style = {
    backgroundImage: `url('${contain.urlPhoto}')`,
    minHeight: contain.height,
    backgroundSize: contain.style,
    backgroundPosition: contain.position,
  };

  const addPhoto = ({ data }) => {
    setEditingContain({ ...contain, urlPhoto: `${data}` });
  };

  return (
    <Div width="100%">
      <Div width="100%">
        <Div width="100%" row horizontal="left">
          <LoginForm submit={(data) => setEditingContain({ ...contain, [data.id]: data.value })} formDataMaster={[contain, setEditingContain]} />
          <Div>
            <CropImage
              onUpload={(data) => addPhoto({ data })}
              cropSize={{ width: 990, height: 540 }}
              aspect={16 / 9}
            />
          </Div>
        </Div>
        <div className="bannerCover" style={style} />
      </Div>
    </Div>
  );
};

FullImageEditor.propTypes = {};

export default FullImageEditor;
