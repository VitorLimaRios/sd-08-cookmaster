const connection = require('./connection');
const { ObjectId } = require('mongodb');

const RECIPES = 'recipes';
const createRecipes = async (recipes) => {
  try {
    const { name, ingredients, preparation, _id } = recipes;
    const db = await connection();
    const result = await db.collection(RECIPES).insertOne({
      name,
      ingredients,
      preparation,
      userId: _id,
    });
    return result.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getRecipes = async () => {
  try {
    const db = await connection();
    const result = await db.collection(RECIPES).find().toArray();
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const findRecipes = async (recipeId) => {
  try {
    const db = await connection();
    const result = await db.collection(RECIPES).findOne({ _id: ObjectId(recipeId) });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const updateRecipes = async (recipeId, changes) => {
  try {
    const db = await connection();
    const result = await db.collection(RECIPES)
      .updateOne({ _id: ObjectId(recipeId)}, { $set: changes });
    return result;

  } catch (error) {
    return { error: error.message };
  }
};

const deleteRecipes = async (recipeId) => {
  try {
    const db = await connection();
    const result = await db.collection(RECIPES).removeOne({ _id: ObjectId(recipeId) });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const imageUpdate = async (recipeId, image) => {
  const db = await connection();
  const result = await db.collection(RECIPES)
    .updateOne({ _id: ObjectId(recipeId) }, { $set: { image } });
  return result;
};

module.exports = {
  createRecipes,
  getRecipes,
  findRecipes,
  updateRecipes,
  deleteRecipes,
  imageUpdate,
};
