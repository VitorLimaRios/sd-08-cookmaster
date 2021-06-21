const multer = require('multer');
const path = require('path');

const rota = path.join(__dirname, '../..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, _file, callback) => {
    callback(null, rota);
  },
  filename: (req, _file, callback) => {
    req.body = { image: `localhost:3000/src/uploads/${req.params.id}.jpeg` };
    callback(null, `${req.params.id}.jpeg`);
  }
});

const upload = multer({ storage });

module.exports = upload;
