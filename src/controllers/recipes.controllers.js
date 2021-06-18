const useModels = require('../models/recipes.modules');

const {
  HTTP_201_STATUS,
  HTTP_200_STATUS,
  HTTP_204_STATUS,
  HTTP_400_STATUS,
} = require('../shared/httpTypes');

const { WRONG_ID_FORMAT } = require('../shared/errorMessage');

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

const update = async (req, res) => {
  const entries = req.body;
  const userId = req.user._id;
  const { id } = req.params;
  const updateResult = await useModels.updateRecipe(id, entries, userId);
  return res.status(HTTP_200_STATUS).json(updateResult);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removeResult = await useModels.removeRecipe(id);

  if (!removeResult) {
    return res.status(HTTP_400_STATUS).json({
      message: WRONG_ID_FORMAT,
    });
  }

  return res.status(HTTP_204_STATUS).json(removeResult);
};

module.exports = {
  add,
  list,
  find,
  update,
  remove,
};
