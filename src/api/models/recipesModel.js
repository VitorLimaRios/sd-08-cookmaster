const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: addRecipe.insertedId,
    }
  };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  // console.log('recipes no model:', recipes[0].name);
  if (recipes) return recipes;
};

const recipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  console.log('recipe no model:', recipe);
  console.log('ta entrando no model');
  return recipe;
};

module.exports = {
  createRecipe,
  getAll,
  recipeById,
};
