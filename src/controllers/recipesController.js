const recipeServices = require('../services/recipesServices');
const { responsesNCodes, errors } = require('../utils/errorsNCodes');
const { OK, CREATED } = responsesNCodes;

const addRecipe = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const recipe = req.body;
    const addedRecipe = await recipeServices.addTheRecipe(recipe, authorization);
    return res.status(CREATED.status).send(addedRecipe);
  } catch (error) {
    const objMessage = JSON.parse(error.message);
    if (objMessage) return res.status(objMessage.status).send(objMessage.send);
    // return res.status(500).send({ message: error.message });
  }
};

const listRecipes = async (_req, res) => {
  const listAllRecipes = await recipeServices.getAllRecipes();
  return res.status(OK.status).send(listAllRecipes);
};

const searchRecipe = async (req, res) => {
  try {
    const idParams = req.params;
    const searching = await recipeServices.getById(idParams.id);
    return res.status(OK.status).send(searching);
  } catch (error) {
    const objMessage = JSON.parse(error.message);
    if (objMessage) return res.status(objMessage.status).send(objMessage.send);
  }
};

const updateRecipe = async (req, res) => {
  const idParams = req.params;
  await recipeServices.updateRcpById(idParams.id, req.body);
  const updated = await recipeServices.getById(idParams.id);
  return res.status(OK.status).send(updated);
};

module.exports = { listRecipes, searchRecipe, addRecipe, updateRecipe };
