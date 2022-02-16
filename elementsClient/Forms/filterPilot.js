import React from 'react';
import { Div } from 'component';
import FlexForm from '@/components/FlexForm/FlexForm';
import Button from '@/components/CustomButtons/Button';

const sortBy = [
  { title: 'Most popular', value: 1 },
  { title: 'Price high to low', value: 2 },
  { title: 'Price low to high', value: 3 },
  { title: 'Newest', value: 4 },
  { title: 'Oldest first', value: 5 },
  // { title: 'Most popular', value: '1' }, (a, b) => a.last_nom.localeCompare(b.last_nom)
];

const typesGen = (categories, brand) => ({
  categories: {
    size: [6, 4, 4, 3, 3],
    type: 'option',
    required: true,
    options: {
      EN: [...categories, 'none'].map((val) => ({ title: val, value: val })),
      FR: [...categories, 'none'].map((val) => ({ title: val, value: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Sub-category: '
      },
      FR: {
        label: 'Sous-catégorie: ',
      }
    },
  },
  brand: {
    size: [6, 4, 4, 3, 3],
    type: 'option',
    required: true,
    options: {
      EN: [...brand, 'none'].map((val) => ({ title: val, value: val })),
      FR: [...brand, 'none'].map((val) => ({ title: val, value: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Brand: '
      },
      FR: {
        label: 'Marque: ',
      }
    },
  },
  sort: {
    size: [6, 4, 4, 3, 3],
    type: 'option',
    required: true,
    options: {
      EN: sortBy,
      FR: sortBy,
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Sort by: '
      },
      FR: {
        label: 'Sort by: ',
      }
    },
  },
});

// Object.keys(categories.Pilot);

export default function Filter(props) {
  const {
    categories, filter, language, submit, products
  } = props;

  const subcategorie = filter.subcategorie ? Object.keys(categories[filter.subcategorie]) : []; // .categorie ? categories[filter.categorie] : [];
  const brand = [...new Set(products.map((val) => val.brand))];
  

  const types = typesGen(subcategorie, brand);

  return (
    <Div width="100%" horizontal="left">
      <Div width={['100%', '100%', 800, 700, 1000]} row vertical="bottom">
        <FlexForm
          width={['100%', '100%', '700px', '700px', '900px']}
          title=""
          horizontal="left"
          language={language || 'EN'}
          variant="standard"
          submitLabelLanguages={{ EN: 'Connect', FR: 'Se connecter' }}
          types={types}
          elements={filter.subcategorie ? ['categories', 'brand', 'sort'] : ['brand', 'sort']}
          submitOnChange={submit}
          buttonChild={<div />}
        />
      </Div>
    </Div>
  );
}
