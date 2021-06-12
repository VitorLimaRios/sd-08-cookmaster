const connection = require('./connection');
const { ObjectId } = require('bson');

const create = async (name, ingredients, preparation, userId) =>
  connection().then ((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }));

const getAll = async () =>
  connection().then ((db) => db.collection('recipes')
    .find().toArray());

const getOne = async (id) =>
  connection().then ((db) => db.collection('recipes')
    .findOne(ObjectId(`${id}`)));

module.exports = {
  getAll,
  getOne,
  create,
};
