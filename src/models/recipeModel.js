const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne(recipeData);

  return { recipe: { ...newRecipe.ops[0] } };
};

const getRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  if (!recipe) return null;
  
  return recipe;
};

const editRecipe = async (id, recipeData) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const editedRecipe = await db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(id)},
      { $set: recipeData},
      { returnOriginal: false }
    );

  if (!editedRecipe) return null;

  return editedRecipe.value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const deletedRecipe = await db.collection('recipes').deleteOne( { _id: ObjectId(id) });

  if (!deletedRecipe) return null;

  return true;
};

module.exports = { createRecipe, getRecipes, getRecipeById, editRecipe, deleteRecipe };
