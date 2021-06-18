const recipeServices = require('../services/recipesServices');
const { responsesNCodes } = require('../utils/errorsNCodes');
const { OK, CREATED } = responsesNCodes;

const addRecipe = async (req, res) => {
  try {
    console.log(req);
    const { token } = req.headers;
    const recipe = req.body;
    const addedRecipe = await recipeServices.addTheRecipe(recipe, token);
    console.log(addRecipe);
    return res.status(CREATED.status).send(addedRecipe);
  } catch (error) {
    console.log(error);
    const objMessage = JSON.parse(error.message);
    return res.status(objMessage.status).send(objMessage.send);
  }
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

module.exports = { listRecipes, searchRecipe, addRecipe };
