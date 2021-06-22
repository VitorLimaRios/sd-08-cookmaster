const connection = require('./connection');

const addUser = async (name, email, password) => {
  const db = await connection();
  const addedUser = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return addedUser.ops[0];
};

const findEmail = async (email) => {
  const db = await connection();
  const findedEmail = await db.collection('users')
    .findOne({ email });
  return findedEmail;
};

module.exports = {
  addUser,
  findEmail,
};