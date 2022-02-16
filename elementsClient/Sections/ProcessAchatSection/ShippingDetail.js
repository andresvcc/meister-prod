import React, { useState, useEffect } from 'react';
// components
import { Div, redux, hookDeviceInfo } from 'components';
// elements
import AddBillingDeliveryAddress from 'elementsClient/Forms/addBillingDeliveryAddress';
import Radio from '@material-ui/core/Radio'; // temporaire pour le lab
import { useRouter } from 'next/router';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Collapse from '@material-ui/core/Collapse';
import GridContainer from '@/components/Grid/GridContainer';
import Spam from '@/components/Typography/Spam';

function NewAddressSection(props) {
  const { title, address, postal } = props;
  const [{ profilInfo }, dispatch] = redux();
  const { addresses = {} } = profilInfo;
  const router = useRouter();
  const addressListKey = Object.keys(addresses);
  const [selected, setSelected] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openFormBilling, setOpenFormBilling] = useState(true);
  const [loading, setLoading] = useState(false);
  const { width } = hookDeviceInfo();

  const AddAdresse = async (data) => {
    const temp = {
      fname: data.fname,
      lname: data.lname,
      address: data.address1,
      zipCode: data.postal1,
      zipArea: data.city1,
      country: data.country1,
    };

    setSelected(`${data.fname}${data.lname}${data.address1}${data.postal1}`);
    await dispatch({
      state: 'profilInfo',
      value: {
        selectedDelivery: `${data.fname}${data.lname}${data.address1}${data.postal1}`,
        ...profilInfo.selectedDelivery === profilInfo.selectedBilling ? { selectedBilling: `${data.fname}${data.lname}${data.address1}${data.postal1}` } : {},
        addresses: {
          ...addresses,
          [`${data.fname}${data.lname}${data.address1}${data.postal1}`]: temp,
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

  const addAddressForm = () => {
    setOpenForm(!openForm);
  };

  const handleChange = (event) => {
    setOpenFormBilling(!openFormBilling);
    setLoading(true);
    dispatch({
      state: 'profilInfo',
      value: {
        selectedDelivery: event.target.value,
        ...profilInfo.selectedDelivery === profilInfo.selectedBilling ? { selectedBilling: event.target.value } : {}
      }
    });
    setSelected(event.target.value);
  };

  const deliveryAddress = addresses[profilInfo.selectedDelivery] || {};

  useEffect(() => { setLoading(false); }, [profilInfo]);

  return (
    <Div width={['100%', '100%', '95%', '95%', '95%']} style={{ backgroundColor: 'white' }}>

      <Div width="100%" style={{ backgroundColor: 'white' }}>
        <GridContainer spacing={1}>
          <Div width="100%" height="50px" row style={{ borderBottom: '1px solid #00000040', paddingTop: '3px' }}>
            <Div width="45%" horizontal="left">
              {
                width < 400
                  ? (
                    <Spam type="shipPayInfo_2">
                      Shipping Details
                    </Spam>
                  ) : (
                    <Spam type="shipPayInfo">
                      Shipping Details
                    </Spam>
                  )
              }

            </Div>
            <Div width="45%" horizontal="right" onClick={() => setOpenFormBilling(!openFormBilling)}>
              {
                deliveryAddress.address ? (
                  <Spam type="subtitle3">
                    Edit
                  </Spam>
                ) : null
              }
            </Div>
          </Div>
          <Div width="100%">
            {
              openFormBilling && deliveryAddress.address ? (
                loading ? (
                  <Div
                    row
                    height="60px"
                    width="100%"
                    style={{ paddingTop: '20px' }}
                  >
                    <p>loading...</p>
                  </Div>
                ) : (
                  <Div
                    row
                    width="100%"
                    style={{ paddingTop: width < 400 ? '0px' : '5px' }}
                  >
                    <Div width="100%">
                      <Div
                        row
                        width={['95%', '95%', '92%', '92%', '92%']}
                      >
                        <Div style={{ paddingBottom: width < 400 ? '43px' : '45px' }}>
                          <Radio
                            size="small"
                            style={{ color: '#2B5878', }}
                      // onClick={BillingForm}
                            checked
                            onClick={() => setOpenFormBilling(!openFormBilling)}
                          />
                        </Div>
                        <Div width="90%" horizontal="left" style={{ paddingTop: '10px' }}>
                          <Spam type="checkOut">
                            {`${deliveryAddress.fname} ${deliveryAddress.lname}`}
                          </Spam>
                          <Spam type="checkOut">
                            {`${deliveryAddress.address} ${deliveryAddress.zipCode}`}
                          </Spam>
                          <Spam type="checkOut">
                            {` ${deliveryAddress.zipArea} ${deliveryAddress.country}`}
                          </Spam>
                        </Div>
                        <Div width="10%" horizontal="right" />
                      </Div>
                    </Div>
                  </Div>
                )
              ) : null
            }

            <Collapse in={!openFormBilling || !deliveryAddress.address} timeout="auto" unmountOnExit style={{ width: '100%' }} number={300}>
              {!loading ? (
                <Div width="100%">
                  <Div width="100%">
                    {
                      addressListKey.map((val, i) => {
                        const addressesBilli = addresses[val];
                        return (
                          <Div width="100%" key={`${i + 1}`}>
                            <Div
                              row
                              height="100px"
                              width="90%"
                              style={{ borderBottom: '1px solid #00000020' }}
                            >
                              <Div style={{ paddingBottom: '55px' }}>
                                <Radio
                                  size="small"
                                  style={{ color: '#2B5878' }}
                                  onClick={handleChange}
                                  // checked={selected === `${val}`}
                                  value={`${val}`}
                                />
                              </Div>
                              <Div width="90%" horizontal="left" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                <Spam type="checkOut">
                                  {`${addressesBilli.fname} ${addressesBilli.lname}`}
                                </Spam>
                                <Spam type="checkOut">
                                  {`${addressesBilli.address}, ${addressesBilli.zipCode}`}
                                </Spam>
                                <Spam type="checkOut">
                                  {` ${addressesBilli.zipArea}, ${addressesBilli.country}`}
                                </Spam>
                              </Div>
                              <Div onClick={() => delAddress(val)} width="10%" vertical="top" height="70px" horizontal="right">
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
                      height="90px"
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
                          <Spam type="checkOut">Add a new address</Spam>
                        </Div>
                      </Div>
                    </Div>

                    {openForm ? (
                      <Div width="100%">
                        <Div height="20px" />
                        <AddBillingDeliveryAddress submit={AddAdresse} language="EN" />
                      </Div>
                    ) : <Div />}

                  </Div>
                </Div>

              ) : null}
            </Collapse>

            <Div height="30px" />
          </Div>
        </GridContainer>
      </Div>
    </Div>
  );
}
export default NewAddressSection;
