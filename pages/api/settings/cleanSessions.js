const editJsonFile = require('edit-json-file');

const publicsKeysJSON = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/publicsKey.json`, { autosave: true });

export default async function handler(req, res) {
  const publicsKeys = publicsKeysJSON.read();

  const keys = Object.keys(publicsKeys);

  keys.forEach((key) => {
    publicsKeysJSON.unset(key);
  });

  const publicsKeysRes = publicsKeysJSON.read();
  publicsKeysJSON.save();

  res.status(200).json({ publicsKeysRes });
}
