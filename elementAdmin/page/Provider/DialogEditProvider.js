import React, { useState, useEffect } from 'react';
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
    pathData: { 0: 'name' },
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
  },
  manager: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    pathData: { 0: 'manager' },
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
  },
  address: {
    size: [12, 12, 12, 12, 12],
    type: 'input',
    justify: 'center',
    rows: 2,
    multiline: true,
    pathData: { 0: 'address' },
    languages: {
      EN: {
        label: 'Address',
      },
      FR: {
        label: 'Address',
      }
    },
  },
  email: {
    size: [12, 12, 12, 12, 12],
    type: 'email',
    justify: 'center',
    pathData: { 0: 'email' },
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
  },
  iban: {
    size: [12, 12, 6, 6, 6],
    type: 'regex',
    regex: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, ' ', '-', ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    justify: 'center',
    pathData: { 0: 'iban' },
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
    pathData: { 0: 'bic' },
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
    pathData: { 0: 'nif' },
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
    options: {
      EN: countriesEN,
      FR: countriesFR
    },
    justify: 'center',
    pathData: { 0: 'country' },
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
    binding: ['city']
  },
  city: {
    size: [12, 6, 6, 6, 6],
    type: 'text',
    justify: 'center',
    pathData: { 0: 'city' },
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
    binding: ['country']
  },
  zip: {
    size: [12, 5, 5, 5, 5],
    type: 'number',
    justify: 'center',
    pathData: { 0: 'zip' },
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
  },
  telephone: {
    size: [12, 7, 7, 7, 7],
    type: 'telephone',
    justify: 'center',
    defaultCountry: 'CH',
    pathData: { 0: 'telephone' },
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

export default function AlertDialog({
  open: OpenOut, onConfirm, onCancel, provider
}) {
  const [open, setOpen] = React.useState(false);
  const formDataMaster = React.useState({ ...provider });
  const [data, setData] = formDataMaster;
  const [errorsVerify, setErros] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErros('');
    onCancel(false);
    setOpen(false);
  };

  const submit = () => {
    const verify = ['nif', 'name', 'manager', 'city', 'address', 'zip', 'telephone', 'email'];
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
      setErros('');
      onConfirm(data);
    }
  };

  useEffect(() => {
    setOpen(OpenOut);
    setData({ ...provider });
  }, [OpenOut]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Provider</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location.
          </DialogContentText>

          <Div width="100%">
            <Div width="100%" horizontal="left" style={{ marginBottom: '15px', fontSize: '19px', marginLeft: '15px' }}>
              <p>
                <span style={{ fontWeight: 'bold' }}>Nif:</span>
                &nbsp;&nbsp;
                {provider.nif}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Name:</span>
                &nbsp;&nbsp;
                {provider.name}
              </p>
            </Div>
            <FlexForm
              width="calc(100% + 40px)"
              title=""
              language="EN"
              variant="outlined"
              submitLabelLanguages={{ EN: 'Create an account', FR: 'Create an account' }}
              types={types}
              elements={['manager', 'country', 'city', 'address', 'zip', 'telephone', 'email', 'iban', 'bic']}
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
