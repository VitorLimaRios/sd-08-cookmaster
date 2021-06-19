const { ObjectId } = require('mongodb');
const connection = require('../models/connection');
const { tokenDecodation } = require('../utils/tokenation');
const { findUserByEmail } = require('./usersModel');

const addRecipeToDb = async (newRecipe, tokenToDecode) => {

  const { data: userEmail } = await tokenDecodation(tokenToDecode);
  if (!userEmail) return null;
  const { _id: userId } = await findUserByEmail(userEmail);
  const addingTheRecipe = await connection()
    .then((db => db.collection('recipes').insertOne({ userId, ...newRecipe })))
    .then(result => result.ops[0]);
  const {
    name: recipeName,
    ingredients: recipeIng,
    preparation: recipePrep,
    _id: recipeInsertId } = addingTheRecipe;
  const recipe = {
    name: recipeName,
    ingredients: recipeIng,
    preparation: recipePrep,
    userId,
    _id: recipeInsertId
  };
  return { recipe };
};
const getAllTheRecipes = async () => {
  const gotAllRecipes = await connection()
    .then((db => db.collection('recipes').find().toArray()));
  return gotAllRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const gettingById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return gettingById;
};

const updateRecipeById = async (id, theUpdate) => {
  const oldInfo = await getRecipeById(id);
  const { _id, userId } = oldInfo;
  const updatingRecipe = await connection().then(db => db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { userId, _id, ...theUpdate } },
      { returnDocument: 'after' }));
  return updatingRecipe.value;
};

const deleteRecipeById = async (id) => {
  const deleting = await connection()
    .then(db => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));
  return deleting;
};




module.exports = {
  getAllTheRecipes, getRecipeById, addRecipeToDb, updateRecipeById, deleteRecipeById
};
