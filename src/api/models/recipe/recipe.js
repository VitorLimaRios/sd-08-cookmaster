const Connection = require('../connection');

const registerRecipesModel = async (recipe) => {
  const db = await Connection();
  const result = await db.collection('recipes')
    .insertOne(recipe);
  return result.ops[0];  
};

const allRecipesModel = async () => {
  const db = await Connection();
  return await db.collection('recipes').find({}).toArray();
};

module.exports = {
  registerRecipesModel,
  allRecipesModel,
};
