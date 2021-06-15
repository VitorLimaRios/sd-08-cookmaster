const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const getAllTheRecipes = async () => {
  const gotAllRecipes = await connection()
    .then((db => db.collection('recipes').find().toArray()))
    .then(allRecipes => allRecipes)
  return gotAllRecipes
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const gettingById = await connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return gettingById
};


module.exports = { getAllTheRecipes, getRecipeById };
