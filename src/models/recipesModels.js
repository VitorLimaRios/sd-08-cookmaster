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

const updateRecipeById = async (id, recipe, userId) => {
  await connection().then((db) =>
    db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { recipe } }));
  return { _id: id, ...recipe, userId };
};

const deleteRecipeById = async (id) => {
  const deleteRecipe = await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return deleteRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
