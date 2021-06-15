const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  connection()
    .then(async (db) => {
      const newRecipe = await db.collection('recipes')
        .insertOne({
          name,
          ingredients,
          preparation,
          userId
        });
      return {
        recipe: {
          name,
          ingredients,
          preparation,
          userId,
          _id: newRecipe.insertedId,
        }
      };
    });
};

module.exports = {
  createRecipe,
};
