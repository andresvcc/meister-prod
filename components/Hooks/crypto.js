import { Crypt, RSA } from 'hybrid-crypto-js';

// Increase amount of entropy
const entropy = 'Random string, integer or float';
const crypt = new Crypt({ entropy });
const rsa = new RSA({ entropy });

const encrypt = (publicKey, data) => new Promise((resolve, reject) => {
  const encrypted = crypt.encrypt(publicKey, data, 'adminUser');
  resolve(encrypted);
});

const decrypt = (privatekey, data) => new Promise((resolve, reject) => {
  const decrypted = crypt.decrypt(privatekey, data);
  resolve(decrypted);
});

const generateKey = () => new Promise((resolve, reject) => {
  rsa.generateKeyPairAsync().then((keyPair) => {
    resolve(keyPair);
  });
});

export {
  generateKey,
  decrypt,
  encrypt
};
