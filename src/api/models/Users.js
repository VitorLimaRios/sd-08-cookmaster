const connection = require('./connection');

const newUser = async (user) => connection()
  .then((db) => db.collection('users').insertOne(user));

const findUser = async ({ email }) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  newUser,
  findUser,
};