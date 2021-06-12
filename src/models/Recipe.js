const { ObjectId } = require('mongodb');
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

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection(RECIPES_COLLECTION).findOne(ObjectId(id));
  if (!recipe) return null;
  return recipe;
};

const edit = async (id, recipe) => {
  const db = await connection();
  await db.collection(RECIPES_COLLECTION)
    .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } });
  return getById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
};

// { "_id" : ObjectId("5f46919477df66035f61a356"), "name" : "string", "ingredients" : "string", "preparation" : "string", "userId" : ObjectId("5f46914677df66035f61a355") }
