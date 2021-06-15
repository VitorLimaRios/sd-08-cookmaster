const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.recipe._id}.jpeg`);
  }
});

module.exports = multer({ storage });;
