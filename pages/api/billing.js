const editJsonFile = require('edit-json-file');

const productJSON = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/users.json`, { autosave: true });

export default function handler(req, res) {
  const { billingID = '', userMail = '' } = req.body;

  if (billingID === '' || userMail === '') return res.status(200).json({ err: '402' });

  const readUser = productJSON.get(userMail);
  const billing = readUser?.billings[billingID];

  if (!billing) return res.status(200).json({ err: '404' });

  res.status(200).json({ billing });
}
