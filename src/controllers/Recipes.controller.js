const { create } = require('../services/Recipes.services');

const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  create: async (request, response) => {
    try {
      const recipe = await create(request, response);

      return response.status(HTTP_CREATED_STATUS).send({ recipe });
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};