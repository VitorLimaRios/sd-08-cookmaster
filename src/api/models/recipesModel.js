const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: addRecipe.insertedId,
    }
  };
};

module.exports = {
  createRecipe,
};
