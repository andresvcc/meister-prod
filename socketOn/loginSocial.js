const bcrypt = require('bcrypt');
const getPublicKeyNameFun = require('./getPublicKeyNameFun');
const mailRegister = require('./mail/register_mail');
const EmailCtrl = require('../assets/email/mailCrtl');

const URL = 'https://meister-engineering.ch';

const encript = (myPlaintextPassword) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
});

const desEncript = (myPlaintextPassword, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

const register = async (io, socket, data, users, publicsKeyJson, validateCodes) => {
  const newUser = data;
  const idUser = `${newUser.userID}${newUser.provider}`.replace('.', '');
  const exist = await users.get(idUser);

  if (!exist) {
    const pass = await encript(newUser.email);
    const [publickey, elements] = getPublicKeyNameFun(io, socket);
    const newProfileInfo = await publicsKeyJson.get(`${publickey}.profilInfo`);
    const idNewUser = `${newUser.userID}${newUser.provider}`.replace('.', '');

    const code = Math.random().toString(36).slice(-10);
    const linkCode = `${URL}/validate/${code}`;
    await validateCodes.set(`${code}`, idNewUser);

    const dataSessionKey = await publicsKeyJson.get(publickey);

    const user = {
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
    };

    const fussionSession = {
      ...user,
      registered: true,
      currency: dataSessionKey.profilInfo.currency || 'USD',
      language: dataSessionKey.profilInfo.language || 'EN',
      countryTVA: dataSessionKey.profilInfo.countryTVA || 'CH',
      tva: dataSessionKey.profilInfo.tva || 0.077,
      cartItems: {
        ...dataSessionKey.profilInfo.cartItems,
        ...user.cartItems
      },
      addresses: {
        ...dataSessionKey.profilInfo.addresses,
        ...user.addresses
      },
      favorite: { ...dataSessionKey.profilInfo.favorite, ...user.favorite },
      viewed: { ...dataSessionKey.profilInfo.viewed, ...user.viewed },
      billings: { ...dataSessionKey.profilInfo.billings, ...user.billings },
    };

    await users.set(`${idNewUser}`, {
      ...fussionSession,
    });

    await socket.emit('loginRes', { ok: true, profilInfo: { ...fussionSession, password: null } });
    // const mailGenerator = mailRegister({ linkCode });
    const username = newUser.fname;
    const resultsMail = await EmailCtrl.sendEmail({
      email: newUser.email, // <- adresse e-mail de l'utilisateur
      subject: 'Inscription',
      // corps du message ...  vous ne pouvez pas utiliser javascript dans le corps mais css
      message: mailRegister({ linkCode, username })
    });
  } else {
    socket.emit('registreRes', { err: 'The userID already exists' });
  }
};

const login = async (io, socket, data, users, publicsKeyJson, validateCodes, ordersJSON) => {
  const loginUser = await data;
  const idUser = `${loginUser.userID}${loginUser.provider}`.replace('.', '');
  const user = await users.get(idUser);
  if (user && user.email) {
    const result = await desEncript(loginUser.email, user.password);
    if (result) {
      if (user.verified) {
        const [publickey, elements] = await getPublicKeyNameFun(io, socket);
        const dataSessionKey = await publicsKeyJson.get(publickey);
        const orders = ordersJSON.read();

        publicsKeyJson.set(publickey, {
          age: dataSessionKey.age,
          ageUpdate: new Date(),
          sessions: elements,
          login: idUser,
        });

        const fussionSession = {
          ...user,
          registered: true,
          currency: dataSessionKey?.profilInfo?.currency || user.currency || 'USD',
          language: dataSessionKey?.profilInfo?.language || user.language || 'EN',
          countryTVA: dataSessionKey?.profilInfo?.countryTVA || user.countryTVA || 'CH',
          tva: dataSessionKey?.profilInfo?.tva || user.tva || 0.077,
          cartItems: {
            ...dataSessionKey?.profilInfo?.cartItems,
            ...user?.cartItems
          },
          addresses: {
            ...dataSessionKey?.profilInfo?.addresses,
            ...user?.addresses
          },
          favorite: { ...dataSessionKey?.profilInfo?.favorite, ...user?.favorite },
          viewed: { ...dataSessionKey?.profilInfo?.viewed, ...user?.viewed },
          billings: { ...dataSessionKey?.profilInfo?.billings, ...user?.billings },
          orders: [...Object.keys({ ...user?.billings }).map((billingID) => ({ [billingID]: orders.list[billingID] })), {}, {}].reduce((a, b) => ({ ...a, ...b }))
        };

        await users.set(idUser, fussionSession);
        // const newProfileInfo = publicsKeyJson.get(`${publickey}.profilInfo`);
        // const updatedProfileInfo = { ...newProfileInfo, ...data.value };
        await io.to(publickey).emit('dispatch', { state: 'profilInfo', value: { ...fussionSession, password: null } });
        await socket.emit('loginRes', { ok: true, profilInfo: { ...fussionSession, password: null } });
      } else {
        socket.emit('loginRes', { err: 'Your userID or email does not exist 1' });
      }
    } else {
      socket.emit('loginRes', { err: 'Your userID or email does not exist 2' });
    }
  } else {
    register(io, socket, data, users, publicsKeyJson, validateCodes);
  }
};

module.exports = login;
