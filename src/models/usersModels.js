const connection = require('./connection');

const registerUser = async (name, email, password) => {
  const { insertedId: _id } = await connection().then((db) => 
    db.collection('users').insertOne({ name, email, password, role: 'user' }));
  return { name, email, password, role: 'user', _id };
};

const findUserByEmail = async (email) => {
  const emailFound = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return emailFound;
};

module.exports = {
  registerUser,
  findUserByEmail,
};
