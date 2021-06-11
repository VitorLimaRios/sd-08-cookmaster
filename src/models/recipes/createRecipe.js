const connection = require('../connection');

module.exports = async ({ name, ingredients, preparation }) => {
  const result = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
    .then((result) => ({ _id: result.insertedId, name, ingredients, preparation }));

  return result;
};
