const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId
  });

  return recipe.ops[0];
};

module.exports = {
  create,
};