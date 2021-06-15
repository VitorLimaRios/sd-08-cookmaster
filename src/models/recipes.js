const connection = require('../models/connection');

const create = async ({ name, ingredients, preparation, userId, url }) => {  
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId, url }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
      url: ''
    }));
  return recipe;
};

const getAll = async () => {
  return connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => recipes);
};

module.exports = {
  create,
  getAll,
};