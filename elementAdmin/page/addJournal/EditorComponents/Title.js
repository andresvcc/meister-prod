import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { redux, Div } from 'components';
import Span from '@/components/Typography/Spam';
import FlexForm from '@/components/FlexForm/FlexForm';
import GridContainer from '@/components/Grid/GridContainer';
import GridItem from '@/components/Grid/GridItem';
import CropImage from './uploaderCrop';

const types = () => ({
  title: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    pathData: { 0: 'title' },
    languages: {
      EN: {
        label: 'Titre',
        info1: 'The titre should have at least 3 letters',
        info2: 'Invalid titre',
        info3: 'Correcly filled',
        info4: 'titre is required'
      },
      FR: {
        label: 'Titre',
        info1: 'The titre should have at least 3 letters',
        info2: 'Invalid titre',
        info3: 'Correcly filled',
        info4: 'titre is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['author']
  },
  author: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    pathData: { 0: 'author' },
    languages: {
      EN: {
        label: 'Author',
        info1: 'The titre should have at least 3 letters',
        info2: 'Invalid titre',
        info3: 'Correcly filled',
        info4: 'titre is required'
      },
      FR: {
        label: 'Author',
        info1: 'The author should have at least 3 letters',
        info2: 'Invalid author',
        info3: 'Correcly filled',
        info4: 'author is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['title']
  },
  date: {
    size: [12, 12, 12, 12, 12],
    type: 'date',
    justify: 'center',
    required: true,
    disableFuture: false,
    disablePast: false,
    pathData: { 0: 'date' },
    languages: {
      EN: {
        label: 'Date of birth'
      },
      FR: {
        label: 'Date de naissance'
      }
    }
  },
});

function LoginForm({
  language, submit, formDataMaster
}) {
  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Log in', FR: 'Log in' }}
      types={types()}
      elements={['title', 'author', 'date']}
      submit={submit}
      formDataMaster={formDataMaster}
      masterChange={(data) => submit(data)}
      buttonChild={<div />}
    />
  );
}

const TextEditor = ({ contain, setEditingContain }) => {
  const {
    urlPhoto,
    title,
    author,
    date,
  } = contain;

  const addPhoto = ({ data }) => {
    setEditingContain({ ...contain, urlPhoto: `${data}` });
  };

  const style = {
    marginTop: '10px',
    backgroundImage: `url('${contain.urlPhoto}')`,
    minHeight: '280px',
    backgroundSize: contain.style1,
    backgroundPosition: contain.position1,
  };

  return (
    <Div width="100%">
      <Div width={['100%', '100%', '700px', '900px', '1200px']} vertical="top">
        <div style={{ height: '20px' }} />
        <GridContainer spacing={1} alignItems="flex-start">
          <GridItem num={[6, 6, 6, 6, 6]}>
            <Div>
              <LoginForm submit={(data) => setEditingContain({ ...contain, [`${data.id}`]: data.value })} formDataMaster={[contain, setEditingContain]} />
              <CropImage
                onUpload={(data) => addPhoto({ data })}
                cropSize={{ width: 990, height: 540 }}
                aspect={16 / 9}
              />
            </Div>
          </GridItem>
          <GridItem num={[6, 6, 6, 6, 6]}>
            <div className="bannerCover" style={style} />
          </GridItem>
        </GridContainer>
      </Div>
    </Div>
  );
};

TextEditor.propTypes = {};

export default TextEditor;
