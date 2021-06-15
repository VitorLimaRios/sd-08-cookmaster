// regras dos negócios
const recipesModel = require('../models/recipesMod');
// const usersModel = require('../models/usersMod');

const addRecipes = async (dataRecipes, dataUsers) => {
  console.log('------------');
  console.log('dataUsers', dataRecipes);

  const { name, ingredients, preparation } = dataRecipes;
  
  const insertRecipesDb = await recipesModel
    .addRecipes(name, ingredients, preparation, dataUsers._id);
  console.log('------------');
  console.log('addUsers usersSer line 7', insertRecipesDb);

  return {
    name: insertRecipesDb.name,
    ingredients: insertRecipesDb.ingredients,
    preparation: insertRecipesDb.preparation,
    userid: dataUsers._id,
    _id: insertRecipesDb._id,
  };

};

const getAllRecipes = async () => {
  const getAll = await recipesModel.getAllRecipes();
  return getAll;
};

const getById = async (id) => {
  const recipesById = await recipesModel
    .getById(id);
  console.log('------------'); 
  console.log('recipesById Service', recipesById);
  if( recipesById === null) return {
    message: 'recipe not found'
  };
  return recipesById;
};

module.exports = {
  addRecipes,
  getAllRecipes,
  getById,
};
