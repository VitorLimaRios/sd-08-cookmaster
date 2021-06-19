const connection = require('./connection');
const { errorHandling } = require('../utils');

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

module.exports = {
  createRecipe
};
