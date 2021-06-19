const connection = require('./connection');

const getAll = async () => {
  return await connection()
    .then(db => db.collection('users').find().toArray())
    .then((users) => ({ users }));
};

const getEmail = async (email) => {
  const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return userEmail;
};

const create = async (name, email, password) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
  .then((result) => ({ user: result.ops[0] }));

module.exports = {
  getAll,
  getEmail,
  create
};