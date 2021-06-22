const connection = require('./connection');

const addNewRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();

  const recipeToAdd = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: recipeToAdd.insertedId,
    }
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes')
    .find()
    .toArray();
    
  if (recipes) return recipes;
};

module.exports = {
  addNewRecipe,
  getAllRecipes,
};