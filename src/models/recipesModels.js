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

const updateOne = async (recipeID, info) =>{
  await connection().then(db => db.collection('recipes')
    .updateOne({ _id: ObjectId(recipeID) }, 
      { $set: { ...info }} ));
};
  
const deleteOne = async (recipeID) =>{
  await connection().then(db => db.collection('recipes')
    .deleteOne({ _id: ObjectId(recipeID) } ));
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};