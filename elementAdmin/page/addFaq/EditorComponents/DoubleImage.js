import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import FlexForm from '@/components/FlexForm/FlexForm';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
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

const types = ({ vaKey }) => ({
  style: {
    size: [12, 6, 6, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: [{ value: 'cover', title: 'Cover' }, { value: '150% auto', title: 'Cover 2x' }, { value: '80% auto', title: 'Ajust' }, { value: 'auto', title: 'Auto' }, { value: 'auto 100%', title: 'Contain' }],
      FR: [{ value: 'cover', title: 'Cover' }, { value: 'auto', title: 'Auto' }, { value: 'auto 100%', title: 'Contain' }],
    },
    justify: 'center',
    pathData: { 0: `style${vaKey}` },
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
    size: [12, 6, 6, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: positions.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
      FR: positions.map((a) => ({ value: a, title: `${a}`.toUpperCase() })),
    },
    justify: 'center',
    pathData: { 0: `position${vaKey}` },
    languages: {
      EN: {
        label: 'Position',
      },
      FR: {
        label: 'Position',
      }
    },
  },
});

function LoginForm({
  language, submit, formDataMaster, vaKey
}) {
  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
      types={types({ vaKey })}
      elements={['style', 'position']}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={(data) => submit(data)}
      buttonChild={<div />}
    />
  );
}

const FullImageEditor = ({ contain, setEditingContain }) => {
  const style1 = {
    backgroundImage: `url('${contain.urlPhoto1}')`,
    minHeight: contain.height1,
    backgroundSize: contain.style1,
    backgroundPosition: contain.position1,
  };

  const style2 = {
    backgroundImage: `url('${contain.urlPhoto2}')`,
    minHeight: contain.height2,
    backgroundSize: contain.style2,
    backgroundPosition: contain.position2,
  };

  const addPhoto = ({ data }) => {
    setEditingContain({ ...contain, urlPhoto1: `${data}` });
  };

  const addPhoto2 = ({ data }) => {
    setEditingContain({ ...contain, urlPhoto2: `${data}` });
  };

  return (
    <GridContainer spacing={1} alignItems="flex-start">
      <GridItem num={[6, 6, 6, 6, 6]}>
        <Div width="100%">
          <Div width="100%">
            <Div width="100%" row horizontal="left">
              <LoginForm submit={(data) => setEditingContain({ ...contain, [`${data.id}1`]: data.value })} vaKey={1} formDataMaster={[contain, setEditingContain]} />
              <Div>
                <CropImage
                  onUpload={(data) => addPhoto({ data })}
                  cropSize={{ width: 990, height: 540 }}
                  aspect={16 / 9}
                />
              </Div>
            </Div>
            <div className="bannerCover" style={style1} />
          </Div>
        </Div>
      </GridItem>
      <GridItem num={[6, 6, 6, 6, 6]}>
        <Div width="100%">
          <Div width="100%">
            <Div width="100%" row horizontal="left">
              <LoginForm submit={(data) => setEditingContain({ ...contain, [`${data.id}2`]: data.value })} vaKey={2} formDataMaster={[contain, setEditingContain]} />
              <Div>
                <CropImage
                  onUpload={(data) => addPhoto2({ data })}
                  cropSize={{ width: 990, height: 540 }}
                  aspect={16 / 9}
                />
              </Div>
            </Div>
            <div className="bannerCover" style={style2} />
          </Div>
        </Div>
      </GridItem>
    </GridContainer>
  );
};

FullImageEditor.propTypes = {};

export default FullImageEditor;
