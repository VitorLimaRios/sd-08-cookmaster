const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

// CREATE
const create = async ({ name, ingredients, preparation, userId, image }) => {  
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId, image}))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
      image: ''
    }));
  return recipe;
};

// GETALL
const getAll = async () => {
  return connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => recipes);
};

// GETBYID
const getById = async (id) => { 
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const updateById = async (id, userId, updatedRecipe) => {
  const { name, ingredients, preparation } = updatedRecipe;
  if (!ObjectId.isValid(id)) return null;
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      {_id: ObjectId(id)},
      { $set: { 
        name: name,
        ingredients: ingredients,
        preparation: preparation,
        userId: userId,
      }
      }
    ));
  return ({ _id, name, ingredients, preparation, userId });
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};