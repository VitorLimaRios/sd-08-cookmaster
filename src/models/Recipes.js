const connection = require('./connection');
const { ObjectId } = require('mongodb');

const newRecipe = async (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne({ ...recipe }));

const getRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  if (!recipe) return null;
  return recipe;
};

const update = async (id, recipe) => connection()
  .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id)}, { $set: recipe }));

const remove = async (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id)}));


module.exports = {
  newRecipe,
  getRecipes,
  getRecipeById,
  update,
  remove
};