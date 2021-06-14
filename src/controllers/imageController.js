const rescue = require('express-rescue');
const path = require('path');
const OK_STATUS = 200;

const getImageById = rescue(async (req, res, next) => {
  const { id } = req.params;
  res
    .status(OK_STATUS)
    .sendFile(path.join(__dirname, '..', 'uploads', `${id}`));
});

module.exports = {
  getImageById,
};
