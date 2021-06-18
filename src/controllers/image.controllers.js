const path = require('path');

const { HTTP_200_STATUS, HTTP_500_STATUS } = require('../shared/httpTypes');

const { ERROR_IMAGE } = require('../shared/errorMessage');

const findImage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(HTTP_500_STATUS).json({
      message: ERROR_IMAGE,
    });
  }

  const imagePath = path.resolve('src/uploads/', id);
  return res.status(HTTP_200_STATUS).sendFile(imagePath);
};

module.exports = {
  findImage,
};
