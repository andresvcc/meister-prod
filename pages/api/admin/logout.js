const { withIronSession } = require('next-iron-session');

const editJsonFile = require('edit-json-file');

const keys = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/keys.json`, { autosave: true });

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
  await req.session.destroy();
  const login = await req.session.get('login');
  res.send({ ok: true, login });
});
