const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId: _id } = await connection().then((db) => 
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return { name, ingredients, preparation, userId, _id };
};

const getAllRecipes = async () => {
  const recipes = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
