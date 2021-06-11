const { create } = require('../services/Login.services');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  create: async (request, response) => {
    try {
      const token = await create(request, response);

      return response.status(HTTP_OK_STATUS).send({ token });
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};