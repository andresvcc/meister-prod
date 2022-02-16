const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${__dirname}/public/static/categorie/`);
  },
  filename(req, file, cb) {
    const random = Math.round(Math.random() * (900 - 100) + 100);
    const name = `${req.params.dynamicRoute}_${Date.now()}_${random + file.mimetype.replace('image/', '.')}`; // nom du fichie
    const photoName = cb(null, name);
    return photoName;
  }
});

const upload = multer({ storage }).array('file');

router

  .post('/:dynamicRoute', (req, res) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);

        // A Multer error occurred when uploading.
      } if (err) {
        console.log(err);
        return res.status(500).json(err);
        // An unknown error occurred when uploading.
      }

      return res.status(200).send(req.files);
      // Everything went fine.
    });
  });

module.exports = router;
