const jwt = require('jsonwebtoken');

const { recipesModel, usersModel } = require('../models');
const { findEmail } = usersModel;
const {
  writeRecipes,
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
  console.log(addRecipes.insertedId);

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

module.exports = {
  recipesCreate,
};