import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';
import GridContainer from '@/components/Grid/GridContainer';
import Button from '@/components/CustomButtons/Button';
// elements
import AddBillingDeliveryAddress from 'elementsClient/Forms/addBillingDeliveryAddress';
// material ui
import Radio from '@material-ui/core/Radio'; // temporaire pour le lab
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const buttonStyle = {
  width: '90%',
  height: '40px'
};
// v

function NewAddressSection() {
  const [{ profilInfo }, dispatch] = redux();
  const { addresses = {} } = profilInfo;
  const router = useRouter();
  const addressListKey = Object.keys(addresses);
  const [selected, setSelected] = useState('');
  const [openForm, setOpenForm] = useState(false);

  const goTo = () => {
    router.push({
      pathname: '/checkout/step3',
    }).then(() => window.scrollTo(0, 0));
  };

  const submit = async (data) => {
    router.push({
      pathname: '/checkout/step3',
    });
    const temp = {
      fname: data.fname,
      lname: data.lname,
      addresss: data.address,
      zipCode: data.zipCode,
      zipArea: data.zipArea,
      countries: data.countries,
    };
    
    setSelected(`${data.fname}${data.lname}${data.address}${data.zipCode}`);
    await dispatch({
      state: 'profilInfo',
      value: {
        selectedDelivery: `${data.fname}${data.lname}${data.address}${data.zipCode}`,
        selectedBilling: `${data.fname}${data.lname}${data.address}${data.zipCode}`,
        addresses: {
          ...addresses,
          [`${data.fname}${data.lname}${data.address}${data.zipCode}`]: temp,
        }
      }
    });
  };

  const delAddress = async (val) => {
    const temp = addresses;
    delete temp[val];
    await dispatch({
      state: 'profilInfo',
      value: {
        addresses: {
          ...temp,
        }
      }
    });
  };

  useEffect(() => { }, [profilInfo]);

  const addAddressForm = () => {
    setOpenForm(!openForm);
  };

  const handleChange = async (event) => {
    setSelected(event.target.value);
    await dispatch({
      state: 'profilInfo',
      value: {
        selectedDelivery: event.target.value,
      }
    });
  };

  return (
    <Div width="90%" style={{ backgroundColor: 'white' }}>
      <GridContainer spacing={1}>
        <Div width="100%" height="80px">
          <Div width="90%" horizontal="left" height="40px" style={{ borderBottom: '1px solid #00000040' }}>
            <Spam type="subtitle5">
              Shipping Details
            </Spam>
          </Div>
        </Div>
        <Div width="100%">

          {
            addressListKey.slice(0, 3).map((val, i) => {
              const addressesBilli = addresses[val];
              return (
                <Div width="100%" key={`${i + 1}`}>
                  <Div
                    row
                    height="70px"
                    width="90%"
                    style={{ borderBottom: '1px solid #00000020' }}
                  >
                    <Radio
                      size="small"
                      style={{ color: '#2B5878' }}
                      onClick={handleChange}
                      checked={selected === `${val}`}
                      value={`${val}`}
                    />
                    <Div width="90%" horizontal="left">
                      <Spam type="subtitle3">
                        {`${addressesBilli.fname} ${addressesBilli.lname}`}
                      </Spam>
                      <Spam type="subtitle3">
                        {`${addressesBilli.addresss} ${addressesBilli.zipCode} ${addressesBilli.zipArea} ${addressesBilli.countries}`}
                      </Spam>
                    </Div>
                    <Div onClick={() => delAddress(val)} width="10%" horizontal="right">
                      <DeleteOutlineIcon style={{ fontSize: '19px', color: '#2B5878' }} />
                    </Div>
                  </Div>
                </Div>
              );
            })
        }
        </Div>
        <Div width="100%">

          <Div
            height="70px"
            width="90%"
            style={{ borderBottom: '1px solid #00000020' }}
            horizontal="left"
            row
          >
            <Radio
              size="small"
              style={{ color: '#2B5878' }}
              onClick={addAddressForm}
              checked={selected === '1'}
              value="1"
            />
            <Div>
              <Div row width="100%">
                <Spam type="checkOut">Add a new saddress</Spam>
              </Div>
            </Div>

          </Div>

          {openForm ? (
            <Div>
              <Div height="20px" />
              <AddBillingDeliveryAddress submit={submit} />
            </Div>
          ) : <Div />}

          {!openForm ? (
            <Div width="100%" height="90px">
              {' '}
              {selected ? (
                <Button color="primary" style={buttonStyle} onClick={() => goTo()}>
                  Next
                </Button>
              ) : (
                <Button color="primary" style={buttonStyle}>
                  Next
                </Button>
              ) }

            </Div>
          ) : <Div />}
        </Div>

      </GridContainer>

    </Div>
  );
}
export default NewAddressSection;
