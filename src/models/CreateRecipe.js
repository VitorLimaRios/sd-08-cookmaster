const connection = require('./connection');

const CreateRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const newRecipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });

  return newRecipe.ops[0];
};

module.exports = CreateRecipe;