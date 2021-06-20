const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne(
    { name, ingredients, preparation, userId }
  ))
  .then((result) => ({ recipe: result.ops[0] }));

const getAll = async () => {
  return connection()
    .then(db => db.collection('recipes').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

const update = async ( id, fields, userId ) => {
  if (!ObjectId.isValid(id)) return null;

  const { name, ingredients, preparation } = fields;
  
  connection()
    .then((db) =>	db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }
    ));
  
  // if (!updateRecipe) return null;
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = {
  create,
  getAll,
  getById,
  update
};