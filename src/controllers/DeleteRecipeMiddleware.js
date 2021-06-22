const DeleteRecipe = require('../services/DeleteRecipe');

const NO_CONTENT = 204;

const DeleteRecipeMiddleware = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  await DeleteRecipe({
    id,
    user,
  });

  return res.status(NO_CONTENT).json();
};

module.exports = DeleteRecipeMiddleware;
