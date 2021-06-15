const connection = require('../models/connection');

const getAllTheRecipes = async () => {
  const gotAllRecipes = await connection()
    .then((db => db.collection('recipes').find().toArray()))
    .then(allRecipes => allRecipes)
  return gotAllRecipes
};


module.exports = { getAllTheRecipes };
