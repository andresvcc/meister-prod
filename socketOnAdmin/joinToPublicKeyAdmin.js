const chalk = require('chalk');
const getPublicKeyNameFun = require('./getPublicKeyNameFunAdmin');
const dateNow = require('./dateNowAdmin');
const getPublicKeyFunAdmin = require('./getPublicKeyFunAdmin');

const now = () => {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const joinToPublicKeyAdmin = (
  io, socket, key, publicsKeyJson, providersJson, database
) => {
  const [publickey, elements] = getPublicKeyNameFun(io, socket);
  if (!publickey) {
    const currentPublicKey = publicsKeyJson.get(key);
    if (currentPublicKey !== undefined && key !== null) {
      socket.join(key);
      const [publickey, elements] = getPublicKeyNameFun(io, socket);
      publicsKeyJson.set(`${publickey}.ageUpdate`, new Date());
      publicsKeyJson.set(`${publickey}.sessions`, elements);

      const product = database?.productJSON.read();
      const orders = database?.ordersJSON.read();
      const sales = database?.salesJSON.read();
      const billing = database?.billingJSON.read();
      const users = database?.users.read();
      const usersSessions = database?.publicsKeyJson.read();
      const globalSettings = database?.globalSettings.read();
      const articlesJournal = database?.articlesJournal.read();
      const faqJournal = database?.faqJournal.read();
      const providers = providersJson.read();

      const {
        age, ageUpdate, adminProfilInfo
      } = publicsKeyJson.get(publickey);

      io.to(key).emit('dispatch', { state: 'sessions', value: { taps: elements, age, ageUpdate } });
      io.to(key).emit('dispatch', { state: 'adminProfilInfo', value: adminProfilInfo });
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
      console.log(`${dateNow()} ║ ⚡ sessions Admin ${chalk.blue(socket.id)} re-join exist AdminPublicsKey ${chalk.blue(key)}`);
    } else getPublicKeyFunAdmin(io, socket, key, publicsKeyJson);
  }
};

module.exports = joinToPublicKeyAdmin;
