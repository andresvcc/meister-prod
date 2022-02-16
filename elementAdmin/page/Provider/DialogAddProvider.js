import React, { useState } from 'react';
import { Div, Button, redux } from 'component';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FlexForm from '@/components/FlexForm/FlexForm';
import countriesEN from '@/assets/dataBase/DBCountriesEN';
import countriesFR from '@/assets/dataBase/DBCountriesFR';

const types = {
  name: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Name of the enterprise',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      },
      FR: {
        label: 'Name of the enterprise',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ]
  },
  manager: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Name of the person in charge',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      },
      FR: {
        label: 'Nom de la personne responsable',
        info1: 'The name should have at least 3 letters',
        info2: 'Invalid first name',
        info3: 'Correcly filled',
        info4: 'First name is required'
      }
    },
    verify: (formData, currentValue) => [
      !(/([0-9])/.test(currentValue)) ? { return: true, info: 'info1', ocult: true } : { return: false, info: 'info2' },
      /(?=^.{3,}$)(?=.*[A-Za-z]).*/.test(currentValue) ? { return: true, info: 'info3' } : { return: false, info: 'info4' },
    ]
  },
  address: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    required: true,
    rows: 2,
    multiline: true,
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
      currentValue === '' ? { return: false, info: 'info1' } : /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(currentValue) ? { return: true, info: 'info2' } : { return: false, info: 'info3' },
    ]
  },
  iban: {
    size: [12, 12, 6, 6, 6],
    type: 'regex',
    regex: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'IBAN'
      },
      FR: {
        label: 'IBAN'
      }
    }
  },
  bic: {
    size: [12, 12, 6, 6, 6],
    type: 'email',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Bic',
      },
      FR: {
        label: 'Bic',
      }
    }
  },
  nif: {
    size: [12, 12, 6, 6, 6],
    type: 'email',
    justify: 'center',
    required: true,
    languages: {
      EN: {
        label: 'Nif',
      },
      FR: {
        label: 'Nif',
      }
    }
  },
  country: {
    size: [12, 6, 6, 6, 6],
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
    binding: ['city']
  },
  city: {
    size: [12, 6, 6, 6, 6],
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
    binding: ['country']
  },
  zip: {
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
  telephone: {
    size: [12, 7, 7, 7, 7],
    type: 'telephone',
    justify: 'center',
    defaultCountry: 'CH',
    languages: {
      EN: {
        label: 'Telephone',
      },
      FR: {
        label: 'Telephone'
      }
    },
  },
};

export default function AlertDialog({ addNew }) {
  const [open, setOpen] = React.useState(false);
  const formDataMaster = React.useState({});
  const [data, setData] = formDataMaster;
  const [errorsVerify, setErros] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    const verify = ['nif', 'name', 'manager', 'city', 'address', 'zip', 'telephone', 'email', 'iban', 'bic'];
    const results = verify.map((key) => data[key] !== undefined && data[key] !== '');
    const errors = !(results.reduce((a, b) => a && b));

    if (errors) {
      const selectErrors = verify.filter((val, i) => results[i] === false);
      if (selectErrors.length > 3) {
        setErros('Various fields are empty, you must fill them all in to finish.');
      } else {
        setErros(`The following fields are empty:  ${selectErrors.map((a) => `${a}`.toUpperCase()).join(', ')}`);
      }
    } else {
      addNew(data);
      setData({});
      setOpen(false);
    }
  };

  return (
    <>
      <Button round justIcon color="rose" onClick={handleClickOpen}>+</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add New Provider</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location.
          </DialogContentText>

          <Div width="100%">
            <FlexForm
              width="calc(100% + 40px)"
              title=""
              language="EN"
              variant="outlined"
              submitLabelLanguages={{ EN: 'Create an account', FR: 'Create an account' }}
              types={types}
              elements={['nif', 'name', 'manager', 'country', 'city', 'address', 'zip', 'telephone', 'email', 'iban', 'bic']}
              buttonChild={<div />}
              formDataMaster={formDataMaster}
            />
          </Div>

          <Div>
            <Div style={{ padding: '20px' }}>
              <DialogContentText id="alert-dialog-description">
                <span style={{ color: 'red', textAlign: 'center' }}>{`${errorsVerify}`}</span>
              </DialogContentText>
            </Div>
          </Div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="transparent">
            Cancel
          </Button>
          <Button onClick={submit} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
