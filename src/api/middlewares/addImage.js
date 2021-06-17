const multer = require('multer');
const path = require('path');

const imagesDir = path.resolve(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const err = new Error('It is not possible to upload to "uploads" dir');
    err.code = 'internal_error';
    callback(null, imagesDir);
  },
  filename: (req, file, callback) => {
    // const ext = file.originalname.split('.')[1];
    callback(null, `${req.recipe._id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = [upload.single('image'), (req, _res, next) => {
  const reqPath = path.join('localhost:3000', 'src', 'uploads');
  req.body = { image: path.join(reqPath, `${req.recipe._id}.jpeg`)  };
  next();
}];