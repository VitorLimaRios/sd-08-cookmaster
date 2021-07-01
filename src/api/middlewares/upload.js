const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _res, callback) => {
    callback(null, 'src/uploads/');
  },
  filename: (req, _res, callback) => {
    callback(null, req.params.id + '.jpeg');
  },
});

const upload = multer({ storage });

module.exports = upload;
