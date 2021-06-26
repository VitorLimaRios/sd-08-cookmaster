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
  const { value } = await connection()
    .then((db) => db.collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(recipeId) }, { $set: updatedRecipe }));

  if (!value) return null;

  return { _id: recipeId, ...value, ...updatedRecipe, userId };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => db
    .collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  get,
  getById,
  update,
  remove
};
