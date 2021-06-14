const connection = require('./connection');

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

module.exports = {
  createRecipe,
};
