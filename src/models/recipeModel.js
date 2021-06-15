const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(recipeData);

  return { recipe: { ...newRecipe.ops[0] } };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

module.exports = { createRecipe, getRecipes };