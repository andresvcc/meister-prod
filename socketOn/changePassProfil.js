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

const contactForm = async (io, socket, data, users, publicsKeyJson, validateCodes) => {
  const contactForm = data;

  const { fname } = contactForm;
  // const mailGenerator = mailRegister({ linkCode });

  const resultsMail = await EmailCtrl.sendEmail({
    email: 'alexiserne00@gmail.com', // <- adresse e-mail de Meister
    subject: 'Email de commande de Moto',
    // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
    message: '<p>test</p>'
  });
};
module.exports = contactForm;
