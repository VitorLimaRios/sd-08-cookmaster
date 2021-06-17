const multer = require('multer');
const { resolve } = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, resolve(__dirname,'..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  }
});
  
exports.upload = multer({ storage });




