const connect = require('./connection');

const create = async (name, email, password) => {
  const usersCollection = await connect()
    .then((db) => db.collection('users'));

  const { insertedId: _id } = await usersCollection
    .insertOne({ name, email, password, role: 'user' });

  return {
    _id,
    role: 'user',
  };
};

const getByEmail = async (email) => await connect()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = {
  create,
  getByEmail,
};
