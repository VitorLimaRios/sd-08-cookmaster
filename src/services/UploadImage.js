const { resolve } = require('path');
const multer = require('multer');

const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, next) => {
      next(null, resolve(__dirname, '..', 'uploads'));
    },
    filename: (req, file, next) => {
      next(null, req.params.id + '.jpeg');
    },
  });
  const upload = multer({ storage });
  return upload.single('image');
};

module.exports = uploadImage;
