
const connection = require('./connection');
const { errorHandling } = require('../utils');

const createUser = errorHandling(async ({ name, email, password, role = 'user'}) => {
  const db = await connection();

  const { insertedId } = await db.collection('users')
    .insertOne({ name, email, password, role });

  return { _id: insertedId, name, email, password, role };
});

const getUserByEmail = errorHandling(async (email) => {
  const db = await connection();

  const result = await db.collection('users').findOne({ email });

  if (!result) return null;
  
  return result;
});

module.exports = {
  createUser,
  getUserByEmail
};