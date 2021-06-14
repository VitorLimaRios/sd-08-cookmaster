// regras dos negócios
const recipesModel = require('../models/recipesMod');
const usersModel = require('../models/usersMod');

const addRecipes = async (dataRecipes, dataUsers) => {

  // const getAll = await usersModel.getAll();

  // console.log('getAll usersSer line 8', getAll);

  // const emailExist = getAll.some((data) => 
  // console.log(data.email, dataUsers.email);
  //   data.email === dataUsers.email
  // );
  // console.log('emailExist userSer line 11', emailExist);

  // if(emailExist) return { message: 'Email already registered'};

  console.log('dataUsers', dataRecipes);
  // objDataRecipes = {
  //   name: dataRecipes.name,
  //   ingredients: dataRecipes.ingredients,
  //   preparation: dataRecipes.preparation,
  //   role: 'user',
  // };

  // console.log('objDataUsers', objDataRecipes);

  const { name, ingredients, preparation } = dataRecipes;
  
  const insertRecipesDb = await recipesModel
    .addRecipes(name, ingredients, preparation, dataUsers._id);
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

module.exports = {
  addRecipes,
  getAllRecipes,
};
