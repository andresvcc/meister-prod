/* eslint-disable newline-per-chained-call */
import {
  categories, brands, characteristics, providers, packageSizes, sizes
} from '@/assets/dataBase/BDCategories';

import countriesEN from '@/assets/dataBase/DBCountriesEN';
import countriesFR from '@/assets/dataBase/DBCountriesFR';

const types = (formData) => ({
  categorie: {
    size: [12, 4, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(categories).map((val) => ({ value: val, title: val })),
      FR: Object.keys(categories).map((val) => ({ value: val, title: val })),
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
    size: [12, 6, 6, 6, 6],
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
    size: [12, 6, 6, 6, 6],
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
    size: [12, 6, 6, 6, 6],
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
    size: [12, 4, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(categories[formData.categorie || 'Pilot']).map((val) => ({ value: val, title: val })),
      FR: Object.keys(categories[formData.categorie || 'Pilot']).map((val) => ({ value: val, title: val }))
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
    size: [12, 4, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(categories[formData.categorie || 'Pilot'][formData.subcategorie || 'Jackets'] || []).map((val) => ({ value: val, title: val })),
      FR: Object.keys(categories[formData.categorie || 'Pilot'][formData.subcategorie || 'Jackets'] || []).map((val) => ({ value: val, title: val })),
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
    size: [12, 6, 6, 6, 6],
    type: 'autocomplet',
    required: true,
    addPlus: true,
    options: {
      EN: Object.keys(brands).map((val) => ({ value: val, title: val })) || [],
      FR: Object.keys(brands).map((val) => ({ value: val, title: val })) || [],
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
    size: [12, 6, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: Object.keys(brands),
      FR: Object.keys(brands),
    },
    justify: 'center',
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
    size: [12, 6, 6, 6, 6],
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
    size: [12, 6, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    disable: !(formData.brandCompatibility && formData.brandCompatibility.length > 0),
    options: {
      EN: formData.brandCompatibility ? Object.keys(brands).filter((val) => formData.brandCompatibility.includes(val)).map((val) => brands[val]).flat().sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]) : [], // formData.brandCompatibility,
      FR: formData.brandCompatibility ? Object.keys(brands).filter((val) => formData.brandCompatibility.includes(val)).map((val) => brands[val]).flat().sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]) : []// formData.brandCompatibility,
    },
    justify: 'center',
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
    size: [12, 4, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: ['Post Suisse', 'DHL', 'FEDEX', 'Meister'],
      FR: ['Post Suisse', 'DHL', 'FEDEX', 'Meister'],
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Authorized delivery',
      },
      FR: {
        label: 'livraison autorisée',
      }
    },
  },
  prix: {
    size: [12, 3, 3, 3, 3],
    type: 'number',
    justify: 'center',
    required: true,
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
    size: [12, 2, 2, 2, 2],
    type: 'option',
    required: true,
    options: {
      EN: ['CHF', '$', '€', '£'].map((val) => ({ value: val, title: val })),
      FR: ['CHF', '$', '€', '£'].map((val) => ({ value: val, title: val })),
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
    size: [12, 6, 6, 6, 6],
    type: 'text',
    justify: 'center',
    required: true,
    multiline: true,
    rows: 5,
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
  details: {
    size: [12, 6, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    addPlus: true,
    options: {
      EN: ['Soft calfskin lining'],
      FR: ['Soft calfskin lining'],
    },
    justify: 'center',
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
    languages: {
      EN: {
        label: 'Great Description',
      },
      FR: {
        label: 'Superbe description',
      }
    },
  },
  model: {
    size: [12, 4, 4, 4, 4],
    type: 'autocomplet',
    required: true,
    addPlus: true,
    options: {
      EN: brands[formData.brand && formData.brand.title ? formData.brand.title : 'Meister'].map((val) => ({ value: val, title: val })) || [],
      FR: brands[formData.brand && formData.brand.title ? formData.brand.title : 'Meister'].map((val) => ({ value: val, title: val })) || [],
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Model',
      },
      FR: {
        label: 'Modèle',
      }
    },
  },
  characteristics: {
    size: [12, 4, 3, 3, 3],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(characteristics).map((val) => ({ value: val, title: val })) || [],
      FR: Object.keys(characteristics).map((val) => ({ value: val, title: val })) || [],
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'feature',
      },
      FR: {
        label: 'option',
      }
    },
  },
  sizeType: {
    size: [12, 4, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: Object.keys(sizes).map((val) => ({ value: sizes[val], title: val })) || [],
      FR: Object.keys(sizes).map((val) => ({ value: sizes[val], title: val })) || [],
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Size options',
      },
      FR: {
        label: 'Options des tailles',
      }
    },
  },
  Provider: {
    size: [12, 6, 6, 6, 6],
    type: 'autocompletMultiple',
    required: true,
    options: {
      EN: providers,
      FR: providers,
    },
    justify: 'center',
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
    size: [12, 6, 6, 6, 6],
    type: 'option',
    required: true,
    options: {
      EN: packageSizes.map((val) => ({ title: val, value: val })),
      FR: packageSizes.map((val) => ({ title: val, value: val })),
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
