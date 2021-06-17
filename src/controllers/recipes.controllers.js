const useModels = require('../models/recipes.modules');

const { HTTP_201_STATUS } = require('../shared/httpTypes');

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

module.exports = {
  add,
};
