const mongoConnection = require('./mongoConnection');
const { ObjectId } = require('mongodb');

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

const getAll = async () => {
  const recipesCollection = await mongoConnection()
    .then((db) => db.collection('recipes'));

  const allRecipes = await recipesCollection
    .find()
    .toArray();

  return allRecipes;
};

const findById = async (id) => {
  const recipesCollection = await mongoConnection()
    .then((db) => db.collection('recipes'));

  const recipe = await recipesCollection.findOne(ObjectId(id));
  
  return recipe;
};

const update = async (id, newRecipe, userId) => {
  const recipesCollection = await mongoConnection()
    .then((db) => db.collection('recipes'));
  
  await recipesCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: { newRecipe } },
  );

  return {
    _id: id,
    ...newRecipe,
    userId,
  };
};

module.exports = {
  create,
  getAll,
  findById,
  update,
};
