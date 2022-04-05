import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { redux } from 'component';
import axios from 'axios';
import CurrencyMobile from '@/components/iconsButtons/CurrencyMobile';
import ProfilMobile from '@/components/iconsButtons/profilMobile';
import Currency from '@/components/iconsButtons/Currency';
import Profile from '@/components/iconsButtons/Profile2';
import CartMobile from '@/components/iconsButtons/CartMobile';
import Country from '@/components/iconsButtons/Country';
import Cart from '@/components/iconsButtons/Cart';

function getGeoInfo(fn) {
  axios.get('https://ipapi.co/json/').then((response) => {
    const { data } = response;
    fn(data);
  }).catch((error) => {

  });
}

const Icons = memo(({ useSocketHook }) => {
  const [{ dialogBag = 'false' }] = redux();
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
    <div
      className="alignCenter"
      style={{
        position: 'relative', zIndex: dialogBag === 'true' ? 1 : 0, top: -12, left: 10
      }}
    >
      <CurrencyMobile country={country} />
      <Currency />
      <ProfilMobile useSocketHook={useSocketHook} socialLogin={socialLogin} setSocialLogin={setSocialLogin} />
      <CartMobile />
    </div>
  );
});

Icons.propTypes = {};

export default Icons;
