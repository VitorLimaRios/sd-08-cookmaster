const multer = require('multer');
const { resolve } = require('path');

function uploadImage(){
  
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, resolve(__dirname,'..', 'uploads'));
    },
    filename: (req, _file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    }
  });

  const upload = multer({ storage });
  return upload.single('image');
}

module.exports = {
  uploadImage
};