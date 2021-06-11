const connect = require('./connection');

const addRecipe = async ({ name, ingredients, preparation }) => {
  const response = await connect()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));

  return response.ops[0];
};

module.exports = {
  addRecipe,
};
