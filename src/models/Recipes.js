const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (recipe, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipe, userId }));

  return { recipe: { ...recipe, userId, _id: insertedId } };
};

const get = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  if (!recipes) return null;

  return recipes;
};

const getById = async (id) => {

  if (!ObjectId.isValid(id)) return null;

  const recipes = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));

  return recipes;
};

const update = async (updatedRecipe, recipeId, userId) => {
  const { modifiedCount } = await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(recipeId) }, { $set: updatedRecipe }));

  if (!modifiedCount) return null;

  return { _id: recipeId, ...updatedRecipe, userId };
};

module.exports = {
  create,
  get,
  getById,
  update
};
