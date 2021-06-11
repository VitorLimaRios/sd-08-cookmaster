const connection = require('./connection');

const create = async (userId, recipe) => {
  const db = await connection();
  const recipesCollection = db.collection('recipes');

  const newRecipe = {
    userId,
    ...recipe
  };

  const { insertedId } = await recipesCollection.insertOne(newRecipe);
  return {
    _id: insertedId,
    ...newRecipe
  };
};

module.exports = {
  create,
};
