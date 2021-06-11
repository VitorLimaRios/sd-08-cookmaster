// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collectionName = 'users';

const getUserByEmail = async (email) => {
  return connection()
    .then((db) => db.collection(collectionName).findOne({ email: email }))
    .then((user) => user);
};

const registerUser = async (name, email, password, role) => {
  return connection()
    .then((db) =>
      db.collection(collectionName).insertOne({ name, email, password, role })
    )
    .then((result) => ({
      user: { name, email, role, _id: result.insertedId },
    }));
};

module.exports = {
  getUserByEmail,
  registerUser,
};
