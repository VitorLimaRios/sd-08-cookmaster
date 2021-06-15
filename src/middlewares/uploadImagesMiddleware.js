const multer = require('multer');
const { resolve } = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => { 
    callback(null, resolve(__dirname, '..', 'uploads')); 
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });

module.exports = upload;