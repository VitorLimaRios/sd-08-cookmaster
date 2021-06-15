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

module.exports = { createUser, getUserByEmail };
