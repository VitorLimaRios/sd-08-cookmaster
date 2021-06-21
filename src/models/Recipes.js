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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
