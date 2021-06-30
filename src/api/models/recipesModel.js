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

const updateRecipe = async (recipeData, id) => {
  const db = await connection();
  const recipe = await getRecipeById(id);
  await db.collection(COLLECTION).updateOne(
    { _id: id },
    { $set: recipeData },
  );

  const updatedRecipe = { ...recipe, ...recipeData };
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  await db.collection(COLLECTION).deleteOne({ _id: id });
  return;
};

module.exports = {
  insertOneRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
