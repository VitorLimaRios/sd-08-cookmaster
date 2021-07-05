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
  if (!ObjectId.isValid(id)) return null;
  const database = connect()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return database;

};

const updateRecipes = async (id, upRecipe, userId) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = upRecipe;
  connect().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } }));

  return { _id: id, name, ingredients, preparation, userId };
};

const deleteById = async(id)=>{
  if (!ObjectId.isValid(id)) return null;
  return await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
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
  updateRecipes,
  deleteById,
};