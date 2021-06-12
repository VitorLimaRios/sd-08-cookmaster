const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) =>
  connection().then ((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));

const getAll = async () =>
  connection().then ((db) => db.collection('recipes')
    .find().toArray());

module.exports = {
  getAll,
  create,
};
