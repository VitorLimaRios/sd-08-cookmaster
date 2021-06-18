const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, id) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId: id });
  return addRecipe;
};

const getRecipeByName = async (name) => {
  const db = await connection();
  const getName = await db.collection('recipes').findOne({ name });
  return getName;
};

const getAllRecipes = async () => {
  const db = await connection();
  const getAll = await db.collection('recipes').find().toArray();
  return getAll;
};

const getRecipeById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const getById = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return getById;
};

module.exports = {
  createRecipe,
  getRecipeByName,
  getAllRecipes,
  getRecipeById,
};