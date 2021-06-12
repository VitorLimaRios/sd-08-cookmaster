const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const imageName = `${id}.jpeg`;
    req.image = imageName;
    callback(null, imageName);
  },
});

const upload = multer({ storage });

module.exports = upload;
