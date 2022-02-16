const chalk = require('chalk');
const dateNow = require('./dateNow');

const getKey = () => {
  const randomKey = `${Math.random().toString(36).substr(2, 6)}`.split('');
  const dateKey = `${Date.now().toString(36)}`;
  const isoMoOption = `${Math.random().toString(36).substr(2, 6)}`.split('').concat(['%', 'ç', '*', '+', '-', '_', '?', '!', '^', '(', ')', '']);
  const result = randomKey.map((val, i) => `${val}${isoMoOption[Math.floor(Math.random() * isoMoOption.length)]}`);
  return `${dateKey}${result.join('')}`;
};

const getPublicKeyFun = (io, socket, publicsKeyJson, products, articlesJournal, faqJournal, globalSettings) => {
  const newKey = getKey();
  const dateStartSession = new Date();
  const newData = {
    age: dateStartSession,
    ageUpdate: dateStartSession,
    sessions: [socket.id],
    profilInfo: {
      currency: 'USD',
      language: 'EN',
      countryTVA: 'CH',
      tva: 0.077,
      registered: false,
      cartItems: {},
      addresses: {},
      billings: {},
      favorite: {},
      viewed: {},
      marketing: {},
      orders: {},
    }
  };

  publicsKeyJson.set(newKey, newData);
  // idSessionJson.set(`${socket.id}`, newKey);
  socket.join(newKey);
  socket.emit('setPublicKey', newKey);

  const {
    age, ageUpdate, profilInfo
  } = publicsKeyJson.get(newKey);

  io.to(newKey).emit('dispatch', { state: 'sessions', value: { taps: [socket.id], age, ageUpdate } }); // publicsKey[newKey]
  io.to(newKey).emit('dispatch', { state: 'productList', value: products });
  io.to(newKey).emit('dispatch', { state: 'articlesJournal', value: articlesJournal });
  io.to(newKey).emit('dispatch', { state: 'faqJournal', value: faqJournal });
  io.to(newKey).emit('dispatch', { state: 'globalSettings', value: globalSettings });
  io.to(newKey).emit('dispatch', { state: 'profilInfo', value: profilInfo });

  console.log(`${dateNow()} ║ ⚡ sessions ${chalk.blue(socket.id)} join new publicsKey ${chalk.blue(newKey)}`);
};

module.exports = getPublicKeyFun;
