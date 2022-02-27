const editJsonFile = require('edit-json-file');
const fs = require('fs');

const testFolder = `${process.env.ROOT}/public/static/products`;

const productJSON = editJsonFile(`${process.env.ROOT}/assets/JsonDBU/product.json`, { autosave: true });

function flatDeep(arr) {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
}

const getUnlinkFiles = () => new Promise((resolve, reject) => {
  try {
    const products = productJSON.read();

    const photos = flatDeep(Object.values(products).map((product) => product.colors.map((color) => color.photos))).filter((photo) => photo !== '').map((photo) => photo.split('/').pop());

    fs.readdir(testFolder, (err, files) => {
      const filters = files.filter((photo) => !photos.includes(photo));
      resolve(filters);
    });
  } catch (e) {
    reject(e);
  }
});

const unlinkPhoto = (filename) => new Promise((resolve, reject) => {
  try {
    const path = `${testFolder}/${filename}`;
    const res = fs.rmSync(path, {
      force: true,
    });
    resolve({ path, res });
  } catch (e) {
    reject(e);
  }
});

const unlinkLotPhotos = async (photos = []) => {
  const deleted = [];
  await photos.forEach(async (photo) => {
    const res = await unlinkPhoto(photo);
    deleted.push(res);
  });

  return deleted;
};

export default async function handler(req, res) {
  const unlinkPhotos = await getUnlinkFiles();
  const rest = await unlinkLotPhotos(unlinkPhotos);
  const suiteUnlinkPhotos = await getUnlinkFiles();
  res.status(200).json({ files: suiteUnlinkPhotos, rest });
}
