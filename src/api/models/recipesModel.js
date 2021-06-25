const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => recipes.map((item) => (item)));

const findById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(new ObjectId(id)))
  .then((item) => (item));

const updateById = async (id, name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes')
    .updateOne(
      { id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }
    ))
  .then(() => ({ _id: id, name, ingredients, preparation, userId }));

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId }))
  .then((item) => ({
    recipe: {
      _id: item.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }
  }));

const deleteById = async (id) => connection().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAll,
  findById,
  updateById,
  create,
  deleteById
};
