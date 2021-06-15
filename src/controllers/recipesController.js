const recipeServices = require('../services/recipesServices');
const { responsesNCodes } = require('../utils/errorsNCodes');
const { OK, CREATED } = responsesNCodes;

const listRecipes = async (_req, res) => {
  const listAllRecipes = await recipeServices.getAllRecipes();
  return res.status(OK.status).send(listAllRecipes)
}

module.exports = { listRecipes };
