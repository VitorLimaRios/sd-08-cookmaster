const connection = require('./connection');

const { ObjectId } = require('mongodb');


const create = async (name, ingredients, preparation, userId) =>
  connection()
    .then((db) => db.collection('recipes')
      .insertOne({name, ingredients, preparation, userId}))
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

const updateById = async (id, name, ingredients, preparation ) => 
  connection()
    .then((db) => db.collection('recipes')
      .updateOne({_id: ObjectId(id)}, {$set: {
        name: name, ingredients: ingredients, preparation}}));


module.exports = {
  create,
  getAll,
  getById,
  updateById
};
