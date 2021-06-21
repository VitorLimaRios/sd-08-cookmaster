const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create = async(name, ingredients, preparation, userId) => {
  const db = await connection();
  const createRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: createRecipe.insertedId,
    }
  };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();

  if(recipes) return recipes;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
