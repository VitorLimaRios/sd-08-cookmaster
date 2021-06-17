const recipeServices = require('../services/recipesServices');
const { responsesNCodes } = require('../utils/errorsNCodes');
const { OK, CREATED } = responsesNCodes;

const addTheRecipe = async (req, res) => {
  // const { body, user: { _id: userId } } = req;
  console.log(req);
  const recipe = { ...req.body };
  const addedRecipe = await recipeServices.addRecipe(recipe);
  return res.status(CREATED.status).send({ recipe: addedRecipe });
};

const listRecipes = async (_req, res) => {
  const listAllRecipes = await recipeServices.getAllRecipes();
  return res.status(OK.status).send(listAllRecipes);
};

const searchRecipe = async (req, res) => {
  const idParams = req.params;
  const searching = await recipeServices.getById(idParams.id);
  return res.status(OK.status).send(searching);
};

module.exports = { listRecipes, searchRecipe, addTheRecipe };
