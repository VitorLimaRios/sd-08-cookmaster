const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then(db => db.collection('recipes').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({
    name, ingredients, preparation, userId }))
  .then((result) => ({ recipe: result.ops[0] }));

module.exports = {
  getAll,
  getById,
  create
};