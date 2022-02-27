import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

import { redux, Div } from 'components';
import axios from 'axios';
import Currency from '@/components/iconsButtons/Currency';
import Country from '@/components/iconsButtons/Country';
import Profile from '@/components/iconsButtons/Profile2';
import Cart from '@/components/iconsButtons/Cart';

function getGeoInfo(fn) {
  axios.get('https://ipapi.co/json/').then((response) => {
    const { data } = response;
    fn(data);
  }).catch((error) => {

  });
}

const Icons = memo(({ useSocketHook }) => {
  const [socialLogin, setSocialLogin] = useState();
  const [country, setCountry] = useState({ country: 'CH', currency: 'CHF' });

  useEffect(() => {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        window.FB.api(
          `/${response.authResponse.userID}?fields=name,email&access_token=${response.authResponse.accessToken}/`,
          (res) => {
            if (res && !res.error) {
              setSocialLogin({
                ...res, ...response.authResponse, status: response.status, provider: 'facebook'
              });
            }
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (socialLogin) {
      console.debug({ socialLogin });
    }
  }, [socialLogin]);

  useEffect(() => {
    getGeoInfo((data) => {
      setCountry({ country: data.country, currency: data.currency });
    });
  }, []);

  return (
    <div className="alignCenterDescktop" style={{ position: 'relative', zIndex: 1, top: -2 }}>
      <Country country={country} />
      <Profile useSocketHook={useSocketHook} socialLogin={socialLogin} setSocialLogin={setSocialLogin} />
      <Cart />
    </div>
  );
});

Icons.propTypes = {};

export default Icons;
