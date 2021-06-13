const connection = require('./connection');
const { ObjectId } = require('mongodb');


const createRecipe = async (name, ingredients, preparation, userId) =>{
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ userId, name, ingredients, preparation });
  
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: newRecipe.insertedId,
  } };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getById = async (id) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const recipes = await db.collection('recipes').findOne(ObjectId(id));
  console.log(recipes);

  return recipes;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};