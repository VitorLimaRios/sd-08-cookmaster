const Recipe = require('../models/Recipes.model');

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_NOT_FOUND_STATUS = 404;

const ID_LENGTH = 24;

module.exports = {
  index: async () => {
    const recipes = await Recipe.find();

    return recipes;
  },

  show: async (request, response) => {
    const { id } = request.params;

    if (id.length < ID_LENGTH || id.length > ID_LENGTH) {
      return response
        .status(HTTP_NOT_FOUND_STATUS)
        .send({ message: 'recipe not found' });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return response
        .status(HTTP_NOT_FOUND_STATUS)
        .send({ message: 'recipe not found' });
    }

    return recipe;
  },

  create: async (request, response) => {
    const { name, ingredients, preparation } = request.body;

    if (!name || !ingredients || !preparation) {
      return response
        .status(HTTP_BAD_REQUEST_STATUS)
        .send({ message: 'Invalid entries. Try again.' });
    }

    const recipe = await Recipe.create({
      name,
      ingredients,
      preparation,
      userId: request.user._id
    });

    return recipe;
  }
};