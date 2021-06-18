const connection = require('./connection');

const createNewUserOnDatabase = async (name, email, password) => {
  const db = await connection();

  const newUser = await db
    .collection('users')
    .insertOne({ name, email, password, role: 'user' });

  return {
    name: newUser.ops[0].name,
    email: newUser.ops[0].email,
    role: 'user',
  };
};

const findOneUserByEmail = async (email) => {
  const db = await connection();
  const searchResult = await db.collection('users').findOne({ email });
  return searchResult;
};

const findOneUserByPassword = async (password) => {
  const db = await connection();
  const searchResult = await db.collection('users').findOne({ password });
  return searchResult;
};

module.exports = {
  findOneUserByEmail,
  findOneUserByPassword,
  createNewUserOnDatabase,
};
