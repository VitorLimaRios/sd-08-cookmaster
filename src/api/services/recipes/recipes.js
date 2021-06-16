const {
  registerRecipesModel,
  allRecipesModel,
  idRecipesModel,
  editRecipesModel,
  deleteRecipesModel,
} = require('../../models/recipe/recipe');

const {
  validRecipes,
} = require('../../validations');

const registerRecipes = async (recipes) => {
  const { error } = validRecipes.validate(recipes);
  if (error) return { status: 400, message: error.details[0].message };
  const recipe = await registerRecipesModel(recipes);
  return recipe;
};

const allRecipes = async () => {
  const result = await allRecipesModel();
  return result;
};

const idRecipes = async (id) => {
  const result = await idRecipesModel(id);
  if (result === null) return { status: 404, message: 'recipe not found' };
  return result;
};

const editRecipes = async (id, body) => {
  const result = await editRecipesModel(id, body);
  return result;
};

const deleteRecipes = async (id) => {
  console.log(id);

  const result = await deleteRecipesModel(id);
  return result;
};

module.exports = {
  registerRecipes,
  allRecipes,
  idRecipes,
  editRecipes,
  deleteRecipes,
};
