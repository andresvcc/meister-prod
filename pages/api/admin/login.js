const editJsonFile = require('edit-json-file');
const { withIronSession } = require('next-iron-session');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const asyncQuery = require('@/assets/mysql/com');
const { encrypt, decrypt, generateKey } = require('@/assets/crypto/crypto');

const cryptr = new Cryptr(process.env.SECRET);
const comparePassword = (myPlaintextPassword, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (err) reject(err);
    else resolve(result);
  });
});

function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'adminMeister',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}

export default withSession(async (req, res) => {
  const { data } = req.body;

  if (!data) res.send({ error: 'not Data Found' });

  const { message, signature } = await decrypt(data);
  const { username, password, telephone } = JSON.parse(message);

  if (!username || !telephone || !password) return res.send({ error: 'not found email, telephone or password' });

  const query = `SELECT fname, lname, pass, email, tel, keycode FROM usersAdmin WHERE username = '${username}'`;
  const rest = await asyncQuery(query);

  if (rest.length <= 0) return res.json({ error: 'incorrect data login 165' });

  const restFirst = rest[0];
  const passValidator = await comparePassword(password, restFirst.pass);
  const cTel = cryptr.decrypt(restFirst.tel);

  if (!(passValidator && cTel === telephone)) return res.json({ status: false, error: 'incorrect data login 206', cTel });

  const fname = cryptr.decrypt(restFirst.fname);
  const lname = cryptr.decrypt(restFirst.lname);
  const email = cryptr.decrypt(restFirst.email);
  const keycode = `${fname}${lname}${restFirst.keycode}`;

  req.session.set('login', {
    ageSession: new Date(), fname, lname, email, cTel, key: keycode
  });

  await req.session.save();

  res.statusCode = 200;
  res.json({
    login: true,
  });
});
