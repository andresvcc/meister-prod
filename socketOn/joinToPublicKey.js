const chalk = require('chalk');
const getPublicKeyNameFun = require('./getPublicKeyNameFun');
const dateNow = require('./dateNow');
const getPublicKeyFun = require('./getPublicKeyFun');

const getKey = () => {
  const randomKey = `${Math.random().toString(36).substr(2, 6)}`.split('');
  const dateKey = `${Date.now().toString(36)}`;
  const isoMoOption = `${Math.random().toString(36).substr(2, 6)}`.split('').concat(['%', 'ç', '*', '+', '-', '_', '?', '!', '^', '(', ')', '']);
  const result = randomKey.map((val, i) => `${val}${isoMoOption[Math.floor(Math.random() * isoMoOption.length)]}`);
  return `${dateKey}${result.join('')}`;
};

const joinToPublicKey = (
  io, socket, data, publicsKeyJson, users, products, articlesJournal, faqJournal, globalSettings
) => {
  socket.emit('dispatch', { state: 'productList', value: products });
  socket.emit('dispatch', { state: 'articlesJournal', value: articlesJournal });
  socket.emit('dispatch', { state: 'faqJournal', value: faqJournal });
  socket.emit('dispatch', { state: 'globalSettings', value: globalSettings });

  const [publickey, elements] = getPublicKeyNameFun(io, socket);
  if (!publickey) {
    const currentPublicKey = publicsKeyJson.get(data);
    if (currentPublicKey !== undefined) {
      socket.join(data);
      const [publickey, elements] = getPublicKeyNameFun(io, socket);
      publicsKeyJson.set(`${publickey}.ageUpdate`, new Date());
      publicsKeyJson.set(`${publickey}.sessions`, elements);
      const {
        age, ageUpdate, profilInfo, login
      } = publicsKeyJson.get(publickey);

      io.to(data).emit('dispatch', { state: 'sessions', value: { taps: elements, age, ageUpdate } });
      if (login) {
        const user = users.get(login);
        io.to(data).emit('dispatch', {
          state: 'profilInfo',
          value: {
            ...user, password: null, registered: true
          }
        });
      } else {
        io.to(data).emit('dispatch', { state: 'profilInfo', value: { ...profilInfo, registered: false } });
      }
      console.log(`${dateNow()} ║ ⚡ sessions ${chalk.blue(socket.id)} join publicsKey ${chalk.blue(data)}`);
    } else getPublicKeyFun(io, socket, publicsKeyJson);
  }
};

module.exports = joinToPublicKey;
