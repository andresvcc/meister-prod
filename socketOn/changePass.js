const bcrypt = require('bcrypt');
const mailRegister = require('./mail/password_recovered');
const EmailCtrl = require('../assets/email/mailCrtl');
const getPublicKeyNameFun = require('./getPublicKeyNameFun');

const encript = (myPlaintextPassword) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
});

const register = async (io, socket, data, users, publicsKeyJson, validateCodes) => {
  const { code, password } = data;
  const userID = validateCodes.get(code);
  const user = await users.get(userID);

  if (user) {
    const pass = await encript(password);
    await validateCodes.set(code, undefined);

    await users.set(`${userID}.password`, pass);

    socket.emit('changeRes', { ok: true });

    // const mailGenerator = mailRegister({ linkCode });
    const username = user.fname;
    const resultsMail = await EmailCtrl.sendEmail({
      email: user.email, // <- adresse e-mail de l'utilisateur
      subject: 'Password recovery confirmation',
      // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
      message: mailRegister({ linkCode: 'pas de code', username })
    });

    console.log(resultsMail, 'resultMail');
  } else {
    socket.emit('registreRes', { err: 'The acount not exists' });
  }
};

module.exports = register;
