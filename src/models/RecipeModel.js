const connection = require('./connection');

const { ObjectId } = require('mongodb');


const create = async (name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({name, ingredients, preparation}))
    .then((data) => {
      const [result] = data.ops;
      return result;
    });

const getAll = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => 
  connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));


module.exports = {
  create,
  getAll,
  getById
};
