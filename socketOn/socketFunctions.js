const getPublicKeyNameFun = require('./getPublicKeyNameFun');
const dispatchFun = require('./dispatch');
const getPublicKeyFun = require('./getPublicKeyFun');
const joinToPublicKey = require('./joinToPublicKey');
const logout = require('./logout');
const login = require('./login');
const loginSocial = require('./loginSocial');
const register = require('./register');
const registerSocial = require('./registerSocial');
const dateNow = require('./dateNow');
const validate = require('./validate');
const checkout = require('./checkout');
const recovery = require('./recovery');
const changePass = require('./changePass');
const changePassProfil = require('./changePassProfil');
const contactMoto = require('./contactMoto');

module.exports = {
  getPublicKeyNameFun,
  dispatchFun,
  getPublicKeyFun,
  joinToPublicKey,
  logout,
  login,
  loginSocial,
  register,
  registerSocial,
  dateNow,
  validate,
  checkout,
  recovery,
  changePass,
  contactMoto,
  changePassProfil
};
