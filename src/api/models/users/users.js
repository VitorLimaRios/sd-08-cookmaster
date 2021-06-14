const Connection = require('../connection');
const { ObjectId } = require('mongodb');

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

const getByPassword = async (password) => {
  const db = await Connection();
  const result = await db.collection('users').findOne({ 'password': password });
  return result;
};

module.exports = {
  getAllModel,
  addModel,
  getByEmail,
  getByPassword,
};
