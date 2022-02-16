// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const asyncQuery = require('@/assets/mysql/com');

const cryptr = new Cryptr(process.env.SECRET);

const getKey = () => {
  const randomKey = `${Math.random().toString(36).substr(2, 6)}`.split('');
  const dateKey = `${Date.now().toString(36)}`;
  const isoMoOption = `${Math.random().toString(36).substr(2, 6)}`.split('').concat(['%', 'ç', '*', '+', '-', '_', '?', '!', '^', '(', ')', '']);
  const result = randomKey.map((val, i) => `${val}${isoMoOption[Math.floor(Math.random() * isoMoOption.length)]}`);
  return `${dateKey}${result.join('')}`;
};

const encript = (myPlaintextPassword) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(myPlaintextPassword, salt, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
});

export default async (req, res) => {
  const {
    fname, lname, username, email, pass, tel
  } = req.body;

  const verifiy = (fname && lname && email && pass && tel);

  if (verifiy) {
    const crypfname = cryptr.encrypt(fname);
    const cryplname = cryptr.encrypt(lname);
    const crypmail = cryptr.encrypt(email);
    const cryptel = cryptr.encrypt(tel);
    const crypKey = getKey();
    const crypPass = await encript(pass);
    const message = `INSERT INTO  usersAdmin (username, fname,lname,email,pass,tel,keycode) VALUES('${username}', '${crypfname}','${cryplname}','${crypmail}','${crypPass}','${cryptel}','${crypKey}');`;
    const rest = await asyncQuery(message);
    res.statusCode = 200;
    return res.json({
      status: !(rest.errno !== undefined), errno: rest.errno, code: rest.code
    });
  }

  res.json({ status: false, errno: 'IBV' });
};
