const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, ingredients, preparation, userId) =>
  connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId })
  );

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id))
  );
};

const getAll = async () => 
  connection() 
    .then ((db) => db.collection('recipes').find().toArray());

module.exports = { create, getById, getAll };   