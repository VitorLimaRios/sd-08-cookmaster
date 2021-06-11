const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createUser = async (userData) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ ...userData, role: 'user' });
  console.log('model')
  return newUser.ops[0];
};

module.exports = { createUser };
