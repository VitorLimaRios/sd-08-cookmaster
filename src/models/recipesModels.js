const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, ingredients, preparation, id) => {
  const result = await connection()
    .then(db => db.collection('recipes')
      .insertOne({name, ingredients, preparation, 'userId': id}));
  return result.insertedId;
};

const getAll = async () => await connection()
  .then(db => db.collection('recipes').find().toArray());

const getOne = async (id) => await connection()
  .then(db => db.collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getOne,
};