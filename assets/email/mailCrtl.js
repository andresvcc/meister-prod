/** ******************************************************
    mailCrtl
******************************************************** */
const nodemailer = require('nodemailer');

/*
la fonction sendEmail envoie un e-mail à une adresse e-mail utilisando el modulo nodemailer (https://www.npmjs.com/package/nodemailer);
example d'usabilité:

    let resultsMail = await EmailCtrl.sendEmail({
        email:'destinataire@mail.com',
        subject:'subject du mail',
        message:'texte du message'
    })

Il est possible d'utiliser HTML dans le message et
d'utiliser css, mais évitez le javascript dans le corps
du message.
*/

const senderMail = 'norelpy@meister-engineering.ch';
const pass = 'Pass4MEISTER.2021';

exports.sendEmail = (data) => new Promise((resolve) => {
  // paramètres généraux du service de messagerie
  const transporter = nodemailer.createTransport({
    host: 'mail.infomaniak.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: senderMail,
      pass,
    },
  });

  // options d'expédition
  const mailOptions = {
    from: `"Meister" <${senderMail}>`, // sender address
    to: data.email, // list of receivers
    subject: data.subject, // Subject line
    html: data.message, // plain text body
    attachments: data.attachements
  };

  // opération d'expédition
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      resolve(err);
    } else {
      resolve(info);
    }
  });
});
