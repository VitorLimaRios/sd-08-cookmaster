const connection = require('./connection');

const COLLECTION = 'recipes';

const insertOneRecipe = async (recipeData) => {
  const db = await connection();
  return db.collection(COLLECTION).insertOne(recipeData);
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection(COLLECTION).find({}).toArray();
};

module.exports = {
  insertOneRecipe,
  getAllRecipes,
};
