const bcrypt = require('bcrypt');
const EmailCtrl = require('../assets/email/mailCrtl');
const getPublicKeyNameFun = require('./getPublicKeyNameFun');
const mailCheckout = require('./mail/checkout_mail');
const dirmane = require('../dirname');

const checkout = async (io, socket, data, users, publicsKeyJson, database) => {
  const [room] = getPublicKeyNameFun(io, socket);
  if (room) {
    const publickeyData = await publicsKeyJson.get(room);
    const newProfileInfo = await users.get(publickeyData.login);
    const updatedProfileInfo = {
      ...newProfileInfo,
      registered: true,
      billings: { [data.key]: data.value, ...newProfileInfo.billings },
      cartItems: {},
    };
    await users.set(`${publickeyData.login}`, updatedProfileInfo);
    await publicsKeyJson.set(`${room}.ageUpdate`, new Date());

    const newOrder = {
      // ...data.value,
      status: 'reception',
      idBilling: data?.value?.idBilling,
      dateOrder: new Date(),
      user: publickeyData.login,
      pay: data?.value?.payment.pay,
      payCode: data?.value?.payment?.payCode,
      payService: data?.value?.payment?.payService,
      payDate: data?.value?.payment?.payDate,
      payDescription: data?.value?.payment?.description
    };

    await database.ordersJSON.set(`list.${newOrder?.idBilling}`, { ...newOrder });

    io.to(room).emit('dispatch', { state: 'profilInfo', value: updatedProfileInfo }); // publicsKey[room].profilInfo
    // Billing number
    // Order date
    // estimate delivery data
    // Name
    // Address
    // Email

    // const message = mailCheckout({ data: await data, userId: await publickeyData.login });

    const mailData = await data;
    const objMail = {
      key: await mailData.key,
      value: {
        ...await mailData.value,
        products: await mailData.value.products
      }
    };

    // console.log(JSON.stringify(objMail));

    const resultsMail = await EmailCtrl.sendEmail({
      email: newProfileInfo.email, // <- adresse e-mail de l'utilisateur
      subject: `Facture N° ${data.key}`,
      // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
      message: mailCheckout({ data: objMail, userId: publickeyData.login }), // mailCheckout({ })
      // attachements: [
      //   ...data.value.products.map((val, i) => ({
      //     filename: val.photo,
      //     path: `${dirmane}/public${val.photo}`,
      //     cid: val.photo
      //   }))
      // ]
    });

    console.log(resultsMail, 'resultMail');
  }
};

module.exports = checkout;
