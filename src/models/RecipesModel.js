const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId: id });
  return addRecipe;
};

const getRecipeByName = async (name) => {
  const db = await connection();
  const getName = await db.collection('recipes')
    .findOne({ name });
  return getName;
}

module.exports = {
  createRecipe,
  getRecipeByName,
};
