const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createRecipe = async (recipe) => {
  try {
    const { name, ingredients, preparation, _id } = recipe;
    const db = await connection();
    const response = await db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId: _id,
    });
    return response.ops[0];
  } catch (error) {
    return { error: error.message };
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const response = await db.collection('recipes').find().toArray();
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

const getRecipeById = async (recipeId) => {
  try {
    const db = await connection();
    const response = await db.collection('recipes').findOne({ _id: ObjectId(recipeId) });
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

const updateRecipe = async (recipeId, changes) => {
  try {
    const db = await connection();
    const response = await db.collection('recipes')
      .updateOne({ _id: ObjectId(recipeId) }, { $set: changes });
    return response;

  } catch (error) {
    return { error: error.message };
  }
};

const deleteRecipe = async (recipeId) => {
  try {
    const db = await connection();
    const response = await db.collection('recipes')
      .removeOne({ _id: ObjectId(recipeId) });
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

const updateImage = async (recipeId, image) => {
  const db = await connection();
  const response = await db.collection('recipes')
    .updateOne({ _id: ObjectId(recipeId) }, { $set: { image } });
  return response;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage
};
