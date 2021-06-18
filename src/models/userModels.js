const connect = require('../configdatabase/conn');
// const { ObjectId } = require('mongodb');

const addUser = async (name, email, password) => {
  const banco = connect()
    .then((db) => db.collection('users').insertOne({
      name, email, password, role: 'user'
    }))
    .then((result) => result.ops[0]);

  return banco;
};

module.exports = {
  addUser,
};