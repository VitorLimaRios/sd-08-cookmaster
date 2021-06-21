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

module.exports = {
  createRecipe
};
