const connection = require('../connection');

module.exports = async ({ name, ingredients, preparation, userId }) => {
  const result = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

  return result;
};
