const connection = require('./connection');
const { ObjectId } = require('mongodb');
const collectionName = 'recipes';

const registerRecipe = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db
        .collection(collectionName)
        .insertOne({ name, ingredients, preparation, userId })
    )
    .then((result) => ({
      recipe: {
        name,
        ingredients,
        preparation,
        userId,
        _id: result.insertedId,
      },
    }));

const getAllRecipes = async () =>
  connection()
    .then((db) => db.collection(collectionName).find().toArray())
    .then((recipes) => recipes);

const getRecipeById = async (id) =>
  connection().then((db) =>
    db
      .collection(collectionName)
      .findOne(ObjectId(id))
      .then((recipe) => recipe)
  );

const updateRecipeById = async (id, name, ingredients, preparation) =>
  connection().then((db) =>
    db.collection(collectionName).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          ingredients: ingredients,
          preparation: preparation,
        },
      }
    )
  );

const deleteRecipeById = async (id) =>
  connection().then((db) =>
    db.collection(collectionName).deleteOne({ _id: ObjectId(id) })
  );

const addImageToRecipe = async (id, path) =>
  connection().then((db) =>
    db
      .collection(collectionName)
      .updateOne({ _id: ObjectId(id) }, { $set: { image: path } })
  );

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addImageToRecipe,
};
