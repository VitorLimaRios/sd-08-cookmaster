const conn = require('./modelConnection');
const { ObjectID, ObjectId } = require('mongodb');

const table = 'recipes';

const create = async(recipe) => conn()
  .then((db) => db.collection(table).insertOne(recipe))
  .then((res) => res.ops[0]);

const getAll = async() => conn()
  .then((db) => db.collection(table).find().toArray());

const readById = async (id) => conn()
  .then((db) => ObjectId.isValid(id) 
    ? db.collection(table).findOne({ _id: ObjectID(id) })
    : null
  );

module.exports = {
  create,
  getAll,
  readById,
};
