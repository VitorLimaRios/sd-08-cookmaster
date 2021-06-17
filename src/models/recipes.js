const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

// CREATE
const create = async ({ name, ingredients, preparation, userId, image }) => {  
  return connection()
    .then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId, image}))
    .then((result) => result.ops[0]);
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

const updateById = async (id, updatedRecipe, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = updatedRecipe;
  // console.log(updatedRecipe);
  connection()
    .then((db) => db.collection('recipes').updateOne(
      {_id: ObjectId(id)}, { $set: { name, ingredients, preparation }}));
  return { _id: id, name, ingredients, preparation, userId };
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};
const addImage = async (id, url) => {
  return connection()
    .then((db) => db.collection('recipes')
      .insertOne({_id: ObjectId(id)}, { $set: { image: url }}));
};

const getImage = async (id, url) => {
  return connection()
    .then((db) => db.collection('recipes'))
    .findOne({ _id: ObjectId(id) }, { image: url });
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  addImage,
  getImage,
};