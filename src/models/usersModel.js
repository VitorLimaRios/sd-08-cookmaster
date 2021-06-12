const connection = require('../config/connection');

const createUser = async (name, email, password) => {
  const user = await connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }))
    .then(result => result.ops[0]);
  return { user: { 
    name,
    email,
    role: 'user',
    _id: user._id,
  }};
};

const findUserByEmail = async (email) => {
  const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));
  return user;
};

const getAllUsers = async () => {
  const allUsers = await connection().then((db) =>
    db.collection('users').find().toArray());
  return allUsers;
};

module.exports = { createUser, findUserByEmail, getAllUsers };
