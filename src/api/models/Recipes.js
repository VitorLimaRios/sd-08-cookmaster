const connection = require('./connection');

const newRecipe = async (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne({ ...recipe }));

const getRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  newRecipe,
  getRecipes,
};