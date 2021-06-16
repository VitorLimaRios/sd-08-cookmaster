const connect = require('./connection');
const { ObjectId } = require('mongodb');

const create = async (name, ingredients, preparation) => {
  const recipesCollection = await connect()
    .then((db) => db.collection('recipes'));

  const { insertedId: _id } = await recipesCollection
    .insertOne({ name, ingredients, preparation });

  return { _id };
};

const getAll = async () => await connect()
  .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => await connect()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const update = async (id, name, ingredients, preparation) => {
  const recipesCollection = await connect()
    .then((db) => db.collection('recipes'));

  await recipesCollection.updateOne({ _id: ObjectId(id) },
    { $set: { name, ingredients, preparation }});
};

const erase = async (id) => {
  const recipesCollection = await connect()
    .then((db) => db.collection('recipes'));

  await recipesCollection.deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  erase,
};
