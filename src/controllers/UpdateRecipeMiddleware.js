const UpdateRecipe = require('../services/UpdateRecipe');

const OK = 200;

const UpdateRecipeMiddleware = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const updated = await UpdateRecipe({
    id,
    user,
    name,
    ingredients,
    preparation,
  });

  // case updated = undefined not evaluated

  return res.status(OK).json(updated);
};

module.exports = UpdateRecipeMiddleware;
