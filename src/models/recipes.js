const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

const readRecipes = () => connection()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

module.exports = {
  readRecipes,
};