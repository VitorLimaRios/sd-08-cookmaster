const Connection = require('../connection');

const getAllModel = async () => {
  const db = await Connection();
  return await db.collection('users').find({}).toArray();
};

const addModel = async (users) => {
  const { name, email } = users;
  const db = await Connection();
  const result = await db.collection('users')
    .insertOne({ name, email, role: 'user' });
  return result.ops[0];
};

const getByEmail = async (email) => {
  const db = await Connection();
  const result = await db.collection('users').findOne({ 'email': email });
  return result;
};

const registerRecipesModel = async (recipe) => {
  const db = await Connection();
  const result = await db.collection('recipes')
    .insertOne(recipe);
  return result.ops[0];  
};

module.exports = {
  getAllModel,
  addModel,
  getByEmail,
  registerRecipesModel,
};
