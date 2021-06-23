const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (recipe, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe));

  return { recipe: { ...recipe, userId, _id: insertedId } };
};

const get = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());

  if (!recipes) return null;

  return recipes;
};

const getById = async (id) => {

  if (!ObjectId.isValid(id)) return null;
    
  const recipes = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  
  return recipes;
};

module.exports = {
  create,
  get,
  getById
};
