const bcrypt = require('bcrypt');
const getPublicKeyNameFun = require('./getPublicKeyNameFun');

const desEncript = (myPlaintextPassword, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

const login = async (io, socket, data, users, publicsKeyJson, ordersJSON) => {
  const loginUser = await data;
  const idUser = `${loginUser.email}`.replace('.', '');
  const user = await users.get(idUser);
  if (user && user.password) {
    const result = await desEncript(loginUser.password, user.password);
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
          currency: dataSessionKey.profilInfo.currency,
          language: dataSessionKey.profilInfo.language,
          countryTVA: dataSessionKey.profilInfo.countryTVA,
          tva: dataSessionKey.profilInfo.tva,
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
          orders: [...Object.keys({ ...user?.billings }).map((billingID) => ({ [billingID]: orders.list[billingID] })), {}, {}].reduce((a, b) => ({ ...a, ...b }))
        };

        await users.set(idUser, fussionSession);
        // const newProfileInfo = publicsKeyJson.get(`${publickey}.profilInfo`);
        // const updatedProfileInfo = { ...newProfileInfo, ...data.value };
        await io.to(publickey).emit('dispatch', { state: 'profilInfo', value: { ...fussionSession, password: null } });
        await socket.emit('loginRes', { ok: true, profilInfo: { ...fussionSession, password: null } });
      } else {
        socket.emit('loginRes', { err: 'Your account has not been validated, we have sent you a confirmation email' });
      }
    } else {
      socket.emit('loginRes', { err: 'Your password is incorrect or your email does not exist' });
    }
  } else {
    socket.emit('loginRes', { err: 'Your password is incorrect or your email does not exist' });
  }
};

module.exports = login;
