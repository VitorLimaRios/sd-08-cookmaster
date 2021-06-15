const connection = require('./connection');

const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, _id) => {
  try {
    const db = await connection();
    const result = await db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: _id });
    return result.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getAll = async () => {
  try {
    const db = await connection();
    const recipes = await db.collection('recipes')
      .find().toArray();
    return recipes;
  } catch (error) {
    return { error: error.message };
  }
};

const getById = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes')
      .findOne(ObjectId(id));
    return recipe;
  } catch (error) {
    return { error: error.message };
  }
};

const deleteRecipe = async (id) => {
  try {
    const db = await connection();
    const result = await db.collection('recipes')
      .removeOne(ObjectId(id));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  deleteRecipe,
};
