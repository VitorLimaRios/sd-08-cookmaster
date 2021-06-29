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

const getRecipeById = async (id) => {
  const db = await connection();
  return db.collection(COLLECTION).findOne({ _id: id });
};

module.exports = {
  insertOneRecipe,
  getAllRecipes,
  getRecipeById,
};
