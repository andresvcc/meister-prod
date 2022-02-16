import register from '@/assets/img/register.jpeg';
import login from '@/assets/img/Meister_paralax_img_mobile.png';
import lock from '@/assets/img/lock.jpeg';
import error from '@/assets/img/clint-mckoy.jpg';
import pricing from '@/assets/img/bg-pricing.jpeg';
import admin from '@/assets/img/bg-admin.jpg';
import pilot from '@/assets/img/pilot_img.png';
import journal from '@/assets/img/about_meister_1.jpg';

const getBgImage = (route) => {
  if (route === '/') {
    return login;
  } if (route === '/Pilot') {
    return pilot;
  } if (route === '/journal') {
    return journal;
  } if (route.indexOf('/auth/register-page') !== -1) {
    return register;
  } if (route.indexOf('/auth/login-page') !== -1) {
    return login;
  } if (route.indexOf('/auth/pricing-page') !== -1) {
    return pricing;
  } if (route.indexOf('/auth/lock-screen-page') !== -1) {
    return lock;
  } if (route.indexOf('/Document') !== -1) {
    return admin;
  } if (route.indexOf('/auth/error-page') !== -1) {
    return error;
  }
  return error;
};

export default getBgImage;
