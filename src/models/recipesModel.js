const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const addRecipeToDb = async (newRecipe) => {
  const addingTheRecipe = await connection()
    .then((db => db.collection('recipes').insertOne(newRecipe)))
    .then(result => result.ops[0]);
  return addingTheRecipe;
};
const getAllTheRecipes = async () => {
  const gotAllRecipes = await connection()
    .then((db => db.collection('recipes').find().toArray()));
  return gotAllRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const gettingById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return gettingById;
};


module.exports = { getAllTheRecipes, getRecipeById, addRecipeToDb };
