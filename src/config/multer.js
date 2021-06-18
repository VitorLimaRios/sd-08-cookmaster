const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    const split = file.originalname.split('.');
    callback(null, `${req.params.id}.${split[1]}`);
  }
});

module.exports = multer({ storage });;