const connection = require('./connection');
const { errorHandling } = require('../utils');

const { ObjectId } = require('mongodb');

const createRecipe = errorHandling(async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId
  });
  
  return {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId
  };
});

const getAllRecipes = errorHandling(async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
});

const getRecipeById = errorHandling(async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  return db.collection('recipes').findOne(ObjectId(id));
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById
};
