const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getDbCollection = async () => connection()
  .then((db) => db.collection('recipes'));

const createRecipe = async (name, ingredients, preparation) => getDbCollection()
  .then((collection) => collection.insertOne({ name, ingredients, preparation }));

const getRecipes = async () => getDbCollection()
  .then((collection) => collection.find().toArray());

const getRecipeById = async (id) => getDbCollection()
  .then((collection) => collection.findOne(ObjectId(id)));

const updateRecipe = async (id, name, ingredients, preparation) => getDbCollection()
  .then((collection) => collection.updateOne(
    { _id: ObjectId(`${id}`) },
    { $set: { name, ingredients, preparation } },
  ));

module.exports = {
  createRecipe,   
  getRecipes,
  getRecipeById,
  updateRecipe,
};