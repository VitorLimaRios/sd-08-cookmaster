const connection = require('./connection');

const COLLECTION = 'recipes';

const insertOneRecipe = async (recipeData) => {
  const db = await connection();
  return db.collection(COLLECTION).insertOne(recipeData);
};

module.exports = {
  insertOneRecipe,
};
