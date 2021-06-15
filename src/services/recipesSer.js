// regras dos negócios
// const { ObjectId } = require('mongodb');
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

const updateRecipes = async (dataRecipes, IdRecipe) => {
  const { name, ingredients, preparation } = dataRecipes;

  console.log('------------'); 
  console.log('IdRecipe', IdRecipe);

  const getAll = await recipesModel.getAllRecipes();

  console.log('------------'); 
  console.log('getAll line 51 Service', getAll);

  const getIdUser = getAll.find((data) => 
  // const IdRecipeData = data._id;
  // console.log('type data._id', typeof(IdRecipeData));
  // console.log('type IdRecipe', typeof(IdRecipe));
  // console.log('data._id', IdRecipeData);
  // console.log('IdRecipe', IdRecipe);
    
    // console.log('true or false', IdRecipeData == IdRecipe);
    data._id == IdRecipe
  );
  console.log('------------'); 
  console.log('getIdUser line 51 Service', getIdUser);


  await recipesModel
    .update(name, ingredients, preparation, IdRecipe);
  // console.log('------------'); 
  // console.log('updateRecipe line 43 Service', updateRecipe);

  return {
    _id: IdRecipe,
    name,
    ingredients,
    preparation,
    userId: getIdUser.userId,
  };
};

module.exports = {
  addRecipes,
  getAllRecipes,
  getById,
  updateRecipes,
};
