const mongoConnection = require('./mongoConnection');

const create = async (newRecipe) => {
  try
  {
    const recipesCollection = await mongoConnection()
      .then((db) => db.collection('recipes'));

    const createdRecipe = await recipesCollection
      .insertOne(newRecipe);

    return createdRecipe.ops[0];
  }
  catch (error)
  {
    const { code, message } = error;
    console.log(code, message);
  }
};

module.exports = {
  create,
};
