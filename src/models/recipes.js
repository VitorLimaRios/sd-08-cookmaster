const connection = require('./connection');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'recipes';

const readRecipes = () => connection()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

const readRecipesById = (id) => connection()
  .then((db) => db.collection(COLLECTION_NAME).findOne({_id: ObjectId(id)}));

const createRecipe = (recipe) => connection()
  .then((db) => db.collection(COLLECTION_NAME).insertOne(recipe));

const updateRecipe = (recipe, id) => connection()
  .then((db) => db.collection(COLLECTION_NAME)
    .updateOne(
      {_id: ObjectId(id) },
      {$set: recipe}
    ));

const deleteRecipe = (id) => connection()
  .then((db) => db.collection(COLLECTION_NAME).deleteOne({_id: ObjectId(id)}));

module.exports = {
  readRecipes,
  readRecipesById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};