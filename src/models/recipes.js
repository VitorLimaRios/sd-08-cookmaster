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

module.exports = {
  createRecipe,
};
