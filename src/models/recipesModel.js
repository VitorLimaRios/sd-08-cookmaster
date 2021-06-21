const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addRecipes = (name, ingredients, preparation, userId) => 
  connect().then( async (db) => {
    const insertRecipes = await db.collection('recipes')
      .insertOne({name, ingredients, preparation, userId});

    return insertRecipes.ops[0];
  });

const getAllRecipes = async () =>
  connect().then((db) => db.collection('recipes').find().toArray());  

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const recipesById = await connect()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipesById;
};

module.exports = {
  addRecipes,
  getAllRecipes,
  getById,
};
