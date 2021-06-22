const connection = require('./connection');

const newRecipe = async (name, ingredients, preparation, userId) => {
  return connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then((item) => ({
      recipe: {
        _id: item.insertedId,
        name,
        ingredients,
        preparation,
        userId,
      }
    }));
};

module.exports = {
  newRecipe,
};
