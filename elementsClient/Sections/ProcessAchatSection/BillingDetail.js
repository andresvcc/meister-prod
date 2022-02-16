import React, { useState, useEffect } from 'react';
// components
import { Div, hookDeviceInfo, redux } from 'components';
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
  const [errorApiLogin, serErrorApiLogin] = useState([]);

  const submit = async (data) => {
    const temp = {
      fname: data.fname,
      lname: data.lname,
      address: data.address1,
      zipCode: data.postal1,
      zipArea: data.city1,
      country: data.country1,
    };
    if (data.fname && data.lname && data.address1 && data.postal1) {
      setSelected(`${data.fname}${data.lname}${data.address1}${data.postal1}`);
      await dispatch({
        state: 'profilInfo',
        value: {
          selectedBilling: `${data.fname}${data.lname}${data.address1}${data.postal1}`,
          addresses: {
            ...addresses,
            [`${data.fname}${data.lname}${data.address1}${data.postal1}`]: temp,
          }
        }
      });
    } else {
      const missingErrMsg = ['All the fields must be filled'];
      if (JSON.stringify(missingErrMsg) !== JSON.stringify(errorApiLogin)) serErrorApiLogin(missingErrMsg);
    }
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

  const BillingForm = () => {
    setLoading(true);
    dispatch({
      state: 'profilInfo',
      value: {
        selectedBilling: profilInfo.selectedDelivery,
      }
    });
    setOpenFormBilling(!openFormBilling);
  };

  const handleChange = (event) => {
    setLoading(true);
    dispatch({
      state: 'profilInfo',
      value: {
        selectedBilling: event.target.value,
      }
    });
    setSelected(event.target.value);
    setOpenFormBilling(!openFormBilling);
  };

  const billingAddress = addresses[profilInfo.selectedBilling] || {};

  useEffect(() => { setLoading(false); }, [profilInfo]);

  const ErrorMsg = ({ message, i }) => <Spam type="subtitle4" color="danger">{message}</Spam>;

  return (
    <Div width={['100%', '100%', '95%', '95%', '95%']} style={{ backgroundColor: 'white' }}>

      <Div width="100%" style={{ backgroundColor: 'white' }}>
        <GridContainer spacing={1}>
          <Div width="100%" height="50px" row style={{ borderBottom: '1px solid #00000040' }}>
            <Div width="45%" horizontal="left" height="30px">
              {
                width < 400
                  ? (
                    <Spam type="shipPayInfo_2">
                      Billing Details
                    </Spam>
                  ) : (
                    <Spam type="shipPayInfo">
                      Billing Details
                    </Spam>
                  )
              }
            </Div>
            <Div width="45%" horizontal="right" height="30px" onClick={() => setOpenFormBilling(!openFormBilling)}>
              <Spam type="subtitle3">
                Edit
              </Spam>
            </Div>
          </Div>
          <Div width="100%" vertical="top">
            {
              openFormBilling ? (
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
                    style={{ paddingTop: width < 400 ? '0px' : '20px' }}
                  >
                    <Div width="100%" style={{ paddingTop: '10px' }}>
                      <Div
                        row
                        width={['95%', '95%', '92%', '92%', '92%']}

                      >
                        <Div style={{ paddingBottom: width < 400 ? '45px' : '50px' }}>
                          <Radio
                            size="small"
                            style={{ color: '#2B5878', }}
                          // onClick={BillingForm}
                            checked
                            onClick={() => setOpenFormBilling(!openFormBilling)}
                          />
                        </Div>

                        {
                            profilInfo.selectedDelivery === profilInfo.selectedBilling ? (
                              <Div width="90%" horizontal="left" style={{ paddingBottom: width < 400 ? '45px' : '50px' }}>
                                <Spam type="checkOut">Identical to Shipping address</Spam>
                              </Div>
                            ) : (
                              <Div width="90%" horizontal="left">
                                <Spam type="checkOut">
                                  {`${billingAddress.fname} ${billingAddress.lname}`}
                                </Spam>
                                <Spam type="checkOut">
                                  {`${billingAddress.address}, ${billingAddress.zipCode}`}
                                </Spam>
                                <Spam type="checkOut">
                                  {` ${billingAddress.zipArea}, ${billingAddress.country}`}
                                </Spam>
                              </Div>
                            )
                        }
                        <Div width="10%" horizontal="right" />
                      </Div>
                    </Div>
                  </Div>
                )
              ) : null
            }

            <Collapse in={!openFormBilling} timeout="auto" unmountOnExit style={{ width: '100%' }}>
              {!loading ? (
                <Div width="100%">
                  <Div width="100%">
                    <Div width="100%">
                      <Div
                        row
                        height="55px"
                        width="90%"
                        style={{ borderBottom: '1px solid #00000020' }}
                      >
                        <Div>
                          <Radio
                            size="small"
                            style={{ color: '#2B5878' }}
                            onClick={BillingForm}
                          />
                        </Div>
                        <Div width="90%" horizontal="left">
                          <Spam type="checkOut">Use Shipping address for billing</Spam>
                        </Div>
                        <Div width="10%" horizontal="right" />
                      </Div>
                    </Div>
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
                              <Div width="90%" horizontal="left">
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
                          <Spam type="checkOut">Add a new address</Spam>
                        </Div>
                      </Div>
                    </Div>

                    {openForm ? (
                      <Div dev>
                        <Div height="20px" />
                        {errorApiLogin.map((val, i) => <ErrorMsg message={val} i={i} key={`${i + 1}`} />)}

                        <AddBillingDeliveryAddress submit={submit} />
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
