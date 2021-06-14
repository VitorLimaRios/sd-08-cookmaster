const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (recipe) => {
  return connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then((result) => result.ops[0]);
};

const getAll = async () => {
  return connection().then((db) => db.collection('recipes').find().toArray());
};

const getById = async (id) => {
  return connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const updateById = async (id, updatedData) => {
  return connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: updatedData })
  );
};

const deleteById = async (id) => {
  return connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
};
