const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (recipe) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne(recipe);
  return {
    recipe: {
      ...recipe,
      _id: result.insertedId,
    },
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').findOne(new ObjectId(id));
  return result;
};

const updateRecipe = async (id, newData) => {
  const db = await connection();
  const instructions = { $set: newData };
  const result = await db
    .collection('recipes')
    .findOneAndUpdate({ _id: new ObjectId(id) }, instructions);
  return { ...result.value, ...newData };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
