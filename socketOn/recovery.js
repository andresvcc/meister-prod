const bcrypt = require('bcrypt');
const mailRegister = require('./mail/forgot_pass_mail');
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
  const newUser = data;
  const exist = await users.get(`${newUser.email}`.replace('.', ''));

  if (exist) {
    const idNewUser = `${newUser.email}`.replace('.', '');

    const code = Math.random().toString(36).slice(-10);
    const linkCode = `${URL}/recovery/${code}`;
    await validateCodes.set(`${code}`, idNewUser);

    socket.emit('recoveryRes', { ok: true });
    console.log('Send Email', newUser.email);
    // const mailGenerator = mailRegister({ linkCode });
    const username = newUser.fname;
    const resultsMail = await EmailCtrl.sendEmail({
      email: newUser.email, // <- adresse e-mail de l'utilisateur
      subject: 'Password Recovery',
      // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
      message: mailRegister({ linkCode, username })
    });
    console.log(resultsMail, 'resultMail');
  } else {
    socket.emit('recoveryRes', { err: 'The email does not exists' });
  }
};

module.exports = register;
