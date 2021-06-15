const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, '.src/uploads'),
  filename: (req, file, callback) => callback(null, `${req.headers.host}/images/${req.params.id}.jpeg`),
});


const upload = multer({ storage });

module.exports = (req, res, next) => {
  upload.single('image');
  next();
};
