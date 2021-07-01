const path = require('../../path');
const { ok } = require('../helpers/statusCode');

const getImage = async (req, res) => {
  const { image } = req.params;

  const imageToShow = `${path}/uploads/${image}`;
  return res.status(ok).sendFile(imageToShow);
};

module.exports = {
  getImage,
};
