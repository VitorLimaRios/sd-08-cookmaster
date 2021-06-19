const connection = require('../models/connection');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('recipes').find().toArray())
    .then((recipes) => ({ recipes }));
};

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({
    name, ingredients, preparation, userId }))
  .then((result) => ({ recipe: result.ops[0] }));

module.exports = {
  getAll,
  create
};