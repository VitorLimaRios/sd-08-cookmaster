const multer = require('multer');

const uploadFile = (uploadPath) => {  
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, `${uploadPath}`);
    },
    filename: (req, _file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
    }
  });

  const upload = multer({ storage });
  return upload.single('image');
};

module.exports = uploadFile;