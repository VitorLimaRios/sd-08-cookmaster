const Recipe = require('../models/Recipes.model');

const HTTP_BAD_REQUEST_STATUS = 400;

module.exports = {
  index: async () => {
    const recipes = await Recipe.find();

    return recipes;
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