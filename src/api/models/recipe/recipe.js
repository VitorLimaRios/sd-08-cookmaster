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

const idRecipesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await Connection();
  const result = await db.collection('recipes').findOne({_id: ObjectId(id) });
  return result;
};

const editRecipesModel = async(id, body) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await Connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: body } );
  const result = await idRecipesModel(id);
  return result;
};

const deleteRecipesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await Connection();
  const result = await db.collection('recipes').deleteOne({_id: ObjectId(id) });
  return result;
};

module.exports = {
  registerRecipesModel,
  allRecipesModel,
  idRecipesModel,
  editRecipesModel,
  deleteRecipesModel,
};
