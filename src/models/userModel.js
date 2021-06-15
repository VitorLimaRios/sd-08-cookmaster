const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createUser = async (userData) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ ...userData, role: 'user' });
  const { name, email, role, _id} = newUser.ops[0];

  return { user: { name, email, role, _id }};
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user;
};

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const user = await db.collection('users').findOne(ObjectId(id));

  if (!user) return null;
  
  return user;
};

module.exports = { createUser, getUserByEmail, getUserById };
