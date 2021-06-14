const connection = require('./connection');

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

module.exports = {
  createRecipes,
};
