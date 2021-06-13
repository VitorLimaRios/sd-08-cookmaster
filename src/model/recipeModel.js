const connection = require('./connection');
const collectionName = 'recipes';

const registerRecipe = (name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection(collectionName)
        .insertOne({ name, ingredients, preparation, userId })
    )
    .then((result) => ({
      recipe: {
        name,
        ingredients,
        preparation,
        userId,
        _id: result.insertedId,
      },
    }));

module.exports = {
  registerRecipe,
};
