const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

// CREATE
const create = async ({ name, ingredients, preparation, userId, url }) => {  
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId, url }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
      url: ''
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

module.exports = {
  create,
  getAll,
  getById,
};