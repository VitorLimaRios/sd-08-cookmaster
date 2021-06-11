const connection = require('./connection');

const getAll = async () =>
  connection().then ((db) => db.collection('users')
    .find().toArray());

const create = async(name, email, password, role) =>
  connection().then ((db) => db.collection('users')
    .insertOne({ name, email, password, role }));

module.exports = {
  getAll,
  create,
};
