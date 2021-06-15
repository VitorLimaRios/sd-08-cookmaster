const Connection = require('../connection');
const { ObjectId } = require('mongodb');

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

const idRecipesModel = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await Connection();
  const result = await db.collection('recipes').findOne({_id: ObjectId(id) });
  return result;
};

module.exports = {
  registerRecipesModel,
  allRecipesModel,
  idRecipesModel,
};
