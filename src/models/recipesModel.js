const connect = require('./mongoConnection');

const COLLECTION = 'recipes';

const addRecipe = async (recipe) => {
  return connect()
    .then((db) => db.collection(COLLECTION).insertOne(recipe))
    .then((result) => result.ops[0]);
};

const getRecipes = async () => {
  return connect()
    .then((db) => db.collection(COLLECTION).find().toArray());
};

module.exports = {
  addRecipe,
  getRecipes,
};