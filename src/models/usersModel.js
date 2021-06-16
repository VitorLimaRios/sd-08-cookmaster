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

const createAdmin = async (name, email, password) => {
  const newAdmin = await connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'admin' }))
    .then(result => result.ops[0]);
  return { user: { 
    name,
    email,
    role: 'admin',
    _id: newAdmin._id,
  }};
};

module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  createAdmin,
};
