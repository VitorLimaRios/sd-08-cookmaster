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

const updateRecipe = async (id, entries, userId) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const { name, ingredients, preparation } = entries;

  const db = await connection();
  await db
    .collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } }
    );
  return { _id: id, name, ingredients, preparation, userId };
};

const removeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const result = await db
    .collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  insertNewRecipe,
  findAllRecipesFromDatabase,
  findOneRecipeById,
  updateRecipe,
  removeRecipe,
};
