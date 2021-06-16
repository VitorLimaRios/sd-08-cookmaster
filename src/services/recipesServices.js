const jwt = require('jsonwebtoken');

const { recipesModel, usersModel } = require('../models');
const { findEmail } = usersModel;
const {
  writeRecipes,
  readRecipes,
  readRecipesById,
  editRecipesById,
  removeRecipesById,
} = recipesModel;

const secret = 'trybecookmaster'; // isso deve ir pro .env

const recipesCreate = async (name, ingredients, preparation, auth) => {
  const validation = await checkRecipes(name, ingredients, preparation);
  if (validation.message) return validation;
  
  const decoded = jwt.verify(auth, secret);
  const user = await findEmail(decoded.data.email);
  if (!user) return { message: 'jwt malformed' };
  
  const userId = decoded.data._id;
  const addRecipes = await writeRecipes(userId, name, ingredients, preparation);

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: addRecipes.insertedId
    }
  };
};

const checkRecipes = async (name, ingredients, preparation) => {
  const invalidEntries = { message: 'Invalid entries. Try again.' };

  if (!name || !ingredients || !preparation) return invalidEntries;

  return false;
};

const getRecipes = async () => {
  const result = await readRecipes();
  return result;
};

const recipesById = async (id) => {
  const result = await readRecipesById(id);

  if (!result) return { message: 'recipe not found' };

  return result;
};

const updateRecipesById = async ({
  id, name, ingredients, preparation}, authorization) => {
  if (!authorization) return { message: 'missing auth token' };
  const decoded = jwt.verify(authorization, secret);
  const user = await findEmail(decoded.data.email);
  const userId = decoded.data._id;
  if (!user) return { message: 'jwt malformed' };
  const result = await editRecipesById({ id, name, ingredients, preparation });
  if (!result) return { message: 'recipe not found' };
  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const deleteRecipesById = async (id, authorization) => {
  if (!authorization) return { message: 'missing auth token' };

  const decoded = jwt.verify(authorization, secret);
  const user = await findEmail(decoded.data.email);
  // const userId = decoded.data._id;

  if (!user) return { message: 'jwt malformed' };

  const result = await removeRecipesById(id);
  if (!result) return { message: 'recipe not found' };
  
  // return false;
};

module.exports = {
  recipesCreate,
  getRecipes,
  recipesById,
  updateRecipesById,
  deleteRecipesById,
};