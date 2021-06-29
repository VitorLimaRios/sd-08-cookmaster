const connect = require('../configdatabase/conn');
const { ObjectId } = require('mongodb');


const createRecipes = async (name, ingredients, preparation, userId) => {
  const database = connect()
    .then((db) => db.collection('recipes').insertOne({
      name, ingredients, preparation, userId
    })).then((result) => result.ops[0]);
  return database;
};

const getAllRecipes = async () => {
  const database = connect()
    .then((db) => db.collection('recipes').find().toArray());
  return database;
};

const getByRecipes = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const database = connect()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return database;
  
};

// const getAllRecipes = async () => {
//   const db = await connect();
//   const getAll = await db.collection('recipes').find().toArray();
//   return getAll;
// };


module.exports = {
  createRecipes,
  getAllRecipes,
  getByRecipes,
};