const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertNewRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db
    .collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: newRecipe.insertedId,
    },
  };
};

const findAllRecipesFromDatabase = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const findOneRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const searchResult = await db.collection('recipes').findOne(ObjectId(id));
  return searchResult;
};

module.exports = {
  insertNewRecipe,
  findAllRecipesFromDatabase,
  findOneRecipeById,
};
