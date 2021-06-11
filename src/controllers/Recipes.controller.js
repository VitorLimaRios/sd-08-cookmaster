const { index, show, create, update } = require('../services/Recipes.services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  index: async (_request, response) => {
    try {
      const recipes = await index();

      return response.status(HTTP_OK_STATUS).send(recipes);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  show: async (request, response) => {
    try {
      const recipe = await show(request, response);

      return response.status(HTTP_OK_STATUS).send(recipe);
    } catch (err) {
      console.log(err);
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  create: async (request, response) => {
    try {
      const recipe = await create(request, response);

      return response.status(HTTP_CREATED_STATUS).send({ recipe });
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  update: async (request, response) => {
    try {
      const recipe = await update(request);

      return response.status(HTTP_OK_STATUS).send(recipe);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};