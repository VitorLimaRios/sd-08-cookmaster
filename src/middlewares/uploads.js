const multer = require('multer');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, dirPath);
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  }
});

const upload = multer({ storage });

module.exports = upload;