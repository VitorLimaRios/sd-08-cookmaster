const multer = require('multer');

const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'src/uploads'),
    filename: (req, file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
    },
  });

  const upload = multer({ storage });
  return upload;
};

module.exports = uploadImage;