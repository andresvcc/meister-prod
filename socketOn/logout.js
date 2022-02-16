const getPublicKeyNameFun = require('./getPublicKeyNameFun');

const logout = (io, socket, publicsKeyJson, data) => {
  const [publickey, elements] = getPublicKeyNameFun(io, socket);

  const now = new Date();

  const profilInfo = {
    registered: false,
    cartItems: {},
    favorite: {},
    viewed: {},
    marketing: {},
    addresses: {},
    orders: {},
    billings: {},
    currency: data.currency ?? 'CHF',
    language: data.language ?? 'EN',
    countryTVA: data.countryTVA ?? 'CH',
    tva: data.tva ?? 0.077,
  };

  publicsKeyJson.set(publickey, {
    age: now,
    ageUpdate: now,
    sessions: elements,
    profilInfo
  });

  io.to(publickey).emit('dispatch', { state: 'sessions', value: { taps: elements, age: now, ageUpdate: now } }); // publicsKey[newKey]
  io.to(publickey).emit('dispatch', { state: 'profilInfo', value: profilInfo });
  socket.emit('logoutRes', { ok: true });
};

module.exports = logout;
