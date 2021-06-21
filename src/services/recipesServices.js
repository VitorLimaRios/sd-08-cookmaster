const recipesModel = require('../models/recipesModel');

const addRecipes = async (dataRecipes, dataUsers) => {
  const { name, ingredients, preparation } = dataRecipes;
  const insertRecipes = await recipesModel
    .addRecipes(name, ingredients, preparation, dataUsers._id);

  return {
    name: insertRecipes.name,
    ingredients: insertRecipes.ingredients,
    preparation: insertRecipes.preparation,
    userid: dataUsers._id,
    _id: insertRecipes._id,
  };

};

const getAllRecipes = async () => {
  const getAll = await recipesModel.getAllRecipes();
  return getAll;
};

const getById = async (id) => {
  const recipesById = await recipesModel
    .getById(id);

  if( recipesById === null) return {
    message: 'recipe not found'
  };
  
  return recipesById;
};

const updateRecipes = async (dataRecipes, IdRecipe) => {
  const { name, ingredients, preparation } = dataRecipes;
  const getAll = await recipesModel.getAllRecipes();

  const getUserId = getAll.find((data) => 
    data._id == IdRecipe
  );

  await recipesModel.update(name, ingredients, preparation, IdRecipe);

  return {
    _id: IdRecipe,
    name,
    ingredients,
    preparation,
    userId: getUserId.userId,
  };
};

const excludeRecipe = async (id) => {
  const deleteRecipe = await recipesModel
    .exclude(id);

  return {};
};

const saveImageById = async (id, urlImage) => {
  const imageSaved = await recipesModel.saveImage(id, urlImage);
  const recipesById = await recipesModel.getById(id);

  return recipesById;
};

module.exports = {
  addRecipes,
  getAllRecipes,
  getById,
  updateRecipes,
  excludeRecipe,
  saveImageById,
};
