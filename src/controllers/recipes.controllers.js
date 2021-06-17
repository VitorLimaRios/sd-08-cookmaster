const useModels = require('../models/recipes.modules');

const { HTTP_201_STATUS, HTTP_200_STATUS } = require('../shared/httpTypes');

const add = async (req, res) => {
  const { name, ingredients, preparation, userId } = req.body;

  const newRecipe = await useModels.insertNewRecipe(
    name,
    ingredients,
    preparation,
    userId
  );
  return res.status(HTTP_201_STATUS).json(newRecipe);
};

const list = async (req, res) => {
  const recipes = await useModels.findAllRecipesFromDatabase();
  return res.status(HTTP_200_STATUS).json(recipes);
};

const find = async (req, res) => {
  const { id } = req.params;
  const searchResult = await useModels.findOneRecipeById(id);

  return res.status(HTTP_200_STATUS).json(searchResult);
};

module.exports = {
  add,
  list,
  find,
};
