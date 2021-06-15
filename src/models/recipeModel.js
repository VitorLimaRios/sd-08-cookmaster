const { ObjectId } = require('mongodb');

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

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  if (!recipe) return null;
  
  return recipe;
};

module.exports = { createRecipe, getRecipes, getRecipeById };
