const multer = require('multer');

const addImage = () => {
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, 'src/uploads'),
    filename: (req, _file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
    },
  });

  const add = multer({ storage });
  return add.single('image');
};

module.exports = addImage;
