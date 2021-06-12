const connection = require('./connection');

const RECIPES_COLLECTION = 'recipes';

const create = async (userId, newRecipe) => {
  const recipe = { userId, ...newRecipe };
  const db = await connection();
  const { insertedId: _id } = await db.collection(RECIPES_COLLECTION).insertOne(recipe);
  return { recipe: { _id, ...recipe } };
};

const getAll = async () => {
  const db = await connection();
  return db.collection(RECIPES_COLLECTION).find().toArray();
};

module.exports = {
  create,
  getAll,
};

// { "_id" : ObjectId("5f46919477df66035f61a356"), "name" : "string", "ingredients" : "string", "preparation" : "string", "userId" : ObjectId("5f46914677df66035f61a355") }
