const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userID) => {
  return connection()
    .then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation, userID })
    )
    .then((result) => result.ops[0])
    .catch((err) => err);
};

const getRecipes = async () => {
  return connection().then((db) => db.collection('recipes').find().toArray());
};

const findRecipe = (id) => {
  return connection().then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

module.exports = {
  createRecipe,
  getRecipes,
  findRecipe
};
