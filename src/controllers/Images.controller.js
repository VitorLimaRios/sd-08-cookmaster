const { path } = require('../services/Images.service');

const HTTP_OK_STATUS = 200;

module.exports = {
  show: (request, response) => {
    const { image } = request.params;

    const image_path = path(image);  
  
    return response.status(HTTP_OK_STATUS).sendFile(image_path);
  }
};