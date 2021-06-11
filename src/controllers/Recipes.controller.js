const { index, show, create, update, remove } = require('../services/Recipes.services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;

const ID_LENGTH = 24;

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
    const { id } = request.params;

    try {
      if (id.length < ID_LENGTH || id.length > ID_LENGTH) {
        return response
          .status(HTTP_NOT_FOUND_STATUS)
          .send({ message: 'recipe not found' });
      }

      const recipe = await show(id);

      if (!recipe) {
        return response
          .status(HTTP_NOT_FOUND_STATUS)
          .send({ message: 'recipe not found' });
      }

      return response.status(HTTP_OK_STATUS).send(recipe);
    } catch (err) {
      console.log(err);
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  create: async (request, response) => {
    const { name, ingredients, preparation } = request.body;

    try {
      if (!name || !ingredients || !preparation) {
        return response
          .status(HTTP_BAD_REQUEST_STATUS)
          .send({ message: 'Invalid entries. Try again.' });
      }

      const recipe = await create(request, name, ingredients, preparation);

      return response.status(HTTP_CREATED_STATUS).send({ recipe });
    } catch (err) {
      console.log(err);
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  update: async (request, response) => {
    const { id } = request.params;
    const { name, ingredients, preparation } = request.body;

    try {
      const recipe = await update(id, name, ingredients, preparation);

      return response.status(HTTP_OK_STATUS).send(recipe);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  },

  delete: async (request, response) => {
    const { id } = request.params;

    try {
      await remove(id);

      return response.sendStatus(HTTP_NO_CONTENT_STATUS);
    } catch (err) {
      return response.status(HTTP_BAD_REQUEST_STATUS).send(err);
    }
  }
};