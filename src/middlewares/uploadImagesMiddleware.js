const multer = require('multer');
const { resolve } = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => { 
    callback(null, resolve(__dirname, '..', 'uploads')); 
  },
  filename: (req, file, callback) => {
    callback(null, req.params.id + '.jpeg');
  },
});

const upload = multer({ storage });

module.exports = upload;