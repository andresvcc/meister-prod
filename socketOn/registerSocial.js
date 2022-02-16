const bcrypt = require('bcrypt');
const mailRegister = require('./mail/register_mail');
const EmailCtrl = require('../assets/email/mailCrtl');
const getPublicKeyNameFun = require('./getPublicKeyNameFun');

const URL = 'https://meister-engineering.ch';

const encript = (myPlaintextPassword) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
});

const register = async (io, socket, data, users, publicsKeyJson, validateCodes) => {
  console.log('register', data);
  const newUser = data;
  const exist = await users.get(`${newUser.userID}`.replace('.', ''));

  if (!exist) {
    const pass = await encript(newUser.email);
    const [publickey, elements] = getPublicKeyNameFun(io, socket);
    const newProfileInfo = await publicsKeyJson.get(`${publickey}.profilInfo`);
    const idNewUser = `${newUser.userID}`.replace('.', '');

    const code = Math.random().toString(36).slice(-10);
    const linkCode = `${URL}/validate/${code}`;
    await validateCodes.set(`${code}`, idNewUser);

    await users.set(`${idNewUser}`, {
      verified: true,
      registered: true,
      lname: newUser.lname,
      fname: newUser.fname,
      email: newUser.email,
      password: pass,
      provider: newUser.provider,
      selectedDelivery: 0,
      selectedBilling: 0,
      cartItems: {},
      favorite: {},
      viewed: {},
      billings: {},
      marketing: {},
      orders: {},
      addresses: {},
    });

    socket.emit('registreRes', { ok: true });
    console.log('register', idNewUser);
    // console.log('Send Email', newUser.email);
    // // const mailGenerator = mailRegister({ linkCode });
    // const username = newUser.fname;
    // const resultsMail = await EmailCtrl.sendEmail({
    //   email: newUser.email, // <- adresse e-mail de l'utilisateur
    //   subject: 'Inscription',
    //   // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
    //   message: mailRegister({ linkCode, username })
    // });
    //
    // console.log(resultsMail, 'resultMail');
  } else {
    socket.emit('registreRes', { err: 'The email already exists' });
  }
};

module.exports = register;
