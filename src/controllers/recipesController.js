const recipeServices = require('../services/recipesServices');
const { responsesNCodes } = require('../utils/errorsNCodes');
const { OK, CREATED } = responsesNCodes;

const addRecipe = async (req, res) => {
  try {
    const { token } = req.headers;
    const recipe = req.body;
    const addedRecipe = await recipeServices.addTheRecipe(recipe, token);
    return res.status(CREATED.status).send(addedRecipe);
  } catch (error) {
    const objMessage = JSON.parse(error.message);
    console.log(objMessage.status, objMessage.send);
    if (objMessage) return res.status(objMessage.status).send(objMessage.send);
    return res.status(500).send({ message: 'Unknown error' });
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
