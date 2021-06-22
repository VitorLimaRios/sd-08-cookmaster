const recipeModel =  require('../model/recipesModel');
const userModel = require('../model/userModel');
const validations = require('./recipeValidations');

const addRecipe = async (infor, id) => {
  const bodyValid = validations.bodyIsValid(infor);

  if (bodyValid) return bodyValid;

  await recipeModel.addRecipes(infor, id);
  const findRecipesAdd = await recipeModel.findOneRecipes(id);
  const tamanho = findRecipesAdd.length;

  return { message: findRecipesAdd[tamanho - 1], code: 201 };
};

const findAllRecipes = async () => {
  const getAllRecipes = await recipeModel.getAll();

  return { message: getAllRecipes, code: 200 };
};

const findByIdRecipe = async (id) => {
  const paramsIsValid = await validations.idIsValid(id);

  if (paramsIsValid) return paramsIsValid;

  const getById = await recipeModel.findById(id);

  return { message: getById, code: 200 };
};


const roleType = async (body, id) => {
  await recipeModel.updateRecipeId(id, body);

  const updated = await recipeModel.findById(id);

  return { message: updated, code: 200 };
};

module.exports = {
  addRecipe,
  findAllRecipes,
  findByIdRecipe,
  roleType,
};
