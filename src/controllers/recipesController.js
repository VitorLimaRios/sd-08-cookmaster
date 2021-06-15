const recipeServices = require('../services/recipesServices');
const { responsesNCodes } = require('../utils/errorsNCodes');
const { OK, CREATED } = responsesNCodes;

const listRecipes = async (_req, res) => {
  const listAllRecipes = await recipeServices.getAllRecipes();
  return res.status(OK.status).send(listAllRecipes)
};

const searchRecipe = async (req, res) => {
  const idParams = req.params;
  const searching = await recipeServices.getById(idParams.id);
  return res.status(OK.status).send(searching);
};

module.exports = { listRecipes, searchRecipe };
