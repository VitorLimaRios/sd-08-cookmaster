const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (recipeInfo) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(recipeInfo);
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connection();
  return db.collection('recipes').findOne(ObjectId(id));
};

const updateRecipeById = async (id, newRecipeInfo) => {
  const db = await connection();
  return db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: newRecipeInfo });
};

const deleteRecipeById = async (id) => {
  const db = await connection();
  return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
