const editJsonFile = require('edit-json-file');

const { RSA } = require('hybrid-crypto-js');
const { Crypt } = require('hybrid-crypto-js');

// Increase amount of entropy
const entropy = 'Random string, integer or float';
const crypt = new Crypt({ entropy });
const rsa = new RSA({ entropy });

const encrypt = (publicKey, data) => new Promise((resolve, reject) => {
  const encrypted = crypt.encrypt(publicKey, data, 'adminUser');
  resolve(encrypted);
});

const decrypt = (data) => new Promise((resolve, reject) => {
  const keys = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/keys.json`, { autosave: true });
  const privateKey = keys.get('privateKey');
  const decrypted = crypt.decrypt(privateKey, data);
  resolve(decrypted);
});

const generateKey = () => new Promise((resolve, reject) => {
  rsa.generateKeyPairAsync().then((keyPair) => {
    resolve(keyPair);
  });
});

module.exports = {
  encrypt,
  decrypt,
  generateKey
};
