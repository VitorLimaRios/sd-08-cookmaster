const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  // console.log('MODEL createRecipe req.body', { name, ingredients, preparation });
  const db = await connect();
  const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation });
  // console.log('MODEL createUser recipe', recipe.ops[0]);
  return recipe.ops[0];
};

const getRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  console.log('MODEL getRecipes recipes', recipes);
  return recipes;
};

module.exports = { 
  createRecipe,
  getRecipes,
};