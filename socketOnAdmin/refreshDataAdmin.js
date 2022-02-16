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
  const currentPublicKey = publicsKeyJson.get(key);
  if (currentPublicKey !== undefined) {
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

    socket.emit('dispatch', { state: 'usersSessions', value: usersSessions });
    socket.emit('dispatch', { state: 'users', value: users });
    socket.emit('dispatch', { state: 'providers', value: providers });
    socket.emit('dispatch', { state: 'orders', value: orders });
    socket.emit('dispatch', { state: 'productList', value: product });
    socket.emit('dispatch', { state: 'billing', value: billing });
    socket.emit('dispatch', { state: 'globalSettings', value: globalSettings });
    socket.emit('dispatch', { state: 'articlesJournal', value: articlesJournal });
    socket.emit('dispatch', { state: 'faqJournal', value: faqJournal });
    socket.emit('dispatch', { state: 'sales', value: sales });
    socket.emit('refreshDataAdmin', { ok: true });
    console.log(`${dateNow()} ║ ↺ Admin ${chalk.blue(socket.id)} ${chalk.blue(key)} - refresh data`);
  }
};

module.exports = joinToPublicKeyAdmin;
