const connection = require('./connection');

const add = async (user) => {
  return connection()
    .then((db) => db.collection('users').insertOne(user))
    .then((result) => result.ops[0]);
};

const findByEmail = async (email) => {
  const productFound = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return productFound;
};

module.exports = {
  add,
  findByEmail
};