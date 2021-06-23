const multer = require('multer');
const path = require('path');

module.exports = {
  dest: path.resolve(__dirname, '..', 'uploads'),
  storage: multer.diskStorage({
    destination: (_request, _file, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: (request, _file, callback) => {
      const { id } = request.params;

      const fileName = `${id}.jpeg`;

      callback(null, fileName);
    },
  }),
  fileFilter: (_request, file, callback) => {
    const allowedMimes = [
      'image/jpeg',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    }
  },
};