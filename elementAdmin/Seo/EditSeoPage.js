import React, { useState } from 'react';
import { redux, Div } from 'components';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = ({
  page, title, description, firstTitle, links
}) => ({
  title: {
    size: [12, 12, 6, 6, 6],
    type: 'text',
    justify: 'center',
    required: true,
    pathData: { 0: 'title' },
    languages: {
      EN: {
        label: 'Title',
        info1: ''
      },
      FR: {
        label: 'Article title',
        info1: ''
      }
    },
  },
  firstTitle: {
    size: [12, 12, 6, 6, 6],
    type: 'text',
    justify: 'center',
    required: true,
    pathData: { 0: 'firstTitle' },
    languages: {
      EN: {
        label: 'First Title',
        info1: ''
      },
      FR: {
        label: 'Premier Titre',
        info1: ''
      }
    },
  },
  description: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 4,
    pathData: { 0: 'description' },
    languages: {
      EN: {
        label: 'Description',
        info1: 'champ requis'
      },
      FR: {
        label: 'Description',
        info1: 'field required'
      }
    },
  },
  links: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: [...links],
      FR: [...links],
    },
    justify: 'center',
    pathData: { 0: 'links' },
    languages: {
      EN: {
        label: 'Links',
      },
      FR: {
        label: 'Links',
      }
    },
  }
});

function EditSeoPageForm({
  page, title, description, firstTitle, links, language, submit = (data) => true
}) {
  const formTypes = types({
    page, title, description, firstTitle, links
  });

  const [data, setData] = useState({
    page, title, description, firstTitle, links
  });

  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title=""
      language={language || 'EN'}
      variant="outlined"
      types={formTypes}
      elements={Object.keys(formTypes)}
      submit={submit}
      formDataMaster={[data, setData]}
      submitLabelLanguages={{
        EN: `Submit changes to ${page}`,
        FR: 'SUmmettre'
      }}
    />
  );
}

const EditSeoPage = ({
  page, title, description, firstTitle, links, saveSeoSettings
}) => (
  <Div vertical="top" horizontal="left">
    <h6>{page}</h6>
    <EditSeoPageForm
      {...{
        page, title, description, firstTitle, links
      }}
      submit={saveSeoSettings}
    />
  </Div>
);

export default EditSeoPage;
