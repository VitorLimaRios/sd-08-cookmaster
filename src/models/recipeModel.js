const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (recipe) => {
  try {
    const { name, ingredients, preparation, _id } = recipe;
    const db = await connection();
    const response = await db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId: _id,
    });
    return response.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const response = await db.collection('recipes').find().toArray();
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

const getRecipeById = async (recipeId) => {
  try {
    const db = await connection();
    const response = await db.collection('recipes').findOne({ _id: ObjectId(recipeId) });
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
