const { validateEntries, recipeNotFound, UserNotExists } = require('./ErrosMensages');
const RecipesModel = require('../models/RecipesModel');
const ZERO = 0;

const NewObjectRecipe = (obj) => {
  const { name, ingredients, preparation, _id } = obj;

  return {
    name,
    ingredients,
    preparation,
    userId: _id,
  };
};

const AddNewKeyRecipe = (obj) => {
  const { name, ingredients, preparation, userId, _id} = obj;

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id,
    }
  };
};

const inputValidation = (name, ingredients, preparation) => { 
 
  if(!name || !ingredients || !preparation) return validateEntries;
  return true;
};

const recipeExists = (recipe) => {
  if(!recipe || recipe.length === ZERO) return recipeNotFound;
  return true;
};

const verifiUserAndRecipe = async (ObjectValues) => {
  const { idUserLogin, idRecipe, typeUser } = ObjectValues;
  
  if(typeUser === 'admin') return true;
  
  const responseRecipe = await RecipesModel.getRecipeID(idRecipe);
  if(!responseRecipe || responseRecipe.length === ZERO) return 'erro';

  
  const { userId } = responseRecipe[0];
  const newIdDB = String(userId);
  const newIdUserLogin = String(idUserLogin);

  if(newIdDB !== newIdUserLogin) return UserNotExists;

  return true;
};

module.exports = {
  NewObjectRecipe,
  AddNewKeyRecipe,
  inputValidation,
  recipeExists,
  verifiUserAndRecipe,
};
