const { ObjectId } = require('mongodb');
const connection = require('./connection');

const usersCollection = 'recipes';

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection(usersCollection).findOne({ _id: ObjectId(id) }));
};

const createRecipe = async ({ recipe }) => {
  return connection()
    .then((db) => db.collection(usersCollection).insertOne(recipe))
    .then((result) => getById(result.insertedId));
};

module.exports = {
  createRecipe,
};
