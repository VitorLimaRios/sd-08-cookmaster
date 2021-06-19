const recipeServices = require('../services/recipesServices');
const { responsesNCodes } = require('../utils/errorsNCodes');
const { OK, CREATED, NO_CONTENT } = responsesNCodes;

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

const addImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const imgUrl = `${req.get('host')}/src/uploads/${filename}`;
  const addingTheImgUrl = await recipeServices.addTheImage(id, imgUrl);
  return res.status(OK.status).send(addingTheImgUrl);
};

const listRecipes = async (_req, res) => {
  const listAllRecipes = await recipeServices.getAllRecipes();
  return res.status(OK.status).send(listAllRecipes);
};

const searchRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const searching = await recipeServices.getById(id);
    return res.status(OK.status).send(searching);
  } catch (error) {
    const objMessage = JSON.parse(error.message);
    if (objMessage) return res.status(objMessage.status).send(objMessage.send);
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  await recipeServices.updateRcpById(id, req.body);
  const updated = await recipeServices.getById(id);
  return res.status(OK.status).send(updated);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await recipeServices.deleteRcpById(id);
  return res.status(NO_CONTENT.status).send();
};

module.exports = {
  listRecipes,
  searchRecipe, addRecipe, addImage, updateRecipe, deleteRecipe
};
