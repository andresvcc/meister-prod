import React, { useState, useEffect } from 'react';
// components
import { Div, redux } from 'components';
import Spam from '@/components/Typography/Spam';
// elements
import GridContainer from '@/components/Grid/GridContainer';
import Radio from '@material-ui/core/Radio'; // temporaire pour le lab
import { useRouter } from 'next/router';

function NewAddressSection(props) {
  const { title, address, postal } = props;
  const [{ profilInfo }, dispatch] = redux();
  const { addresses = {} } = profilInfo;
  const router = useRouter();
  const addressListKey = Object.keys(addresses);
  const [selected, setSelected] = useState('');
  const [openForm, setOpenForm] = useState(false);
  //
  const submit = async (data) => {
    const temp = {
      fname: data.fname,
      lname: data.lname,
      addresss: data.address,
      zipCode: data.zipCode,
      zipArea: data.zipArea,
      countries: data.countries,
    };
    
    setSelected(`${data.fname}${data.lname}${data.addresss}${data.zipCode}`);
    await dispatch({
      state: 'profilInfo',
      value: {
        selectedDelivery: `${data.fname}${data.lname}${data.addresss}${data.zipCode}`,
        ...data.identical ? { selectedBilling: `${data.fname}${data.lname}${data.addresss}${data.zipCode}` } : {},
        addresses: {
          ...addresses,
          [`${data.fname}${data.lname}${data.addresss}${data.zipCode}`]: temp,
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

  const goTo = () => {
    router.push({
      pathname: '/checkout/step2',
    });
  };

  // si identical as billing dispatch billing
  const sel = profilInfo.selectedDelivery;
  const selectedAddresss = profilInfo.addresses[sel] || '';
  
  return (
    <Div width="95%" style={{ backgroundColor: 'white' }}>
      <GridContainer spacing={1}>
        <Div width="100%" height="60px" row style={{ borderBottom: '1px solid #00000040' }}>
          <Div width="45%" horizontal="left" height="30px">
            <Spam type="subtitle5">
              Shipping Details
            </Spam>
          </Div>
          <Div width="45%" horizontal="right" height="30px" onClick={() => goTo()}>
            <Spam type="subtitle3">
              Edit
            </Spam>
          </Div>
        </Div>
        <Div width="100%">

          <Div
            row
            height="60px"
            width="100%"
            style={{ paddingTop: '20px' }}
          >
            <Radio
              size="small"
              style={{ color: '#2B5878' }}
                  // onClick={BillingForm}
              checked
            />
            <Div width="90%" horizontal="left">
              <Spam type="subtitle3">
                {`${selectedAddresss.fname} ${selectedAddresss.lname}`}
              </Spam>
              <Spam type="subtitle3">
                {`${selectedAddresss.addresss} ${selectedAddresss.zipCode} ${selectedAddresss.zipArea} ${selectedAddresss.countries}`}
              </Spam>
            </Div>

          </Div>
          <Div height="30px" />
        </Div>
      </GridContainer>
    </Div>
  );
}
export default NewAddressSection;
