const connection = require('./connection');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'recipes';

const readRecipes = () => connection()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

const readRecipesById = (id) => connection()
  .then((db) => db.collection(COLLECTION_NAME).findOne({_id: ObjectId(id)}));

const createRecipe = (recipe) => connection()
  .then((db) => db.collection(COLLECTION_NAME).insertOne(recipe));

module.exports = {
  readRecipes,
  readRecipesById,
  createRecipe,
};