const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (userId, recipe) => {
  const db = await connection();
  const recipesCollection = db.collection('recipes');

  const newRecipe = {
    userId,
    ...recipe
  };

  const { insertedId } = await recipesCollection.insertOne(newRecipe);
  return {
    _id: insertedId,
    ...newRecipe
  };
};

const getAll = async () => {
  const db = await connection();
  const recipesCollection = db.collection('recipes');

  const recipes = await recipesCollection.find().toArray();
  return recipes;
};

const findById = async (id) => {
  const db = await connection();
  const recipesCollection = db.collection('recipes');

  const recipe = await recipesCollection.findOne(new ObjectId(id));
  return recipe;
};

module.exports = {
  create,
  getAll,
  findById
};
