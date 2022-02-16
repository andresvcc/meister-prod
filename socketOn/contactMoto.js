const bcrypt = require('bcrypt');
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

// Envoie mail meister
/*
First name
Last name
Telephone
Email address
Address
ZipCode
Country
City
*/

const contactForm = async (io, socket, data, users, publicsKeyJson, validateCodes) => {
  const contactForm = data;

  const { fname } = contactForm;
  // const mailGenerator = mailRegister({ linkCode });

  const resultsMail = await EmailCtrl.sendEmail({
    email: 'alexiserne00@gmail.com', // <- adresse e-mail de Meister
    subject: 'Email de commande de Moto',
    // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
    message: `  <p>Nouvel email de: ${' '} ${data.fname} ${' '} ${data.lname} </p> </br>
    <p>Comande de moto de ${' '} ${data.motorcycle} </p> </br>
                <p>Numéro de Téléphone: ${' '} ${data.tel}</p> </br>
                <p>Address email: ${' '} ${data.email} </p> </br>
                <p>Address: ${' '} ${data.address1}</p> </br>
                <p>Pays: ${' '} ${data.country2}</p> </br>
                <p>Ville: ${' '} ${data.city2}</p> </br>
                <p>Code postal: ${' '} ${data.postal1}</p> </br>
                <p>Commentaire: ${' '} ${data.commentaire} `

  });
};
module.exports = contactForm;
