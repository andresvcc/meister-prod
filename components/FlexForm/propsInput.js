/* eslint-disable no-useless-escape */
import countriesEN from '@/assets/dataBase/DBCountriesEN';
import countriesFR from '@/assets/dataBase/DBCountriesFR';

const FormsTypes = {
  fname: {
    size: [12, 12, 6, 6, 6],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'First name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      },
      FR: {
        label: 'First name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['lname']
  },
  fname2: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'First name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      },
      FR: {
        label: 'First name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['lname']
  },
  lname2: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Last name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid last name',
        info3: 'Correcly filled ',
        info4: 'Last name is required'
      },
      FR: {
        label: 'Last name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid last name',
        info3: 'Correcly filled ',
        info4: 'Last name is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['fname']
  },
  lname: {
    size: [12, 12, 6, 6, 6],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Last name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid last name',
        info3: 'Correcly filled ',
        info4: 'Last name is required'
      },
      FR: {
        label: 'Last name',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid last name',
        info3: 'Correcly filled ',
        info4: 'Last name is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
    binding: ['fname']
  },
  address1: {
    size: [12, 7, 7, 7, 7],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Address',
        info1: 'The address should have at least 8 letters',
        info2: 'Invalid address',
        info3: 'Correcly filled',
        info4: 'Address is required'
      },
      FR: {
        label: 'Address',
        info1: 'The address should have at least 8 letters',
        info2: 'Invalid address',
        info3: 'Correcly filled',
        info4: 'Address is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{8,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },

  postal1: {
    size: [12, 5, 5, 5, 5],
    type: 'number',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Postal Code',
        info1: 'The postal code should have at least 4 numbers',
        info2: 'Invalid postal code',
        info3: 'Correcly filled',
        info4: 'At least 4 numbers'
      },
      FR: {
        label: 'Postal Code',
        info1: 'The postal code should have at least 4 numbers',
        info2: 'Invalid postal code',
        info3: 'Correcly filled',
        info4: 'Postal Code is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{4,}$)(?=.*[/^\d+$/]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },
  postal2: {
    size: [12, 5, 5, 5, 5],
    type: 'number',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Postal Code',
        info1: 'The postal code should have at least 4 numbers',
        info2: 'Invalid postal code',
        info3: 'Correcly filled',
        info4: 'At least 4 numbers'
      },
      FR: {
        label: 'Postal Code',
        info1: 'The postal code should have at least 4 numbers',
        info2: 'Invalid postal code',
        info3: 'Correcly filled',
        info4: 'Postal Code is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{4,}$)(?=.*[/^\d+$/]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },
  country1: {
    size: [12, 7, 7, 7, 7],
    type: 'autocomplet',
    required: true,
    options: {
      EN: countriesEN,
      FR: countriesFR
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Country',
        info3: 'Correcly filled',
        info4: 'Country is required'
      },
      FR: {
        label: 'Country',
        info3: 'Correcly filled',
        info4: 'Country is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{4,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },
  country2: {
    size: [12, 12, 12, 12, 12],
    type: 'autocomplet',
    required: true,
    options: {
      EN: countriesEN,
      FR: countriesFR
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Country',
        info3: 'Correcly filled',
        info4: 'Country is required'
      },
      FR: {
        label: 'Country',
        info3: 'Correcly filled',
        info4: 'Country is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{4,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },
  city1: {
    size: [12, 5, 5, 5, 5],
    type: 'text',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'City',
        info3: 'Correcly filled',
        info4: 'City is required'
      },
      FR: {
        label: 'City',
        info3: 'Correcly filled',
        info4: 'City is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{2,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },
  city2: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'City',
        info3: 'Correcly filled',
        info4: 'City is required'
      },
      FR: {
        label: 'City',
        info3: 'Correcly filled',
        info4: 'City is required'
      }
    },
    verify: (formData, currentValue) => [
      /(?=^.{2,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ],
  },
  commentaire: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    justify: 'center',
    required: false,
    languages: {
      EN: {
        label: 'Any comment ? ',
      },
      FR: {
        label: 'Any comment ? ',
      }
    }
  },
  motorcycle: {
    size: [12, 12, 12, 12, 12],
    type: 'text',
    readonly: 'true',
    justify: 'center',
    required: false,
    languages: {
      EN: {
        label: 'Motorcycle of interest',
      },
      FR: {
        label: 'Motorcycle of interest',
      }
    }
  },
  email: {
    size: [12, 12, 12, 12, 12],
    type: 'email',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Email address',
        info1: 'Email address is required',
        info2: 'Email address is valid',
        info3: 'Email address is not valid',
      },
      FR: {
        label: 'Email address',
        info1: 'Email address is required',
        info2: 'Email address is valid',
        info3: 'Email address is not valid',
      }
    },
    verify: (formData, currentValue) => [
      currentValue === '' ? { return: false, info: 'info1' } : /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(currentValue) ? { return: true, info: 'info2' } : { return: false, info: 'info3' },
    ]
  },

  password: {
    size: [12, 12, 12, 6, 6],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Password',
        info1: 'The password and confirm password are equal',
        info2: 'The password and confirm password are not equal',
        info3: 'More than 6 characters',
        info4: 'More than 6 characters are required',
        info5: 'At least one uppercase letter',
        info6: 'One uppercase letter is required',
        info7: 'More than 1 number',
        info8: '1 number is required'
      },
      FR: {
        label: 'Password',
        info1: 'The password and confirm password are equal',
        info2: 'The password and confirm password are not equal',
        info3: 'More than 6 characters',
        info4: 'More than 6 characters are required',
        info5: 'At least one uppercase letter',
        info6: 'One uppercase letter is required',
        info7: 'More than 1 number',
        info8: '1 number is required'
      }
    },
    verify: (formData, currentValue) => [
      formData.passwordConfirm ? (formData.passwordConfirm === currentValue && currentValue !== '' ? { return: true, info: 'info1' } : { return: false, info: 'info2', }) : { return: false, info: 'info2', },
      /(?=^.{6,}$)/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
      /(?=^.{1,}$)(?=.*[A-Z]).*/.test(currentValue) ? { return: true, info: 'info5' } : { return: false, info: 'info6' },
      /(?=^.{1,}$)(?=.*[0-9]).*/.test(currentValue) ? { return: true, info: 'info7' } : { return: false, info: 'info8' },
    ],
    binding: ['passwordConfirm']
  },
  passwordConfirm: {
    size: [12, 12, 12, 6, 6],
    type: 'password',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Password confirmation',
      },
      FR: {
        label: 'Password confirmation',
      }
    },
    verify: (formData, currentValue) => [
      formData.password ? (formData.password === currentValue && currentValue !== '' ? { return: true, info: '', } : { return: false, info: '', }) : { return: false, info: '', },
      /(?=^.{6,}$)/.test(currentValue) ? { return: true, info: '', } : { return: false, info: '', },
      /(?=^.{1,}$)(?=.*[A-Z]).*/.test(currentValue) ? { return: true, info: '', } : { return: false, info: '', },
      /(?=^.{1,}$)(?=.*[0-9]).*/.test(currentValue) ? { return: true, info: '', } : { return: false, info: '', },
    ],
    binding: ['password']
  },
  telephone: {
    size: [12, 7, 7, 7, 7],
    type: 'telephone',
    justify: 'center',
    defaultCountry: 'CH',
    languages: {
      EN: {
        label: 'Telephone'
      },
      FR: {
        label: 'Telephone'
      }
    }
  },
  birthDate: {
    size: [12, 5, 5, 5, 5],
    type: 'date',
    justify: 'center',
    required: true,
    disableFuture: true,
    disablePast: false,
    languages: {
      EN: {
        label: 'Date of birth'
      },
      FR: {
        label: 'Date de naissance'
      }
    }
  },
  expiryDate: {
    size: [6, 6, 4, 4, 4],
    type: 'date',
    justify: 'center',
    required: true,
    disableFuture: false,
    disablePast: true,
    languages: {
      EN: {
        label: 'Expiration date'
      },
      FR: {
        label: "Date d'expiration"
      }
    }
  },
  poid: {
    size: [12, 12, 6, 6, 6],
    type: 'regex',
    regex: [/[0-9]/, /[0-9] || \, || \./, /[0-9] || \, || \./, /[0-9] || \, || \./, /[0-9] || \, || \./, /[0-9] || \, || \./, ' ', 'K', 'g'],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Regex EN'
      },
      FR: {
        label: 'Regex FR'
      }
    }
  },
  sex: {
    size: [8, 4, 4, 4, 4],
    type: 'option',
    required: true,
    options: {
      EN: [
        { title: 'Mr', value: 'male' },
        { title: 'Ms', value: 'female' },
        { title: 'Other', value: 'other' },
        { title: 'Not define', value: 'undefined' },
      ],
      FR: [
        { title: 'Homme', value: 'male' },
        { title: 'Femme', value: 'female' },
        { title: 'Autre', value: 'other' },
        { title: 'sans definir', value: 'undefined' },
      ]
    },
    justify: 'center',
    languages: {
      EN: {
        label: 'Sex'
      },
      FR: {
        label: 'Genre',
        info1: 'champ requis'
      }
    },
    verify: (formData, currentValue, dt) => [
      currentValue !== '' ? { return: true, info: '', ocult: true } : { return: false, info: 'info1', },
    ],
  },
  creditCard: {
    size: [12, 12, 5, 5, 5],
    type: 'regex',
    regex: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Credit card'
      },
      FR: {
        label: 'Carte de credit'
      }
    }
  },
  cvv: {
    size: [5, 5, 3, 3, 3],
    type: 'regex',
    regex: [/[0-9]/, /\d/, /\d/],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'CVV'
      },
      FR: {
        label: 'CVV'
      }
    }
  },
};

const propsInputGenerator = (FormsTypes, {
  id, variant, language, onChange, formData, currentIDChange,
}) => ({
  num: FormsTypes[id] ? FormsTypes[id].size : [12, 12, 12, 12, 12],
  variant,
  formData,
  id,
  currentIDChange,
  onChange,
  infoText: FormsTypes[id] ? FormsTypes[id].languages[language] : {},
  data: {
    label: FormsTypes[id] ? FormsTypes[id].languages[language].label : id,
    type: id.indexOf('empty') !== -1 ? id : FormsTypes[id]
      ? FormsTypes[id].type
      : 'text',
    required: FormsTypes[id] ? FormsTypes[id].required : false,
    ...(FormsTypes[id] ? {
      ...(FormsTypes[id].options ? { options: FormsTypes[id].options[language] } : {}),
      ...(FormsTypes[id].pathData ? { pathData: FormsTypes[id].pathData } : {}),
      ...(FormsTypes[id].defaultCountry ? { defaultCountry: FormsTypes[id].defaultCountry } : {}),
      ...(FormsTypes[id].link ? { link: FormsTypes[id].link } : {}),
      ...(FormsTypes[id].regex ? { regex: FormsTypes[id].regex } : {}),
      ...(FormsTypes[id].labelPlacement ? { labelPlacement: FormsTypes[id].labelPlacement } : {}),
      ...(FormsTypes[id].languages[language].linkLabel ? { linkLabel: FormsTypes[id].languages[language].linkLabel } : {}),
      ...(FormsTypes[id].verify ? { verify: FormsTypes[id].verify } : {}),
      ...(FormsTypes[id].binding ? { binding: FormsTypes[id].binding } : {}),
      ...(FormsTypes[id].disableFuture ? { disableFuture: FormsTypes[id].disableFuture } : {}),
      ...(FormsTypes[id].disablePast ? { disablePast: FormsTypes[id].disablePast } : {}),
      ...(FormsTypes[id].auto ? { auto: FormsTypes[id].auto } : {}),
      ...(FormsTypes[id].addPlus ? { addPlus: FormsTypes[id].addPlus } : {}),
      ...(FormsTypes[id].disable ? { disable: FormsTypes[id].disable } : {}),
      ...(FormsTypes[id].multiline ? { multiline: FormsTypes[id].multiline } : {}),
      ...(FormsTypes[id].rows ? { rows: FormsTypes[id].rows } : {}),
    } : {})
  },
});

export { FormsTypes, propsInputGenerator };
