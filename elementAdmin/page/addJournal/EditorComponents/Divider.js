import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Div } from 'components';
import FlexForm from '@/components/FlexForm/FlexForm';

const positions = [
  'left',
  'center',
  'right',
];

const sizes = [
  '50px',
  '100px',
  '25%',
  '50%',
  '75%',
  '100%',
];

const margin = [
  '0px',
  '20px',
  '40px',
  '80px',
  '100px',
  '120px',
];

const types = {
  style: {
    size: [4, 4, 3, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: [{ value: 'solid 2px black', title: 'Simple' }, { value: 'solid 4px black', title: 'Bolder' }, { value: 'double 6px black', title: 'Double' }, { value: 'none', title: 'None' }],
      FR: [{ value: 'solid 2px black', title: 'Simple' }, { value: 'solid 4px black', title: 'Bolder' }, { value: 'double 6px black', title: 'Double' }, { value: 'none', title: 'None' }],
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
    size: [4, 4, 3, 3, 2],
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
  size: {
    size: [4, 4, 3, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: sizes.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
      FR: sizes.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
    },
    justify: 'center',
    pathData: { 0: 'sizes' },
    languages: {
      EN: {
        label: 'Size',
      },
      FR: {
        label: 'Size',
      }
    },
  },
  margin: {
    size: [4, 4, 3, 3, 2],
    type: 'option',
    required: true,
    options: {
      EN: margin.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
      FR: margin.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
    },
    justify: 'center',
    pathData: { 0: 'margin' },
    languages: {
      EN: {
        label: 'Margin',
      },
      FR: {
        label: 'Margin',
      }
    },
  },
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
      elements={['style', 'position', 'size', 'margin']}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={(data) => submit(data)}
      buttonChild={<div />}
    />
  );
}

const TextEditor = ({ contain, setEditingContain }) => {
  const {
    position,
    style,
    size,
    margin
  } = contain;

  return (
    <Div width="100%">

      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top" style={{ marginBottom: margin, paddingTop: margin }}>
        <Div width="100%" horizontal={position} style={{ paddingBottom: '20px' }}>
          <div style={{ width: size, borderTop: style }} />
        </Div>
      </Div>

      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top">
        <Div width="100%">
          <LoginForm submit={(data) => setEditingContain({ ...contain, [data.id]: data.value })} formDataMaster={[contain, setEditingContain]} />
        </Div>
      </Div>

    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
