import React from 'react';
import FlexForm from '@/components/FlexForm/FlexForm';

const types = {
  langue: {
    size: [12, 6, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: ['EN', 'FR', 'IT', 'DE'].map((val) => ({ value: val, title: val })),
      FR: ['EN', 'FR', 'IT', 'DE'].map((val) => ({ value: val, title: val })),
    },
    justify: 'center',
    pathData: { 0: 'langue' },
    languages: {
      EN: {
        label: 'Langue',
      },
      FR: {
        label: 'Langue',
      }
    },
  },
  time: {
    size: [12, 4, 4, 4, 4],
    type: 'number',
    justify: 'center',
    required: true,
    pathData: { 0: 'time' },
    languages: {
      EN: {
        label: 'Read Time',
      },
      FR: {
        label: 'Temps lecture',
      }
    },
  },
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
  subtitle: {
    size: [12, 12, 6, 6, 6],
    type: 'text',
    justify: 'center',
    required: true,
    pathData: { 0: 'subtitle' },
    languages: {
      EN: {
        label: 'Article subtitle ',
        info1: ''
      },
      FR: {
        label: 'Article subtitle ',
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
  category: {
    size: [12, 12, 6, 6, 6],
    type: 'text',
    justify: 'center',
    required: true,
    pathData: { 0: 'category' },
    languages: {
      EN: {
        label: 'Category',
        info1: ''
      },
      FR: {
        label: 'Categorie',
        info1: ''
      }
    },
  },
  tags: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: ['Old', 'bmw', 'restored'],
      FR: ['Old', 'bmw', 'restored'],
    },
    justify: 'center',
    pathData: { 0: 'tags' },
    languages: {
      EN: {
        label: 'Details',
      },
      FR: {
        label: 'Détails',
      }
    },
  }
};

/*
default types:

    fname
    lname
    email
    password
    passwordConfirm
    telephone
    birthDate
    expiryDate
    poid
    sex
    creditCard
    cvv
*/

export default function AddArticle({
  language, submit, formDataMaster, buttonChild
}) {
  return (
    <FlexForm
      buttonWidth="100%"
      width="100%"
      title=""
      language={language || 'EN'}
      variant="outlined"
      submitLabelLanguages={{ EN: 'Add article', FR: 'Add Article' }}
      types={types}
      elements={['langue', 'time', 'title', 'subtitle', 'category', 'description', 'tags']}
      submit={submit}
      formDataMaster={formDataMaster}
      buttonChild={buttonChild}
    />
  );
}
