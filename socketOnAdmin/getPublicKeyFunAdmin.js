const chalk = require('chalk');
const dateNow = require('./dateNowAdmin');
const getPublicKeyNameFun = require('./getPublicKeyNameFunAdmin');

const now = () => {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const getPublicKeyFunAdmin = async (io, socket, _key_, publicsKeyJson, providersJson, database) => {
  const key = _key_;
  const currentPublicKey = await publicsKeyJson.get(key);

  const product = await database?.productJSON.read();
  const orders = await database?.ordersJSON.read();
  const sales = await database?.salesJSON.read();
  const billing = await database?.billingJSON.read();
  const users = await database?.users.read();
  const usersSessions = await database?.publicsKeyJson.read();
  const globalSettings = await database?.globalSettings.read();
  const articlesJournal = await database?.articlesJournal.read();
  const faqJournal = await database?.faqJournal.read();
  const providers = await providersJson?.read();

  const [publickey, elements] = getPublicKeyNameFun(io, socket);

  const {
    age, ageUpdate, adminProfilInfo
  } = publicsKeyJson.get(publickey);

  if (currentPublicKey !== undefined && adminProfilInfo !== undefined) {
    socket.join(key);
    await socket.emit('setPublicKey', key);

    console.log({ type: typeof key, value: `${JSON.stringify(key)}` });

    await publicsKeyJson.set(`${publickey}.ageUpdate`, new Date());
    await publicsKeyJson.set(`${publickey}.sessions`, elements);
    await publicsKeyJson.set(`${publickey}.adminProfilInfo.actions`, [...adminProfilInfo?.actions, `Register new pc ${now()}`]);

    await io.to(key).emit('dispatch', { state: 'sessions', value: { taps: elements, age, ageUpdate } });
    await io.to(key).emit('dispatch', { state: 'sales', value: sales });
    await io.to(key).emit('dispatch', { state: 'orders', value: orders });
    await io.to(key).emit('dispatch', { state: 'productList', value: product });
    await io.to(key).emit('dispatch', { state: 'billing', value: billing });
    await io.to(key).emit('dispatch', { state: 'globalSettings', value: globalSettings });
    await io.to(key).emit('dispatch', { state: 'users', value: users });
    await io.to(key).emit('dispatch', { state: 'usersSessions', value: usersSessions });
    await io.to(key).emit('dispatch', { state: 'articlesJournal', value: articlesJournal });
    await io.to(key).emit('dispatch', { state: 'faqJournal', value: faqJournal });
    await io.to(key).emit('dispatch', { state: 'providers', value: providers });
    await io.to(key).emit('dispatch', { state: 'adminProfilInfo', value: adminProfilInfo });

    console.log(`${dateNow()} ║ ⚡ sessions Admin ${chalk.blue(socket.id)} join exist AdminPublicsKey ${chalk.blue(key)}`);
  } else {
    const dateStartSession = new Date();
    const newData = {
      age: dateStartSession,
      ageUpdate: dateStartSession,
      sessions: [socket.id],
      adminProfilInfo: {
        statistiques: {},
        notifications: {},
        actions: [
          `firts connection ${now()}`
        ]
      }
    };

    publicsKeyJson.set(key, newData);
    // idSessionJson.set(`${socket.id}`, key);
    socket.join(key);
    socket.emit('setPublicKey', key);

    const {
      age, ageUpdate, adminProfilInfo
    } = publicsKeyJson.get(key);

    io.to(key).emit('dispatch', { state: 'sessions', value: { taps: [socket.id], age, ageUpdate } }); // publicsKey[key]
    io.to(key).emit('dispatch', { state: 'sales', value: sales });
    io.to(key).emit('dispatch', { state: 'orders', value: orders });
    io.to(key).emit('dispatch', { state: 'productList', value: product });
    io.to(key).emit('dispatch', { state: 'billing', value: billing });
    io.to(key).emit('dispatch', { state: 'globalSettings', value: globalSettings });
    io.to(key).emit('dispatch', { state: 'users', value: users });
    io.to(key).emit('dispatch', { state: 'usersSessions', value: usersSessions });
    io.to(key).emit('dispatch', { state: 'articlesJournal', value: articlesJournal });
    io.to(key).emit('dispatch', { state: 'faqJournal', value: faqJournal });
    io.to(key).emit('dispatch', { state: 'providers', value: providers });
    io.to(key).emit('dispatch', { state: 'adminProfilInfo', value: adminProfilInfo });
    console.log(`${dateNow()} ║ ⚡ sessions Admin ${chalk.blue(socket.id)} join new AdminPublicsKey ${chalk.blue(key)}`);
  }
};

module.exports = getPublicKeyFunAdmin;
