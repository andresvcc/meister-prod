import { withIronSession } from 'next-iron-session';
import { dencrypt } from '@/assets/crypto/crypto';

const editJsonFile = require('edit-json-file');

const productJSON = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/product.json`, { autosave: true });

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
  // verification login User
  const login = await req.session.get('login');
  if (login === undefined) return res.send('not admin user');

  const { product } = req.body;
  const decrypt = await dencrypt(product);
  const allProducts = productJSON.read();
  const lenght = Object.keys(allProducts).length;
  productJSON.set(`${lenght}`, decrypt);
  res.send({ lenght });
});
