const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const addRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: addRecipe.insertedId,
    }
  };
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  // console.log('recipes no model:', recipes[0].name);
  if (recipes) return recipes;
};

const recipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const recipeBefore = await recipeById(id);
  await db.collection('recipes')
    .updateOne({_id: id}, { $set: { name, ingredients, preparation } });
  return {
    _id: recipeBefore._id, name, ingredients, preparation, userId: recipeBefore.userId
  };
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const recipeDeleted = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipeDeleted;
};

module.exports = {
  createRecipe,
  getAll,
  recipeById,
  updateRecipe,
  deleteRecipe,
};
