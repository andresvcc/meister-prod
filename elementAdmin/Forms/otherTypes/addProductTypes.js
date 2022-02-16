/* eslint-disable newline-per-chained-call */
import dynamic from 'next/dynamic';
import {
  categories, brands, sizes, typeDelivery
} from '@/assets/dataBase/BDCategories';

import countriesFR from '@/assets/dataBase/DBCountriesFR';
import countriesEN from '@/assets/dataBase/DBCountriesEN';

const types = (formData, selectLangue, globalSettings, providers = { list: {} }) => ({
  categorie: {
    size: [12, 12, 12, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(globalSettings !== undefined ? globalSettings.categories : {}).map((val) => ({ value: val, title: val })),
      FR: Object.keys(globalSettings !== undefined ? globalSettings.categories : {}).map((val) => ({ value: val, title: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Category',
      },
      FR: {
        label: 'Catégorie',
      }
    },
  },
  entryIntoService: {
    size: [12, 12, 12, 6, 6],
    type: 'date',
    justify: 'center',
    required: true,
    disableFuture: true,
    disablePast: false,
    languages: {
      EN: {
        label: 'Putting into circulation'
      },
      FR: {
        label: 'Mise en circulation'
      }
    }
  },
  dateOfModification: {
    size: [12, 12, 12, 12, 12],
    type: 'date',
    justify: 'center',
    required: true,
    disableFuture: true,
    disablePast: false,
    languages: {
      EN: {
        label: 'Date of modification'
      },
      FR: {
        label: 'Date de modification'
      }
    }
  },
  year: {
    size: [12, 12, 12, 12, 12],
    type: 'autocomplet',
    required: true,
    addPlus: true,
    options: {
      EN: [...Array(122)].map((_, index) => {
        const year = `${(new Date().getFullYear()) - index}`;
        return ({ value: year, title: year });
      }),
      FR: [...Array(122)].map((_, index) => {
        const year = `${(new Date().getFullYear()) - index}`;
        return ({ value: year, title: year });
      }),
    },
    justify: 'center',
    pathData: { 0: 'year' },
    languages: {
      EN: {
        label: 'year of vehicle'
      },
      FR: {
        label: 'Année du véhicule'
      }
    }
  },
  subcategorie: {
    size: [12, 12, 12, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(globalSettings !== undefined ? globalSettings.categories[formData.categorie || 'Pilot'] : {}).map((val) => ({ value: val, title: val })),
      FR: Object.keys(globalSettings !== undefined ? globalSettings.categories[formData.categorie || 'Pilot'] : {}).map((val) => ({ value: val, title: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Sub-Category',
      },
      FR: {
        label: 'Sub-Catégorie',
      }
    },
  },
  genre: {
    size: [12, 12, 12, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(globalSettings !== undefined ? (globalSettings.categories[formData.categorie] !== undefined ? (globalSettings.categories[formData.categorie][formData.subcategorie] !== undefined ? globalSettings.categories[formData.categorie][formData.subcategorie] : {}) : {}) : {}).map((val) => ({ value: val, title: val })),
      FR: Object.keys(globalSettings !== undefined ? (globalSettings.categories[formData.categorie] !== undefined ? (globalSettings.categories[formData.categorie][formData.subcategorie] !== undefined ? globalSettings.categories[formData.categorie][formData.subcategorie] : {}) : {}) : {}).map((val) => ({ value: val, title: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Genre',
      },
      FR: {
        label: 'Genre',
      }
    },
  },
  brand: {
    size: [12, 12, 12, 6, 6],
    type: 'autocomplet',
    required: true,
    addPlus: true,
    pathData: { 0: 'brand' },
    options: {
      EN: Object.keys(globalSettings !== undefined ? globalSettings.brands : {}).map((val) => ({ value: val, title: val })) || [],
      FR: Object.keys(globalSettings !== undefined ? globalSettings.brands : {}).map((val) => ({ value: val, title: val })) || [],
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Brand',
      },
      FR: {
        label: 'Marque',
      }
    },
  },
  brandCompatibility: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: Object.keys(globalSettings !== undefined ? globalSettings.brands : {}),
      FR: Object.keys(globalSettings !== undefined ? globalSettings.brands : {}),
    },
    justify: 'center',
    pathData: { 0: 'brandCompatibility' },
    languages: {
      EN: {
        label: 'Brand Compatibility',
      },
      FR: {
        label: 'Marque Compatibility',
      }
    },
  },
  family: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    languages: {
      EN: {
        label: 'Family product',
      },
      FR: {
        label: 'Famille du produit',
      }
    },
  },
  compatibility: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    disable: !(formData.brandCompatibility && formData.brandCompatibility.length > 0),
    options: {
      EN: formData.brandCompatibility && globalSettings !== undefined ? Object.keys(globalSettings.brands).filter((val) => formData.brandCompatibility.includes(val)).map((val) => globalSettings.brands[val]).flat().sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]) : [], // formData.brandCompatibility,
      FR: formData.brandCompatibility && globalSettings !== undefined ? Object.keys(globalSettings.brands).filter((val) => formData.brandCompatibility.includes(val)).map((val) => globalSettings.brands[val]).flat().sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]) : []// formData.brandCompatibility,
    },
    justify: 'center',
    pathData: { 0: 'compatibility' },
    languages: {
      EN: {
        label: 'Models Compatibility',
      },
      FR: {
        label: 'Modèles Compatibles',
      }
    },
  },
  compatibilityCertification: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: formData.brandCompatibility && globalSettings !== undefined ? Object.keys(globalSettings.brands).filter((val) => formData.brandCompatibility.includes(val)).map((val) => globalSettings.brands[val]).flat().sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]) : [], // formData.brandCompatibility,
      FR: formData.brandCompatibility && globalSettings !== undefined ? Object.keys(globalSettings.brands).filter((val) => formData.brandCompatibility.includes(val)).map((val) => globalSettings.brands[val]).flat().sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]) : []// formData.brandCompatibility,
    },
    justify: 'center',
    pathData: { 0: 'compatibility' },
    languages: {
      EN: {
        label: 'Models Compatibility',
      },
      FR: {
        label: 'Modèles Compatibles',
      }
    },
  },
  group: {
    size: [12, 7, 7, 7, 7],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: ['light replacement'],
      FR: ['remplacement des lampes'],
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Is part of the kits',
      },
      FR: {
        label: 'Fait partie des kits',
      }
    },
  },
  delivery: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: ['All', 'Post Suisse', 'DHL', 'FEDEX', 'Meister'],
      FR: ['All', 'Post Suisse', 'DHL', 'FEDEX', 'Meister'],
    },
    justify: 'center',
    pathData: { 0: 'delivery' },
    languages: {
      EN: {
        label: 'Authorized delivery',
      },
      FR: {
        label: 'livraison autorisée',
      }
    },
  },
  price: {
    size: [12, 8, 8, 8, 8],
    type: 'number',
    justify: 'center',
    required: true,
    pathData: { 0: 'price' },
    languages: {
      EN: {
        label: 'Selling price ',
      },
      FR: {
        label: 'Prix de vente',
      }
    },
  },
  currency: {
    size: [12, 4, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: ['CHF', 'USD', 'EUR', 'GBP'].map((val) => ({ value: val, title: val })),
      FR: ['CHF', 'USD', 'EUR', 'GBP'].map((val) => ({ value: val, title: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: '-',
      },
      FR: {
        label: '-',
      }
    },
  },
  nameProduct: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    pathData: { 0: 'languages', 1: selectLangue, 2: 'nameProduct' }, // formData.languages && formData.languages[selectLangue] && formData.languages[selectLangue].nameProduct,
    languages: {
      EN: {
        label: 'Name of the product',
        info1: 'champ requis'
      },
      FR: {
        label: 'Nom du produit',
        info1: 'field required'
      }
    },
  },
  description: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 5,
    pathData: { 0: 'languages', 1: selectLangue, 2: 'description' },
    languages: {
      EN: {
        label: 'description box (small) ',
        info1: 'champ requis'
      },
      FR: {
        label: 'description box (small)',
        info1: 'field required'
      }
    },
  },
  text1: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 2,
    pathData: { 0: 'styleTextes', 1: selectLangue, 2: 'text1' },
    languages: {
      EN: {
        label: 'styled text 1',
      },
      FR: {
        label: 'styled text 1',
      }
    },
  },
  text2: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 2,
    pathData: { 0: 'styleTextes', 1: selectLangue, 2: 'text2' },
    languages: {
      EN: {
        label: 'styled text 1',
      },
      FR: {
        label: 'styled text 1',
      }
    },
  },
  text3: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 2,
    pathData: { 0: 'styleTextes', 1: selectLangue, 2: 'text3' },
    languages: {
      EN: {
        label: 'styled text 1',
      },
      FR: {
        label: 'styled text 1',
      }
    },
  },
  details: {
    size: [12, 12, 12, 12, 12],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: ['Soft calfskin lining'],
      FR: ['Soft calfskin lining'],
    },
    justify: 'center',
    pathData: { 0: 'languages', 1: selectLangue, 2: 'details' },
    languages: {
      EN: {
        label: 'Details',
      },
      FR: {
        label: 'Détails',
      }
    },
  },
  greatDescription: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 4,
    pathData: { 0: 'languages', 1: selectLangue, 2: 'greatDescription' },
    languages: {
      EN: {
        label: 'Description under the box',
      },
      FR: {
        label: 'Description under the box',
      }
    },
  },
  specialCare: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 4,
    pathData: { 0: 'languages', 1: selectLangue, 2: 'specialCare' },
    languages: {
      EN: {
        label: 'Special Care',
      },
      FR: {
        label: 'Special Care',
      }
    },
  },
  model: {
    size: [12, 12, 12, 12, 12],
    type: 'autocomplet',
    required: true,
    addPlus: true,
    options: {
      EN: globalSettings !== undefined ? globalSettings.brands[formData.brand && formData.brand.title ? formData.brand.title : 'Meister'].map((val) => ({ value: val, title: val })) : [],
      FR: globalSettings !== undefined ? globalSettings.brands[formData.brand && formData.brand.title ? formData.brand.title : 'Meister'].map((val) => ({ value: val, title: val })) : [],
    },
    justify: 'center',
    pathData: { 0: 'model' },
    languages: {
      EN: {
        label: 'Model',
      },
      FR: {
        label: 'Modèle',
      }
    },
  },
  clasificationColor: {
    size: [12, 4, 4, 4, 4],
    type: 'checkbox',
    labelPlacement: 'end',
    justify: 'center',
    link: '/',
    pathData: { 0: 'clasificationColor' },
    languages: {
      EN: {
        label: 'Colors',
      },
      FR: {
        label: 'Couleurs',
      }
    }
  },
  sizesType: {
    size: [12, 12, 12, 12, 12],
    type: 'autocomplet',
    required: true,
    addPlus: true,
    options: {
      EN: Object.keys(sizes).map((val) => ({ value: sizes[val], title: val })) || [],
      FR: Object.keys(sizes).map((val) => ({ value: sizes[val], title: val })) || [],
    },
    justify: 'center',
    pathData: { 0: 'sizesType' },
    languages: {
      EN: {
        label: 'Sizes options',
      },
      FR: {
        label: 'Options des choix',
      }
    },
  },
  Provider: {
    size: [12, 6, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    options: {
      EN: Object.values(providers.list).map((val) => `${val.name}`),
      FR: Object.values(providers.list).map((val) => `${val.name}`),
    },
    justify: 'center',
    pathData: { 0: 'Provider' },
    languages: {
      EN: {
        label: 'Provider',
      },
      FR: {
        label: 'Fournisseur',
      }
    },
  },
  Homologation: {
    size: [12, 6, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: countriesEN.map((val) => val.title),
      FR: countriesEN.map((val) => val.title),
    },
    justify: 'center',
    pathData: { 0: 'Homologation' },
    languages: {
      EN: {
        label: 'homologation',
      },
      FR: {
        label: 'homologation',
      }
    },
  },
  packageSize: {
    size: [12, 12, 12, 12, 12],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(typeDelivery).map((val) => ({ title: val, value: val })),
      FR: Object.keys(typeDelivery).map((val) => ({ title: val, value: val })),
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'delivery package size',
      },
      FR: {
        label: 'taille du colis de livraison',
      }
    },
  },
});

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

export default types;
