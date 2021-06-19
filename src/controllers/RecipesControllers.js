const RecipesSerices = require('../services/RecipesServices');

const HTT_SATATUS_OK = 200;
const CODE_HTTP_CREATE = 201;
const NO_CONTENT = 204;


const insertRecipe = async (req, resp) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const response = await RecipesSerices.insertRecipe(name, ingredients, preparation, _id);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(CODE_HTTP_CREATE).json(response);
}   ;

const getRecipes = async (req, resp) => {
  const response = await RecipesSerices.getRecipes();

  resp.status(HTT_SATATUS_OK).json(response);
};

const getRecipeID = async (req, resp) => {
  const { id } = req.params;

  const response = await RecipesSerices.getRecipeID(id);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(HTT_SATATUS_OK).json(response);
};

const editRecipe = async (req, resp) => {
  const { id: idRecipe } = req.params;
  const {_id: idUserLogin, role: typeUser} = req.user;
  const { name, ingredients, preparation } = req.body;

  const ObjectValues = {
    idUserLogin, idRecipe, name, ingredients, preparation, typeUser
  };
  
  const response = await RecipesSerices.editRecipe(ObjectValues);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(HTT_SATATUS_OK).json(response);
};

const deleteRecipe = async (req, resp) => {
  const { id } = req.params;
  const {_id: idUserLogin, role: typeUser} = req.user;

  const response = await RecipesSerices.deleteRecipe(idUserLogin, id, typeUser);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(NO_CONTENT).end();
};

const addImageRecipe = async (req, resp) => {
  const { id: idRecipe } = req.params;
  const {_id: idUserLogin, role: typeUser} = req.user;

  const response =  await RecipesSerices.addImageRecipe(idUserLogin, idRecipe, typeUser);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(HTT_SATATUS_OK).json(response);
};

module.exports = {
  insertRecipe,
  getRecipes,
  getRecipeID,
  editRecipe,
  deleteRecipe,
  addImageRecipe,
};
