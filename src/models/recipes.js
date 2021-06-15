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

module.exports = {
  create,
};