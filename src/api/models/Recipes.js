const connection = require('./connection');

const newRecipe = async (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne({ ...recipe }));

module.exports = {
  newRecipe,
};